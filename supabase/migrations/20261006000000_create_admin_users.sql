-- ==============================================================================
-- VADAANYA TALENT TEST 2026: SECURE ADMIN USERS & AUTHENTICATION SCHEMA
-- ==============================================================================

-- 1. Ensure pgcrypto extension is enabled for bcrypt hashing
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'superadmin',
    failed_attempts INTEGER NOT NULL DEFAULT 0,
    locked_until TIMESTAMPTZ,
    last_login_at TIMESTAMPTZ,
    last_login_ip VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Revoke all permissions from public, anon, and authenticated roles
REVOKE ALL ON public.admin_users FROM anon, authenticated, public;

-- Grant permissions only to service_role (Used only server-side by Next.js API / Route Handlers)
GRANT ALL ON public.admin_users TO service_role;

-- 4. ATOMIC AUTHENTICATION PROCEDURE WITH RATE LIMITING & AUDIT LOGGING
CREATE OR REPLACE FUNCTION public.authenticate_admin(
    p_email TEXT,
    p_password TEXT,
    p_ip VARCHAR(50) DEFAULT NULL
)
RETURNS TABLE (
    success BOOLEAN,
    user_id UUID,
    email VARCHAR(255),
    role VARCHAR(50),
    error_code TEXT,
    lock_expires_at TIMESTAMPTZ,
    attempts_remaining INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
    v_user RECORD;
    v_new_failed INTEGER;
    v_lock_until TIMESTAMPTZ;
BEGIN
    -- 1. Find user (case-insensitive email matching)
    SELECT * INTO v_user
    FROM public.admin_users
    WHERE lower(admin_users.email) = lower(p_email);

    -- 2. If user not found, perform dummy crypt to mitigate timing attacks
    IF NOT FOUND THEN
        PERFORM crypt('dummy_password_timing_defense', gen_salt('bf', 12));
        INSERT INTO public.admin_audit_logs (actor, action, details, ip_address)
        VALUES (p_email, 'ADMIN_LOGIN_FAILED', jsonb_build_object('reason', 'USER_NOT_FOUND'), p_ip);

        RETURN QUERY SELECT false, NULL::UUID, NULL::VARCHAR, NULL::VARCHAR, 'INVALID_CREDENTIALS'::TEXT, NULL::TIMESTAMPTZ, NULL::INTEGER;
        RETURN;
    END IF;

    -- 3. Check if currently locked
    IF v_user.locked_until IS NOT NULL AND v_user.locked_until > now() THEN
        INSERT INTO public.admin_audit_logs (actor, action, details, ip_address)
        VALUES (v_user.email, 'ADMIN_LOGIN_ATTEMPT_WHILE_LOCKED', jsonb_build_object('locked_until', v_user.locked_until), p_ip);

        RETURN QUERY SELECT false, NULL::UUID, NULL::VARCHAR, NULL::VARCHAR, 'ACCOUNT_LOCKED'::TEXT, v_user.locked_until, 0::INTEGER;
        RETURN;
    END IF;

    -- 4. Check Password using bcrypt crypt()
    IF v_user.password_hash = crypt(p_password, v_user.password_hash) THEN
        -- Successful authentication: reset failed attempts & update last login
        UPDATE public.admin_users
        SET failed_attempts = 0,
            locked_until = NULL,
            last_login_at = now(),
            last_login_ip = p_ip,
            updated_at = now()
        WHERE id = v_user.id;

        INSERT INTO public.admin_audit_logs (actor, action, details, ip_address)
        VALUES (v_user.email, 'ADMIN_LOGIN_SUCCESS', jsonb_build_object('role', v_user.role), p_ip);

        RETURN QUERY SELECT true, v_user.id, v_user.email, v_user.role, NULL::TEXT, NULL::TIMESTAMPTZ, 5::INTEGER;
        RETURN;
    ELSE
        -- Incorrect password: increment failed count and enforce 15-minute lockout on 5th attempt
        v_new_failed := v_user.failed_attempts + 1;

        IF v_new_failed >= 5 THEN
            v_lock_until := now() + interval '15 minutes';
            UPDATE public.admin_users
            SET failed_attempts = v_new_failed,
                locked_until = v_lock_until,
                updated_at = now()
            WHERE id = v_user.id;

            INSERT INTO public.admin_audit_logs (actor, action, details, ip_address)
            VALUES (v_user.email, 'ADMIN_ACCOUNT_LOCKED', jsonb_build_object('failed_attempts', v_new_failed, 'locked_until', v_lock_until), p_ip);

            RETURN QUERY SELECT false, NULL::UUID, NULL::VARCHAR, NULL::VARCHAR, 'ACCOUNT_LOCKED'::TEXT, v_lock_until, 0::INTEGER;
            RETURN;
        ELSE
            UPDATE public.admin_users
            SET failed_attempts = v_new_failed,
                updated_at = now()
            WHERE id = v_user.id;

            INSERT INTO public.admin_audit_logs (actor, action, details, ip_address)
            VALUES (v_user.email, 'ADMIN_LOGIN_FAILED', jsonb_build_object('failed_attempts', v_new_failed, 'remaining', 5 - v_new_failed), p_ip);

            RETURN QUERY SELECT false, NULL::UUID, NULL::VARCHAR, NULL::VARCHAR, 'INVALID_CREDENTIALS'::TEXT, NULL::TIMESTAMPTZ, (5 - v_new_failed)::INTEGER;
            RETURN;
        END IF;
    END IF;
END;
$$;

-- Restrict execution to service_role ONLY (Prevents anon/authenticated clients from calling it directly)
REVOKE EXECUTE ON FUNCTION public.authenticate_admin(TEXT, TEXT, VARCHAR) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.authenticate_admin(TEXT, TEXT, VARCHAR) TO service_role;
