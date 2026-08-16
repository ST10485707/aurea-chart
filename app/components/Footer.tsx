import Link from "next/link";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "Shop All", href: "/shop" },
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Fashion", href: "/category/fashion" },
      { label: "Beauty", href: "/category/beauty" },
      { label: "Fragrance", href: "/category/fragrance" },
      { label: "Bulk & Resell", href: "/bulk" },
    ],
  },
  {
    title: "Customer care",
    links: [
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "Contact", href: "/contact" },
      { label: "Track order", href: "/track-order" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our story", href: "/about" },
      { label: "Age restricted products", href: "/age-restricted" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--color-coffee-dark)] text-[var(--color-cream)]">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm tracking-wide mb-4 text-[var(--color-gold-soft)]">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-cream)]/80 hover:text-[var(--color-cream)] transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--color-cream)]/10 text-center">
          <p
            className="text-lg"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Auréa<span className="font-normal">Chart</span>
          </p>
          <p className="mt-2 text-xs text-[var(--color-cream)]/60">
            © {new Date().getFullYear()} Aurea Chart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}