import { NextResponse } from "next/server";
import { createClient } from "../utils/supabase/server"
import { login, signup } from './actions'
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const h = await headers();
  const client = await createClient();
  const { data, error } = await client.auth.getUser();
  if (!error) {
    redirect("" + h.get('x-forwarded-proto') + "://" + h.get('host') + "/chat")
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-[25%] card card-border card-lg bg-base-100">
        <div className="card-body">
          <h1 className="card-title">Authentication</h1>
          <form className="flex flex-col gap-3">

            <input className="input" placeholder="E-mail" id="email" name="email" type="email" required />
            <input className="input" placeholder="Password" id="password" name="password" type="password" required />
            <div className="card-actions">
              <button className="btn-primary btn" formAction={login}>Log in</button>
              <button className="btn-secondary btn" formAction={signup}>Sign up</button>
            </div>
          </form>
        </div>

      </div>

    </div>

  )
}