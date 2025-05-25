import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  // Get the authenticated user
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ code: 403 }, { status: 403 });
  }

  // Fetch contacts for the user
  const { data, error } = await supabase
    .from("contacts")
    .select("contact_user_id, nickname, users:contact_user_id(username)")
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Map to expected output: { name, full_name, nickname, user_id }
  const contacts = (data || []).map((c: any) => ({
    name: c.users?.username || "",
    nickname: c.nickname || "",
    user_id: c.contact_user_id
  }));

  return NextResponse.json(contacts);
}
