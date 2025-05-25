import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

<<<<<<< HEAD
export async function GET() {
  const supabase = createClient()

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ code: 'Unauthorized' }, { status: 401 })
  }

  const { data: contacts, error: contactsError } = await supabase
    .from('contacts')
    .select('contact_user_id, nickname')
    .eq('user_id', user.id)

  if (contactsError) {
    return NextResponse.json({ code: contactsError.message }, { status: 500 })
  }

  if (!contacts || contacts.length === 0) {
    // Return a message if no contacts found
    return NextResponse.json({ code: 'No contacts found', contacts: [] })
  }

  // Now fetch user details for those contact_user_ids
  const contactIds = contacts.map((c) => c.contact_user_id)

  const { data: usersData, error: usersError } = await supabase
    .from('users')
    .select('user_id, username')
    .in('user_id', contactIds)

  if (usersError) {
    return NextResponse.json({ code: usersError.message }, { status: 500 })
  }

  // Map and return final contact list
  const result = contacts.map((contact) => {
    const userInfo = usersData.find((u) => u.user_id === contact.contact_user_id)
    return {
      user_id: contact.contact_user_id,
      nickname: contact.nickname,
      name: userInfo?.username || 'Unknown'
    }
  })

  return NextResponse.json({ contacts: result })
}
*/

import { NextResponse } from 'next/server'
import { createClient } from '@/app/utils/supabase/server'

export async function GET() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ code: 'Unauthorized' }, { status: 401 })
  }

  const { data: contacts, error: contactsError } = await supabase
    .from('contacts')
    .select('contact_user_id, nickname')
    .eq('user_id', user.id)

  if (contactsError) {
    return NextResponse.json({ code: contactsError.message }, { status: 500 })
  }

  // Now fetch user details for those contact_user_ids
  const contactIds = contacts.map((c) => c.contact_user_id)

  const { data: usersData, error: usersError } = await supabase
    .from('users')
    .select('user_id, username')
    .in('user_id', contactIds)

  if (usersError) {
    return NextResponse.json({ code: usersError.message }, { status: 500 })
  }

  // Map and return final contact list
  const result = contacts.map((contact) => {
    const userInfo = usersData.find((u) => u.user_id === contact.contact_user_id)
    return {
      user_id: contact.contact_user_id,
      nickname: contact.nickname,
      name: userInfo?.username || 'Unknown'
    }
  })

  return NextResponse.json(result)
}


/*import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';

export async function GET() {
=======
export async function GET(request: Request) {
>>>>>>> upstream/main
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
