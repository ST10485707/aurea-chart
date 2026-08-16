"use client";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="w-full border-b border-[var(--color-beige)] bg-[var(--color-cream)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">

        {/* Mobile: menu icon (placeholder for now) */}
        <button className="md:hidden text-[var(--color-coffee-dark)]" aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Logo / wordmark */}
        <Link href="/" className="flex items-baseline text-2xl tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
          <span className="font-semibold text-[var(--color-coffee-dark)]">Auréa</span>
          <span className="font-normal text-[var(--color-coffee)]">Chart</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--color-coffee)]">
          <Link href="/shop">Shop</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/new-arrivals">New Arrivals</Link>
          <Link href="/bulk">Bulk & Resell</Link>
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-5 text-[var(--color-coffee-dark)]">
          {/* Search */}
          <button aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Account */}
          <button aria-label="Account" className="hidden md:inline-block">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </button>

          {/* Cart with badge */}
          <button aria-label="Cart" className="relative">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6h15l-1.5 9h-12z" />
              <path d="M6 6l-1-3H2" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-gold)] text-[10px] text-[var(--color-cream)]">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}