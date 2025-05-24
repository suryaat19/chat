import { NextResponse } from "next/server";
import { createClient } from "../utils/supabase/server"
import { login, signup } from './actions'
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function LoginPage() {
  const h = await headers();
  const client = await createClient();
  const { data, error } = await client.auth.getUser();
  if (!error) { //User is logged in
    redirect("" + h.get('x-forwarded-proto') + "://" + h.get('host') + "/chat")
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center space-x-4">
      <div className="w-[25%] card card-border card-lg bg-base-100">
        <div className="card-body">
          <h1 className="card-title">Login</h1>
          <form className="flex flex-col gap-3">

            <input className="input" placeholder="E-mail" id="email" name="email" type="email" required />
            <input className="input" placeholder="Password" id="password" name="password" type="password" required />
            <Link className="text-sm text-primary" href="/authentication/reset">Forgot your password?</Link>
            <div className="card-actions">
              <button className="btn-primary btn" formAction={login}>Log in</button>
            </div>
          </form>
        </div>

      </div>
      <div className="w-[25%] card card-border card-lg bg-base-100">
        <div className="card-body">
          <h1 className="card-title">Sign Up</h1>
          <form className="flex flex-col gap-3">

            <input className="input" placeholder="E-mail" id="email" name="email" type="email" required />
            <input className="input" placeholder="Username" id="username" name="username" type="username" required />
            <input className="input" placeholder="Full Name" id="full_name" name="full_name" type="text" required />
            <input className="input" placeholder="Password" id="password" name="password" type="password" required />
            <div className="card-actions">
              <button className="btn-secondary btn" formAction={signup}>Sign up</button>
            </div>
          </form>
        </div>

      </div>

    </div>

  )
}