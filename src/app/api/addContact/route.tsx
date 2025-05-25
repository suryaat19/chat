// app/api/addContact/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/app/utils/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ code: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { username, nickname } = body

  if (!username || !nickname) {
    return NextResponse.json({ code: 'Missing username or nickname' }, { status: 400 })
  }

  // Get the user_id of the contact by username
  const { data: contactUser, error: contactError } = await supabase
    .from('users')
    .select('user_id')
    .eq('username', username)
    .single()

  if (contactError || !contactUser) {
    return NextResponse.json({ code: 'User not found' }, { status: 404 })
  }

  // Insert into contacts
  const { error: insertError } = await supabase.from('contacts').insert(
    {
      user_id: user.id,
      contact_user_id: contactUser.user_id,
      nickname
    }
  );

  if (insertError) {
    return NextResponse.json({ code: insertError.message }, { status: 500 })
  }

  return NextResponse.json({ code: 200 })
}


/*export async function POST(request: Request) {

}
*/
/*
import { NextResponse } from 'next/server'
import { createClient } from '@/app/utils/supabase/server'

export async function POST(req: Request) {
  const supabase = createClient()

  // Get auth token from request headers (assuming Bearer token)
  const token = req.headers.get('authorization')?.replace('Bearer ', '') || ''

  // Set auth token for Supabase client to identify user
  supabase.auth.setAuth(token)

  // Get logged-in user info
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ code: 'Unauthorized' }, { status: 401 })
  }

  // Parse JSON body for username and nickname
  const { username, nickname } = await req.json()

  // Validate input
  if (!username || !nickname) {
    return NextResponse.json({ code: 'Missing username or nickname' }, { status: 400 })
  }

  // Find the user to add as contact by username
  const {
    data: contactUser,
    error: contactError
  } = await supabase
    .from('users')
    .select('user_id')
    .eq('username', username)
    .single()

  if (contactError || !contactUser) {
    return NextResponse.json({ code: 'User not found' }, { status: 404 })
  }

  // Insert new contact record
  const { error: insertError } = await supabase.from('contacts').insert({
    user_id: user.id,
    contact_user_id: contactUser.user_id,
    nickname
  })

  if (insertError) {
    return NextResponse.json({ code: insertError.message }, { status: 500 })
  }

  // Success response
  return NextResponse.json({ code: 200 })
}
*/