import Link from "next/link";

const products = [
  { id: 1, name: "Oversized Tracksuit", price: 799, badge: "NEW" },
  { id: 2, name: "Cream Knit Sweater", price: 549, badge: "BESTSELLER" },
  { id: 3, name: "Arabic Perfume Oil 12ml", price: 349, badge: "NEW" },
  { id: 4, name: "Woven Tote Bag", price: 429, badge: null },
  { id: 5, name: "Classic Sneakers", price: 899, badge: "LOW STOCK" },
  { id: 6, name: "Satin Wrap Dress", price: 649, badge: "SALE" },
];

export default function NewArrivals() {
  return (
    <section className="w-full bg-[var(--color-beige)]/30">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 md:px-8">
        <h2
          className="text-2xl md:text-3xl text-center text-[var(--color-coffee-dark)] mb-10"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          New arrivals
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group flex flex-col"
            >
              <div className="relative aspect-[3/4] w-full rounded-lg bg-[var(--color-gold-soft)]/40 overflow-hidden">
                {product.badge && (
                  <span className="absolute top-2 left-2 rounded-full bg-[var(--color-coffee-dark)] px-2.5 py-1 text-[10px] tracking-wide text-[var(--color-cream)]">
                    {product.badge}
                  </span>
                )}
                <button
                  aria-label="Add to wishlist"
                  className="absolute top-2 right-2 text-[var(--color-coffee-dark)]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 21s-7-4.5-9.5-9C.5 8 2 4 6 4c2 0 3.5 1.5 4 3 0.5-1.5 2-3 4-3 4 0 5.5 4 3.5 8-2.5 4.5-9.5 9-9.5 9z" />
                  </svg>
                </button>
              </div>

              <p className="mt-3 text-sm text-[var(--color-coffee-dark)]">{product.name}</p>
              <p className="text-sm text-[var(--color-coffee)]">R{product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}