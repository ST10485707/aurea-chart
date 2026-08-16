import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full bg-[var(--color-beige)]">
      <div className="mx-auto max-w-7xl px-4 py-20 md:py-32 md:px-8 text-center">
        <h1
          className="text-4xl md:text-6xl font-medium text-[var(--color-coffee-dark)] leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Shop smart.
          <br />
          Live better.
        </h1>

        <p className="mt-6 text-base md:text-lg text-[var(--color-coffee)] max-w-md mx-auto">
          Trendy finds. Everyday essentials. Delivered to you.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/shop"
            className="px-8 py-3 rounded-full bg-[var(--color-coffee-dark)] text-[var(--color-cream)] text-sm tracking-wide hover:opacity-90 transition"
          >
            SHOP NOW
          </Link>
          <Link
            href="/bulk"
            className="px-8 py-3 rounded-full border border-[var(--color-coffee-dark)] text-[var(--color-coffee-dark)] text-sm tracking-wide hover:bg-[var(--color-cream)] transition"
          >
            SHOP BULK
          </Link>
        </div>
      </div>
    </section>
  );
}