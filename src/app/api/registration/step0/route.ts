import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/server/db/supabaseAdmin";
import {
  hashAadhaar,
  encryptAadhaar,
  getAadhaarLast4,
  normalizeAadhaar,
  getMaskedAadhaar,
} from "@/server/crypto/aadhaarCrypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { aadhaar, whatsapp } = body;

    const cleanAadhaar = normalizeAadhaar(aadhaar || "");
    const cleanPhone = (whatsapp || "").replace(/\D/g, "");

    // 1. Strict Validation
    if (cleanAadhaar.length !== 12) {
      return NextResponse.json(
        { error: "Invalid Aadhaar number. Must be exactly 12 digits." },
        { status: 400 }
      );
    }

    if (cleanPhone.length !== 10) {
      return NextResponse.json(
        { error: "Invalid WhatsApp phone number. Must be 10 digits." },
        { status: 400 }
      );
    }

    // 2. Cryptographic blind index calculation
    const aadhaarHash = hashAadhaar(cleanAadhaar);
    const last4 = getAadhaarLast4(cleanAadhaar);

    // 3. Search for existing student by blind hash
    const { data: existingStudent, error: findError } = await supabaseAdmin
      .from("students")
      .select(`
        id,
        registration_status,
        current_step,
        registration_number,
        aadhaar_last4,
        whatsapp_number,
        full_name,
        relative_name,
        gender,
        standard,
        village,
        custom_school_name,
        future_stream,
        vocational_interest,
        completed_at,
        district:districts(id, code, name),
        mandal:mandals(id, name),
        school:schools(id, name)
      `)
      .eq("aadhaar_hash", aadhaarHash)
      .maybeSingle();

    if (findError) {
      console.error("Database query error on Step 0 check");
      return NextResponse.json(
        { error: "Internal server error checking registration status." },
        { status: 500 }
      );
    }

    // CASE A: Student already completed registration
    if (existingStudent && existingStudent.registration_status === "COMPLETED") {
      const dist = Array.isArray(existingStudent.district)
        ? existingStudent.district[0]
        : existingStudent.district;
      const mandal = Array.isArray(existingStudent.mandal)
        ? existingStudent.mandal[0]
        : existingStudent.mandal;
      const school = Array.isArray(existingStudent.school)
        ? existingStudent.school[0]
        : existingStudent.school;

      return NextResponse.json({
        status: "ALREADY_REGISTERED",
        message: "Student is already registered for Vadaanya Talent Test 2026.",
        data: {
          registrationNumber: existingStudent.registration_number,
          fullName: existingStudent.full_name,
          relativeName: existingStudent.relative_name,
          gender: existingStudent.gender,
          studentClass: existingStudent.standard,
          district: dist?.name || "Anantapur",
          districtCode: dist?.code || "ATP",
          mandal: mandal?.name || "",
          schoolName: existingStudent.custom_school_name || school?.name || "",
          village: existingStudent.village || "",
          stream: existingStudent.future_stream || "",
          maskedAadhaar: `XXXX-XXXX-${existingStudent.aadhaar_last4}`,
          completedAt: existingStudent.completed_at,
        },
      });
    }

    // CASE B: Incomplete draft found (PENDING status) -> Resume Draft
    if (existingStudent && existingStudent.registration_status === "PENDING") {
      const dist = Array.isArray(existingStudent.district)
        ? existingStudent.district[0]
        : existingStudent.district;
      const mandal = Array.isArray(existingStudent.mandal)
        ? existingStudent.mandal[0]
        : existingStudent.mandal;
      const school = Array.isArray(existingStudent.school)
        ? existingStudent.school[0]
        : existingStudent.school;

      return NextResponse.json({
        status: "DRAFT_RESUMED",
        message: "Incomplete draft found. Resuming your application.",
        studentId: existingStudent.id,
        draft: {
          fullName: existingStudent.full_name || "",
          relativeName: existingStudent.relative_name || "",
          gender: existingStudent.gender || "",
          studentClass: existingStudent.standard || "",
          district: dist?.code || "ATP",
          mandal: mandal?.name || "",
          village: existingStudent.village || "",
          schoolName: school?.name || "",
          customSchoolName: existingStudent.custom_school_name || "",
          stream: existingStudent.future_stream || "",
          vocationalInterest: existingStudent.vocational_interest || "",
          currentStep: existingStudent.current_step || 1,
        },
      });
    }

    // CASE C: Brand new student -> Create initial PENDING record with encrypted Aadhaar
    const aadhaarEncrypted = encryptAadhaar(cleanAadhaar);

    const { data: newStudent, error: createError } = await supabaseAdmin
      .from("students")
      .insert({
        registration_status: "PENDING",
        current_step: 1,
        aadhaar_hash: aadhaarHash,
        aadhaar_encrypted: aadhaarEncrypted,
        aadhaar_last4: last4,
        whatsapp_number: cleanPhone,
      })
      .select("id")
      .single();

    if (createError) {
      // Possible race condition where student was inserted milliseconds ago
      if (createError.code === "23505") {
        return NextResponse.json({
          status: "DRAFT_RESUMED",
          message: "Registration already in progress. Resuming draft.",
        });
      }
      console.error("Database insert error on Step 0 new student");
      return NextResponse.json(
        { error: "Failed to initialize registration record." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: "NEW_DRAFT_CREATED",
      message: "Identity verified. Initialized application draft.",
      studentId: newStudent.id,
      maskedAadhaar: getMaskedAadhaar(cleanAadhaar),
    });
  } catch (err: any) {
    console.error("Step 0 error:", err?.message || err);
    return NextResponse.json(
      { error: "An unexpected error occurred during identity verification." },
      { status: 500 }
    );
  }
}
