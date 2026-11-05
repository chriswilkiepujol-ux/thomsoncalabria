"use client";

import { useActionState } from "react";
import { signIn } from "../actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState(signIn, null);
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <form action={action} className="acard w-full max-w-sm space-y-5">
        <div>
          <div className="font-display text-2xl font-medium text-[#0a1730]">Thomson Calabria</div>
          <div className="text-xs uppercase tracking-[0.2em] text-[#8a93a6]">Admin sign in</div>
        </div>
        <div>
          <label className="alabel" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className="afield" autoComplete="username" />
        </div>
        <div>
          <label className="alabel" htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required className="afield" autoComplete="current-password" />
        </div>
        {state?.error && <p className="text-sm text-red-700">{state.error}</p>}
        <button className="abtn w-full justify-center" disabled={pending}>
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
