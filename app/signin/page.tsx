"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import AppShell from "@/components/AppShell";
import Footer from "@/components/Footer";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/studio"
    });
    if (result?.error) {
      setError("Invalid credentials. Try awan@pixeldew.xyz / password123.");
    }
  };

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-md rounded-xl border border-dew-mint/30 bg-space-800/60 p-6 text-xs text-white/70 shadow-insetPixel">
        <h1 className="font-arcade text-lg text-white">Enter the Studio</h1>
        <p className="mt-2 text-xs text-white/60">Log in to build, export, and unlock credits.</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-[11px] text-white/60">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-md border border-dew-mint/20 bg-space-900/60 p-3 text-xs text-white/80"
            />
          </label>
          <label className="block text-[11px] text-white/60">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-md border border-dew-mint/20 bg-space-900/60 p-3 text-xs text-white/80"
            />
          </label>
          {error && <div className="text-[11px] text-neon-magenta">{error}</div>}
          <button className="cta-button w-full rounded-md bg-dew-mint px-4 py-2 text-xs font-arcade text-space-900">
            Sign In
          </button>
        </form>
        <div className="mt-4 text-[10px] text-white/50">Dev login: awan@pixeldew.xyz / password123</div>
      </div>
      <Footer />
    </AppShell>
  );
}
