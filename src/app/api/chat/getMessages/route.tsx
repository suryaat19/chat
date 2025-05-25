import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";
export async function GET(request: NextRequest) {
  const supabase = await createClient();

  // Auth check
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ code: 403 }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const conversationId = searchParams.get("conversation_id");
  const timeOffset = searchParams.get("time_offset");

  if (!conversationId || !timeOffset) {
    return NextResponse.json({ error: "Missing query parameters" }, { status: 400 });
  }

  // Call the RPC function with conversation_id and time_offset
  const { data, error } = await supabase.rpc("get_messages_for_conversation", {
    conversation_id: conversationId,
    time_offset: timeOffset,
    auth_user_id: user.id
  });

  if (error) {
    console.error("RPC error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}