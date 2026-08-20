"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Incorrect email or password.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-cream)] px-4">
      <div className="w-full max-w-sm">
        <h1
          className="text-2xl text-center text-[var(--color-coffee-dark)] mb-8"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Aurea Chart Admin
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-[var(--color-coffee-dark)] mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded border border-[var(--color-beige)] px-4 py-2 text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-sm text-[var(--color-coffee-dark)] mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded border border-[var(--color-beige)] px-4 py-2 text-sm bg-white"
            />
          </div>

          {error && (
            <p className="text-sm text-red-700">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full bg-[var(--color-coffee-dark)] text-[var(--color-cream)] py-3 text-sm tracking-wide hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "LOG IN"}
          </button>
        </form>
      </div>
    </div>
  );
}