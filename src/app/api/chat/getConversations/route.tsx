import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

// This endpoint uses a SQL RPC to efficiently fetch conversations with the correct display name
export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ code: 403 }, { status: 403 });
  }

  // Correct usage: only pass the user id as the argument
  const { data, error } = await supabase.rpc('get_conversations_for_user', { auth_user_id: user.id });

  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}
