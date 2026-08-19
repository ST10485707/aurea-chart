"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

type Product = {
  id: number;
  name: string;
  price: number;
  is_new: boolean;
  is_bestseller: boolean;
  stock: number;
  product_images: { image_url: string }[];
};

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
            const { data, error } = await supabase
        .from("products")
        .select("id, name, price, is_new, is_bestseller, stock, product_images(image_url)")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(8);

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  return (
    <section className="w-full bg-[var(--color-beige)]/30">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 md:px-8">
        <h2
          className="text-2xl md:text-3xl text-center text-[var(--color-coffee-dark)] mb-10"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          New arrivals
        </h2>

        {loading ? (
          <p className="text-center text-sm text-[var(--color-coffee)]">
            Loading products...
          </p>
        ) : products.length === 0 ? (
          <p className="text-center text-sm text-[var(--color-coffee)]">
            No products yet — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group flex flex-col"
              >
                                <div className="relative aspect-[3/4] w-full rounded-lg bg-[var(--color-gold-soft)]/40 overflow-hidden">
                  {product.product_images?.[0]?.image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.product_images[0].image_url}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                  {product.is_new && (
                    <span className="absolute top-2 left-2 rounded-full bg-[var(--color-coffee-dark)] px-2.5 py-1 text-[10px] tracking-wide text-[var(--color-cream)]">
                      NEW
                    </span>
                  )}
                  {product.is_bestseller && (
                    <span className="absolute top-2 left-2 rounded-full bg-[var(--color-coffee-dark)] px-2.5 py-1 text-[10px] tracking-wide text-[var(--color-cream)]">
                      BESTSELLER
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
        )}
      </div>
    </section>
  );
}