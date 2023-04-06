import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  const { data } = await supabase.from("school-works").select("*");

  console.log(data);

  return new Response("Olá");
}
