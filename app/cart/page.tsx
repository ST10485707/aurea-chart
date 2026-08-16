"use client";

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-10 md:px-8">
          <h1
            className="text-2xl md:text-3xl text-[var(--color-coffee-dark)] mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Your bag
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[var(--color-coffee)] mb-6">Your bag is empty.</p>
              <Link
                href="/shop"
                className="inline-block px-8 py-3 rounded-full bg-[var(--color-coffee-dark)] text-[var(--color-cream)] text-sm tracking-wide hover:opacity-90 transition"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-6">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.color}-${item.size}`}
                    className="flex gap-4 border-b border-[var(--color-beige)] pb-6"
                  >
                    {/* Image placeholder */}
                    <div className="h-24 w-20 flex-shrink-0 rounded-lg bg-[var(--color-gold-soft)]/40" />

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-[var(--color-coffee-dark)]">
                            {item.name}
                          </p>
                          <p className="text-xs text-[var(--color-coffee)] mt-1">
                            {item.color} · {item.size}
                          </p>
                        </div>
                        <p className="text-sm text-[var(--color-coffee-dark)]">
                          R{item.price * item.quantity}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-[var(--color-beige)] rounded">
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.color, item.size, item.quantity - 1)
                            }
                            className="px-3 py-1 text-[var(--color-coffee-dark)]"
                          >
                            −
                          </button>
                          <span className="px-4 text-sm">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.color, item.size, item.quantity + 1)
                            }
                            className="px-3 py-1 text-[var(--color-coffee-dark)]"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.productId, item.color, item.size)}
                          className="text-xs text-[var(--color-coffee)] underline hover:text-[var(--color-coffee-dark)] transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-10 border-t border-[var(--color-beige)] pt-6">
                <div className="flex justify-between text-sm text-[var(--color-coffee)] mb-2">
                  <span>Subtotal</span>
                  <span>R{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm text-[var(--color-coffee)] mb-4">
                  <span>Delivery</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-lg text-[var(--color-coffee-dark)] mb-8">
                  <span style={{ fontFamily: "var(--font-heading)" }}>Total</span>
                  <span>R{totalPrice}</span>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full text-center rounded-full bg-[var(--color-coffee-dark)] text-[var(--color-cream)] py-3 text-sm tracking-wide hover:opacity-90 transition"
                >
                  PROCEED TO CHECKOUT
                </Link>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}