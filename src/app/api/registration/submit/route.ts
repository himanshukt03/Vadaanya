import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/server/db/supabaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentId, formData } = body;

    if (!studentId || !formData) {
      return NextResponse.json(
        { error: "Missing studentId or formData." },
        { status: 400 }
      );
    }

    // Required fields validation
    if (!formData.fullName || !formData.fullName.trim()) {
      return NextResponse.json({ error: "Student Full Name is required." }, { status: 400 });
    }
    if (!formData.relativeName || !formData.relativeName.trim()) {
      return NextResponse.json({ error: "Parent / Guardian Name is required." }, { status: 400 });
    }
    if (!formData.gender || (formData.gender !== "MALE" && formData.gender !== "FEMALE")) {
      return NextResponse.json({ error: "Please select Gender (MALE or FEMALE)." }, { status: 400 });
    }
    if (!formData.studentClass) {
      return NextResponse.json({ error: "Please select Class (Class 9 or Class 10)." }, { status: 400 });
    }
    if (!formData.district || (formData.district !== "ATP" && formData.district !== "SSS")) {
      return NextResponse.json({ error: "Please select a valid District." }, { status: 400 });
    }
    if (!formData.mandal) {
      return NextResponse.json({ error: "Please select a Mandal." }, { status: 400 });
    }
    if (!formData.schoolName && !formData.customSchoolName) {
      return NextResponse.json({ error: "Please select or specify your School." }, { status: 400 });
    }

    // Resolve District ID
    const { data: dist } = await supabaseAdmin
      .from("districts")
      .select("id, name")
      .eq("code", formData.district)
      .maybeSingle();

    if (!dist) {
      return NextResponse.json({ error: "Invalid district selected." }, { status: 400 });
    }

    // Resolve Mandal ID
    const { data: mandal } = await supabaseAdmin
      .from("mandals")
      .select("id, name")
      .eq("name", formData.mandal)
      .eq("district_id", dist.id)
      .maybeSingle();

    if (!mandal) {
      return NextResponse.json({ error: "Invalid mandal selected for this district." }, { status: 400 });
    }

    // Resolve School ID if a preset school was chosen
    let schoolId: string | null = null;
    if (formData.schoolName && formData.schoolName !== "other") {
      const { data: school } = await supabaseAdmin
        .from("schools")
        .select("id")
        .eq("name", formData.schoolName)
        .eq("mandal_id", mandal.id)
        .maybeSingle();
      if (school) schoolId = school.id;
    }

    // Execute Atomic Quota Check & Registration Submission via PostgreSQL RPC function
    const { data: rpcRes, error: rpcError } = await supabaseAdmin.rpc(
      "complete_student_registration",
      {
        p_student_id: studentId,
        p_district_code: formData.district,
        p_full_name: formData.fullName.trim(),
        p_relative_name: formData.relativeName.trim(),
        p_gender: formData.gender,
        p_standard: formData.studentClass,
        p_mandal_id: mandal.id,
        p_village: (formData.village || "").trim(),
        p_school_id: schoolId,
        p_custom_school_name: (formData.customSchoolName || "").trim() || null,
        p_future_stream: formData.stream || null,
        p_vocational_interest: formData.vocationalInterest || null,
      }
    );

    if (rpcError) {
      console.error("RPC complete_student_registration error:", rpcError.message);
      return NextResponse.json(
        { error: "Failed to process registration transaction." },
        { status: 500 }
      );
    }

    const result = Array.isArray(rpcRes) ? rpcRes[0] : rpcRes;

    if (!result || !result.success) {
      return NextResponse.json(
        { error: result?.error_message || "Quota exceeded or submission failed." },
        { status: 400 }
      );
    }

    const regNo = result.registration_number;

    return NextResponse.json({
      success: true,
      message: "Registration completed successfully!",
      data: {
        registrationNumber: regNo,
        fullName: formData.fullName.trim(),
        relativeName: formData.relativeName.trim(),
        gender: formData.gender,
        studentClass: formData.studentClass,
        district: dist.name,
        districtCode: formData.district,
        mandal: mandal.name,
        school: formData.customSchoolName || formData.schoolName,
        village: formData.village || "",
        stream: formData.stream || "MPC",
        completedAt: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    console.error("Submit error:", err?.message || err);
    return NextResponse.json(
      { error: "Unexpected error during registration submission." },
      { status: 500 }
    );
  }
}
