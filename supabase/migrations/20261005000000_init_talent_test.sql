-- ==============================================================================
-- VADAANYA TALENT TEST 2026: SUPABASE DATABASE INITIALIZATION SCHEMA
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. DISTRICTS TABLE
CREATE TABLE IF NOT EXISTS public.districts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(10) UNIQUE NOT NULL, -- 'ATP', 'SSS'
    name VARCHAR(100) UNIQUE NOT NULL, -- 'Anantapur', 'Sri Sathya Sai'
    quota_max INTEGER NOT NULL DEFAULT 4000,
    registered_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. MANDALS TABLE
CREATE TABLE IF NOT EXISTS public.mandals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    district_id UUID NOT NULL REFERENCES public.districts(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_mandal_district UNIQUE (name, district_id)
);

-- 4. SCHOOLS TABLE
CREATE TABLE IF NOT EXISTS public.schools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mandal_id UUID NOT NULL REFERENCES public.mandals(id) ON DELETE CASCADE,
    udise_code VARCHAR(50) UNIQUE,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'ZPHS', -- 'Govt', 'Model', 'ZPHS', 'KGBV', 'Other'
    contact_name VARCHAR(150),
    contact_phone VARCHAR(20),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_schools_mandal ON public.schools(mandal_id);

-- 5. EXAM CENTERS TABLE
CREATE TABLE IF NOT EXISTS public.exam_centers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mandal_id UUID REFERENCES public.mandals(id) ON DELETE SET NULL,
    center_code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    maps_url TEXT,
    capacity INTEGER NOT NULL DEFAULT 200,
    gender_allowed VARCHAR(20), -- 'MALE', 'FEMALE', or NULL for Co-Ed
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. STUDENTS TABLE (CORE REGISTRATION ENGINE)
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (registration_status IN ('PENDING', 'COMPLETED')),
    current_step INTEGER NOT NULL DEFAULT 1,
    registration_number VARCHAR(50) UNIQUE, -- Format: V26-[DIST]-[BATCH][4-DIGIT-SEQ] (e.g. V26-ATP-A0001)

    -- Encrypted Aadhaar Security Fields
    aadhaar_hash VARCHAR(128) UNIQUE NOT NULL, -- HMAC-SHA256 blind index for O(1) duplicate checks
    aadhaar_encrypted TEXT NOT NULL,           -- AES-256-GCM ciphertext
    aadhaar_last4 VARCHAR(4) NOT NULL,         -- Masked display (e.g. "5678")

    whatsapp_number VARCHAR(15) NOT NULL,      -- Non-unique (Teachers/Headmasters can register multiple students)

    -- Block 1: Personal Details
    full_name VARCHAR(200),
    relative_name VARCHAR(200),
    gender VARCHAR(10) CHECK (gender IN ('MALE', 'FEMALE')),
    standard VARCHAR(20) CHECK (standard IN ('Class 9', 'Class 10')),

    -- Block 2: Location & School Details
    district_id UUID REFERENCES public.districts(id),
    mandal_id UUID REFERENCES public.mandals(id),
    village VARCHAR(150),
    school_id UUID REFERENCES public.schools(id),
    custom_school_name VARCHAR(255),

    -- Block 3: Aspirations & Vocational Trades
    future_stream VARCHAR(50),
    vocational_interest VARCHAR(100),

    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for lightning fast lookups & admin reporting
CREATE INDEX IF NOT EXISTS idx_students_status ON public.students(registration_status);
CREATE INDEX IF NOT EXISTS idx_students_district_status ON public.students(district_id, registration_status);
CREATE INDEX IF NOT EXISTS idx_students_school ON public.students(school_id);
CREATE INDEX IF NOT EXISTS idx_students_whatsapp ON public.students(whatsapp_number);

-- 7. HALL TICKETS TABLE
CREATE TABLE IF NOT EXISTS public.hall_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number VARCHAR(50) UNIQUE NOT NULL, -- e.g. HT-2026-90412
    student_id UUID UNIQUE NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    center_id UUID REFERENCES public.exam_centers(id) ON DELETE SET NULL,
    room_number VARCHAR(50),
    bench_number VARCHAR(50),
    is_downloaded BOOLEAN NOT NULL DEFAULT false,
    downloaded_at TIMESTAMPTZ,
    download_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_hall_tickets_center ON public.hall_tickets(center_id);

-- 8. ADMIN AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor VARCHAR(100) NOT NULL,
    action VARCHAR(100) NOT NULL,
    details JSONB,
    ip_address VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. ATOMIC QUOTA INCREMENT & REGISTRATION NUMBER GENERATOR (PostgreSQL Function)
CREATE OR REPLACE FUNCTION public.complete_student_registration(
    p_student_id UUID,
    p_district_code VARCHAR(10),
    p_full_name VARCHAR(200),
    p_relative_name VARCHAR(200),
    p_gender VARCHAR(10),
    p_standard VARCHAR(20),
    p_mandal_id UUID,
    p_village VARCHAR(150),
    p_school_id UUID,
    p_custom_school_name VARCHAR(255),
    p_future_stream VARCHAR(50),
    p_vocational_interest VARCHAR(100)
)
RETURNS TABLE (
    success BOOLEAN,
    registration_number VARCHAR(50),
    error_message TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_district_id UUID;
    v_current_count INTEGER;
    v_quota_max INTEGER;
    v_new_count INTEGER;
    v_batch_char CHAR(1);
    v_seq_in_batch INTEGER;
    v_reg_no VARCHAR(50);
BEGIN
    -- 1. Lock the district row atomically to prevent race conditions
    SELECT id, registered_count, quota_max
    INTO v_district_id, v_current_count, v_quota_max
    FROM public.districts
    WHERE code = p_district_code
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN QUERY SELECT false, NULL::VARCHAR, 'Invalid District Code'::TEXT;
        RETURN;
    END IF;

    -- 2. Enforce Hard Quota Check (4,000 max)
    IF v_current_count >= v_quota_max THEN
        RETURN QUERY SELECT false, NULL::VARCHAR, 'District Quota Exceeded (4000/4000 reached)'::TEXT;
        RETURN;
    END IF;

    -- 3. Calculate Sequential Registration Number
    v_new_count := v_current_count + 1;
    
    -- Batch: A = 1..1000, B = 1001..2000, C = 2001..3000, D = 3001..4000
    v_batch_char := CHR(65 + ((v_new_count - 1) / 1000));
    v_seq_in_batch := ((v_new_count - 1) % 1000) + 1;
    
    -- Format: V26-[DIST]-[BATCH][4-DIGIT-SEQ] e.g. V26-ATP-B0016
    v_reg_no := 'V26-' || p_district_code || '-' || v_batch_char || LPAD(v_seq_in_batch::TEXT, 4, '0');

    -- 4. Update District Count
    UPDATE public.districts
    SET registered_count = v_new_count
    WHERE id = v_district_id;

    -- 5. Commit Student Record
    UPDATE public.students
    SET
        registration_status = 'COMPLETED',
        registration_number = v_reg_no,
        full_name = p_full_name,
        relative_name = p_relative_name,
        gender = p_gender,
        standard = p_standard,
        district_id = v_district_id,
        mandal_id = p_mandal_id,
        village = p_village,
        school_id = p_school_id,
        custom_school_name = p_custom_school_name,
        future_stream = p_future_stream,
        vocational_interest = p_vocational_interest,
        completed_at = now(),
        updated_at = now()
    WHERE id = p_student_id;

    RETURN QUERY SELECT true, v_reg_no, NULL::TEXT;
END;
$$;

-- 10. ROW LEVEL SECURITY (RLS) POLICIES
-- Enable RLS on all tables
ALTER TABLE public.districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mandals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hall_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Public can read District and Mandal metadata for registration dropdowns
CREATE POLICY "Public read districts" ON public.districts FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read mandals" ON public.mandals FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read schools" ON public.schools FOR SELECT TO anon, authenticated USING (true);

-- Student table: Direct public SELECT/UPDATE is forbidden.
-- Next.js Server Actions / Route Handlers will use the SUPABASE_SERVICE_ROLE_KEY to interact with students safely.
CREATE POLICY "Service role full access students" ON public.students FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access hall_tickets" ON public.hall_tickets FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access audit_logs" ON public.admin_audit_logs FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access districts" ON public.districts FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 11. SEED DISTRICTS & MANDALS (Pre-populated for instant readiness)
INSERT INTO public.districts (code, name, quota_max, registered_count) VALUES
('ATP', 'Anantapur', 4000, 0),
('SSS', 'Sri Sathya Sai', 4000, 0)
ON CONFLICT (code) DO NOTHING;

-- Seed Anantapur Mandals
DO $$
DECLARE
    v_atp_id UUID;
    m TEXT;
    atp_mandals TEXT[] := ARRAY[
        'Anantapur Urban', 'Anantapur Rural', 'Atmakur', 'Beluguppa', 'Bommanahal',
        'Brahmasamudram', 'Bukkarayasamudram', 'D.Hirehal', 'Garladinne', 'Gooty',
        'Gummagatta', 'Guntakal', 'Kalyandurg', 'Kambadur', 'Kanaganapalli',
        'Kudair', 'Kundurpi', 'Narpala', 'Pamidi', 'Peddapappur',
        'Peddavadugur', 'Putlur', 'Rapthadu', 'Rayadurg', 'Settur',
        'Singanamala', 'Tadipatri', 'Uravakonda', 'Vajrakarur', 'Vidapanakal',
        'Yadiki', 'Yellanur'
    ];
BEGIN
    SELECT id INTO v_atp_id FROM public.districts WHERE code = 'ATP';
    FOREACH m IN ARRAY atp_mandals LOOP
        INSERT INTO public.mandals (district_id, name) VALUES (v_atp_id, m)
        ON CONFLICT (name, district_id) DO NOTHING;
    END LOOP;
END $$;

-- Seed Sri Sathya Sai Mandals
DO $$
DECLARE
    v_sss_id UUID;
    m TEXT;
    sss_mandals TEXT[] := ARRAY[
        'Agali', 'Amadagur', 'Amarapuram', 'Bathalapalle', 'Bukkapatnam',
        'Chennekothapalle', 'Chilamathur', 'Dharmavaram', 'Gandlapenta', 'Gorantla',
        'Gudibanda', 'Hindupur', 'Kadiri', 'Kanaganapalle', 'Kothacheruvu',
        'Lepakshi', 'Madakasira', 'Mudigubba', 'Nallacheruvu', 'Nallamada',
        'Nambulapulakunta', 'Obuladevaracheruvu', 'Parigi', 'Penukonda', 'Puttaparthi',
        'Ramagiri', 'Roddam', 'Rolla', 'Somandepalle', 'Talupula',
        'Tanakal', 'Tadimarri'
    ];
BEGIN
    SELECT id INTO v_sss_id FROM public.districts WHERE code = 'SSS';
    FOREACH m IN ARRAY sss_mandals LOOP
        INSERT INTO public.mandals (district_id, name) VALUES (v_sss_id, m)
        ON CONFLICT (name, district_id) DO NOTHING;
    END LOOP;
END $$;
