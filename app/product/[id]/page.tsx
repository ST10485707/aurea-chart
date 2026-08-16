"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Temporary placeholder data — will come from the database later
const product = {
  name: "Oversized Tracksuit",
  price: 799,
  badge: "NEW",
  description:
    "A relaxed-fit tracksuit in soft brushed fabric. Designed for everyday comfort without losing shape.",
  colors: [
    { name: "Black", hex: "#2B2B2B" },
    { name: "Cream", hex: "#F0E4D3" },
    { name: "Coffee", hex: "#5B4636" },
  ],
  sizes: ["S", "M", "L", "XL", "XXL"],
  // stock per color+size combination
  stock: {
    "Black-S": 4,
    "Black-M": 0,
    "Black-L": 6,
    "Cream-S": 2,
    "Cream-M": 5,
    "Cream-L": 0,
    "Coffee-S": 3,
    "Coffee-M": 3,
    "Coffee-L": 3,
  } as Record<string, number>,
};

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const stockKey = `${selectedColor}-${selectedSize}`;
  const availableStock = selectedSize ? product.stock[stockKey] ?? 0 : null;
  const isOutOfStock = selectedSize !== null && availableStock === 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 grid md:grid-cols-2 gap-10">
          {/* Image placeholder */}
          <div className="aspect-[3/4] w-full rounded-lg bg-[var(--color-gold-soft)]/40" />

          {/* Product details */}
          <div>
            {product.badge && (
              <span className="inline-block mb-3 rounded-full bg-[var(--color-coffee-dark)] px-3 py-1 text-[10px] tracking-wide text-[var(--color-cream)]">
                {product.badge}
              </span>
            )}

            <h1
              className="text-2xl md:text-3xl text-[var(--color-coffee-dark)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {product.name}
            </h1>

            <p className="mt-2 text-lg text-[var(--color-coffee)]">
              R{product.price}
            </p>

            <p className="mt-4 text-sm text-[var(--color-coffee)] leading-relaxed">
              {product.description}
            </p>

            {/* Color selection */}
            <div className="mt-8">
              <p className="text-sm text-[var(--color-coffee-dark)] mb-3">
                Colour: {selectedColor}
              </p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color.name);
                      setSelectedSize(null);
                    }}
                    aria-label={color.name}
                    className={`h-8 w-8 rounded-full border-2 transition ${
                      selectedColor === color.name
                        ? "border-[var(--color-gold)]"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div className="mt-6">
              <p className="text-sm text-[var(--color-coffee-dark)] mb-3">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const key = `${selectedColor}-${size}`;
                  const outOfStock = (product.stock[key] ?? 0) === 0;
                  return (
                    <button
                      key={size}
                      disabled={outOfStock}
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 min-w-10 px-3 rounded border text-sm transition ${
                        selectedSize === size
                          ? "border-[var(--color-coffee-dark)] bg-[var(--color-coffee-dark)] text-[var(--color-cream)]"
                          : outOfStock
                          ? "border-[var(--color-beige)] text-[var(--color-coffee)]/30 line-through cursor-not-allowed"
                          : "border-[var(--color-beige)] text-[var(--color-coffee-dark)] hover:border-[var(--color-coffee)]"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stock status */}
            {selectedSize && (
              <p className="mt-4 text-sm">
                {isOutOfStock ? (
                  <span className="text-red-700">OUT OF STOCK</span>
                ) : availableStock !== null && availableStock <= 3 ? (
                  <span className="text-[var(--color-gold)]">
                    LOW STOCK — only {availableStock} left
                  </span>
                ) : (
                  <span className="text-[var(--color-coffee)]">In stock</span>
                )}
              </p>
            )}

            {/* Quantity */}
            <div className="mt-6 flex items-center gap-4">
              <p className="text-sm text-[var(--color-coffee-dark)]">Quantity</p>
              <div className="flex items-center border border-[var(--color-beige)] rounded">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-[var(--color-coffee-dark)]"
                >
                  −
                </button>
                <span className="px-4 text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-[var(--color-coffee-dark)]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to bag */}
            <button
              disabled={!selectedSize || isOutOfStock}
              className={`mt-8 w-full rounded-full py-3 text-sm tracking-wide transition ${
                !selectedSize || isOutOfStock
                  ? "bg-[var(--color-beige)] text-[var(--color-coffee)]/50 cursor-not-allowed"
                  : "bg-[var(--color-coffee-dark)] text-[var(--color-cream)] hover:opacity-90"
              }`}
            >
              {isOutOfStock
                ? "OUT OF STOCK"
                : !selectedSize
                ? "SELECT A SIZE"
                : "ADD TO BAG"}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}