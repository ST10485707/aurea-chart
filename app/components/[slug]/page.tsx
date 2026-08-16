import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Temporary placeholder products — same for every category for now.
// Once the database is built, each category will show its real products.
const products = [
  { id: 1, name: "Oversized Tracksuit", price: 799, badge: "NEW" },
  { id: 2, name: "Cream Knit Sweater", price: 549, badge: "BESTSELLER" },
  { id: 3, name: "Arabic Perfume Oil 12ml", price: 349, badge: "NEW" },
  { id: 4, name: "Woven Tote Bag", price: 429, badge: null },
  { id: 5, name: "Classic Sneakers", price: 899, badge: "LOW STOCK" },
  { id: 6, name: "Satin Wrap Dress", price: 649, badge: "SALE" },
];

// Turns a URL slug like "home-lifestyle" into a readable title "Home lifestyle"
function formatCategoryName(slug: string) {
  return slug.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoryName = formatCategoryName(slug);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
          <h1
            className="text-2xl md:text-3xl text-[var(--color-coffee-dark)] mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {categoryName}
          </h1>
          <p className="text-sm text-[var(--color-coffee)] mb-8">
            {products.length} products
          </p>

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
                </div>
                <p className="mt-3 text-sm text-[var(--color-coffee-dark)]">
                  {product.name}
                </p>
                <p className="text-sm text-[var(--color-coffee)]">
                  R{product.price}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}