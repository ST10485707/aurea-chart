"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string | null;
  stock: number;
  status: string;
  is_new: boolean;
  is_featured: boolean;
  is_bestseller: boolean;
};

export default function AdminProductsPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/admin/login");
        return;
      }
      setCheckingAuth(false);
      fetchProducts();
    }
    init();
  }, [router]);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("id, name, price, category, stock, status, is_new, is_featured, is_bestseller")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  }

  async function handleDelete(id: number, name: string) {
    const confirmed = window.confirm(
      `Delete "${name}"? This will also remove its variants and images. This cannot be undone.`
    );
    if (!confirmed) return;

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      alert("Error deleting product: " + error.message);
    } else {
      fetchProducts();
    }
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
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-sm text-[var(--color-coffee)] underline">
            ← Dashboard
          </Link>
          <h1
            className="text-xl text-[var(--color-coffee-dark)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Products
          </h1>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-[var(--color-coffee-dark)] text-[var(--color-cream)] px-5 py-2 text-sm tracking-wide hover:opacity-90 transition"
        >
          + ADD PRODUCT
        </Link>
      </div>

      <div className="p-6">
        {loading ? (
          <p className="text-[var(--color-coffee)]">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-[var(--color-coffee)]">No products yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-[var(--color-beige)] text-[var(--color-coffee)]">
                  <th className="py-3 pr-4">Name</th>
                  <th className="py-3 pr-4">Category</th>
                  <th className="py-3 pr-4">Price</th>
                  <th className="py-3 pr-4">Stock</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3 pr-4">Tags</th>
                  <th className="py-3 pr-4"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-[var(--color-beige)]/50"
                  >
                    <td className="py-3 pr-4 text-[var(--color-coffee-dark)]">
                      {product.name}
                    </td>
                    <td className="py-3 pr-4 text-[var(--color-coffee)]">
                      {product.category || "—"}
                    </td>
                    <td className="py-3 pr-4 text-[var(--color-coffee-dark)]">
                      R{product.price}
                    </td>
                    <td className="py-3 pr-4">
                      {product.stock === 0 ? (
                        <span className="text-red-700">Out of stock</span>
                      ) : product.stock <= 5 ? (
                        <span className="text-[var(--color-gold)]">
                          {product.stock} low
                        </span>
                      ) : (
                        <span className="text-[var(--color-coffee)]">
                          {product.stock}
                        </span>
                      )}
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          product.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-[var(--color-beige)] text-[var(--color-coffee)]"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-xs text-[var(--color-coffee)]">
                      {[
                        product.is_new && "NEW",
                        product.is_featured && "FEATURED",
                        product.is_bestseller && "BESTSELLER",
                      ]
                        .filter(Boolean)
                        .join(", ") || "—"}
                    </td>
                    <td className="py-3 pr-4 text-right whitespace-nowrap">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="text-[var(--color-coffee-dark)] underline mr-4"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="text-red-700 underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}