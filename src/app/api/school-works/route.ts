import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { data } = await supabase.from("school-works").select("*");

  return NextResponse.json(data);
}
