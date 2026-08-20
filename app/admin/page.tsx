"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function AdminDashboard() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/admin/login");
      } else {
        setEmail(data.session.user.email ?? null);
        setCheckingAuth(false);
      }
    }

    checkAuth();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-cream)]">
        <p className="text-[var(--color-coffee)]">Checking access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      <div className="border-b border-[var(--color-beige)] px-6 py-4 flex items-center justify-between">
        <h1
          className="text-xl text-[var(--color-coffee-dark)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Aurea Chart Admin
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[var(--color-coffee)]">{email}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-[var(--color-coffee-dark)] underline"
          >
            Log out
          </button>
        </div>
      </div>

      <div className="p-6">
        <p className="text-[var(--color-coffee)] mb-6">
          Welcome to your dashboard. Product management coming next.
        </p>

        <Link
          href="/admin/products"
          className="inline-block rounded-full bg-[var(--color-coffee-dark)] text-[var(--color-cream)] px-6 py-3 text-sm tracking-wide hover:opacity-90 transition"
        >
          MANAGE PRODUCTS
        </Link>
      </div>
    </div>
  );
}