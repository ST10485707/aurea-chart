import Link from "next/link";

const categories = [
  { name: "Fashion", href: "/category/fashion" },
  { name: "Shoes", href: "/category/shoes" },
  { name: "Beauty", href: "/category/beauty" },
  { name: "Fragrance", href: "/category/fragrance" },
  { name: "Home & Lifestyle", href: "/category/home" },
  { name: "Electronics", href: "/category/electronics" },
  { name: "Accessories", href: "/category/accessories" },
  { name: "Bulk & Resell", href: "/category/bulk" },
];

export default function Categories() {
  return (
    <section className="w-full bg-[var(--color-cream)]">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 md:px-8">
        <h2
          className="text-2xl md:text-3xl text-center text-[var(--color-coffee-dark)] mb-10"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Shop by category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group flex flex-col items-center justify-center gap-3 rounded-lg border border-[var(--color-beige)] bg-[var(--color-beige)]/40 py-8 px-4 text-center hover:bg-[var(--color-beige)] transition"
            >
              <div className="h-12 w-12 rounded-full bg-[var(--color-gold-soft)]" />
              <span className="text-sm text-[var(--color-coffee-dark)]">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}