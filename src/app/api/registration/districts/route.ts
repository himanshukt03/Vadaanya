import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/server/db/supabaseAdmin";

export async function GET() {
  try {
    const { data: districts, error } = await supabaseAdmin
      .from("districts")
      .select("code, name, quota_max, registered_count");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const result: Record<string, { quota: number; registeredCount: number }> = {};
    for (const d of districts || []) {
      result[d.code] = {
        quota: d.quota_max,
        registeredCount: d.registered_count,
      };
    }

    return NextResponse.json({
      districts: result,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to fetch district statistics." },
      { status: 500 }
    );
  }
}
