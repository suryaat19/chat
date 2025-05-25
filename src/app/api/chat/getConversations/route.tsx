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
  // The RPC should return: conversation_id, full_name, username, last_message, timestampl
  const { data, error } = await supabase.rpc('get_conversations', { auth_user_id: user.id });

  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // If the RPC does not yet return username, you must update the SQL in the function as follows:
  // ...
  // else coalesce(u.full_name, u.username, '') end as full_name,
  // u.username as username,
  // ...

  return NextResponse.json(data || []);
}
