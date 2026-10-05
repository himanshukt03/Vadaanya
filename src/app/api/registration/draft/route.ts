import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/server/db/supabaseAdmin";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentId, step, data } = body;

    if (!studentId) {
      return NextResponse.json(
        { error: "Missing studentId parameter." },
        { status: 400 }
      );
    }

    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (step) {
      updates.current_step = step;
    }

    // Step 1: Personal Details
    if (data.fullName !== undefined) updates.full_name = data.fullName.trim();
    if (data.relativeName !== undefined) updates.relative_name = data.relativeName.trim();
    if (data.gender !== undefined && (data.gender === "MALE" || data.gender === "FEMALE")) {
      updates.gender = data.gender;
    }
    if (data.studentClass !== undefined) updates.standard = data.studentClass;

    // Step 2: Location & School Details
    if (data.district) {
      const { data: dist } = await supabaseAdmin
        .from("districts")
        .select("id")
        .eq("code", data.district)
        .maybeSingle();
      if (dist) updates.district_id = dist.id;
    }

    if (data.mandal && updates.district_id) {
      const { data: mandal } = await supabaseAdmin
        .from("mandals")
        .select("id")
        .eq("name", data.mandal)
        .eq("district_id", updates.district_id)
        .maybeSingle();
      if (mandal) updates.mandal_id = mandal.id;
    }

    if (data.village !== undefined) updates.village = data.village.trim();
    if (data.customSchoolName !== undefined) updates.custom_school_name = data.customSchoolName.trim();

    if (data.schoolName && updates.mandal_id) {
      const { data: school } = await supabaseAdmin
        .from("schools")
        .select("id")
        .eq("name", data.schoolName)
        .eq("mandal_id", updates.mandal_id)
        .maybeSingle();
      if (school) updates.school_id = school.id;
    }

    // Step 3: Aspirations & Vocational
    if (data.stream !== undefined) updates.future_stream = data.stream;
    if (data.vocationalInterest !== undefined) updates.vocational_interest = data.vocationalInterest;

    // Execute update on PENDING student
    const { error: updateError } = await supabaseAdmin
      .from("students")
      .update(updates)
      .eq("id", studentId)
      .eq("registration_status", "PENDING");

    if (updateError) {
      console.error("Draft auto-save error:", updateError.message);
      return NextResponse.json(
        { error: "Failed to auto-save draft." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Draft auto-saved successfully.",
      savedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("Draft route error:", err?.message || err);
    return NextResponse.json(
      { error: "Unexpected error during draft auto-save." },
      { status: 500 }
    );
  }
}
