"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";
import { supabase } from "../../lib/supabase";

type Variant = {
  id: number;
  color: string;
  size: string;
  stock: number;
};

type ProductImage = {
  image_url: string;
  color: string | null;
};

// Maps colour names to actual swatch colours.
// The displayed label always comes from the database — this only controls the swatch dot.
const colorSwatchMap: Record<string, string> = {
  Brown: "#4A2E1E",
  Cream: "#F5EFE0",
  Green: "#3F5B3E",
  Orange: "#D6752B",
  Charcoal: "#3A3A3A",
  Grey: "#8C8C8C",
  Black: "#1A1A1A",
  Navy: "#1F2A44",
  Mint: "#A8CBB7",
};

function getSwatchColor(colorName: string) {
  return colorSwatchMap[colorName] || colorName.toLowerCase();
}
type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  is_new: boolean;
  is_bestseller: boolean;
  product_variants: Variant[];
  product_images: ProductImage[];
};

export default function ProductPage() {
  const params = useParams();
  const productId = Number(params.id);

  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from("products")
        .select(
          "id, name, price, description, is_new, is_bestseller, product_variants(id, color, size, stock), product_images(image_url, color)"
        )
        .eq("id", productId)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
      } else if (data) {
        setProduct(data);
        // Auto-select the first available colour
        const firstColor = data.product_variants?.[0]?.color;
        if (firstColor) setSelectedColor(firstColor);
      }
      setLoading(false);
    }

    if (productId) fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-[var(--color-coffee)]">Loading product...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-[var(--color-coffee)]">Product not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  // Unique colours available for this product
  const colors = Array.from(
    new Set(product.product_variants.map((v) => v.color))
  );

  // Unique sizes available for this product
  const sizes = Array.from(
    new Set(product.product_variants.map((v) => v.size))
  );

  // Find stock for the currently selected colour+size
  const selectedVariant = product.product_variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  );
  const availableStock = selectedVariant?.stock ?? null;
  const isOutOfStock = selectedSize !== null && (availableStock ?? 0) === 0;

  // Pick the right image: colour-specific first, otherwise the general one
  const displayImage =
    product.product_images.find((img) => img.color === selectedColor)
      ?.image_url ||
    product.product_images.find((img) => !img.color)?.image_url ||
    product.product_images[0]?.image_url;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 grid md:grid-cols-2 gap-10">
          {/* Image */}
          <div className="aspect-[3/4] w-full rounded-lg bg-[var(--color-gold-soft)]/40 overflow-hidden">
            {displayImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={displayImage}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          {/* Product details */}
          <div>
            {product.is_new && (
              <span className="inline-block mb-3 rounded-full bg-[var(--color-coffee-dark)] px-3 py-1 text-[10px] tracking-wide text-[var(--color-cream)]">
                NEW
              </span>
            )}
            {product.is_bestseller && (
              <span className="inline-block mb-3 rounded-full bg-[var(--color-coffee-dark)] px-3 py-1 text-[10px] tracking-wide text-[var(--color-cream)]">
                BESTSELLER
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

            {product.description && (
              <p className="mt-4 text-sm text-[var(--color-coffee)] leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Colour selection */}
            {colors.length > 0 && (
              <div className="mt-8">
                <p className="text-sm text-[var(--color-coffee-dark)] mb-3">
                  Colour: {selectedColor}
                </p>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setSelectedColor(color);
                        setSelectedSize(null);
                      }}
                      aria-label={color}
                      className={`h-8 w-8 rounded-full border-2 transition ${
                        selectedColor === color
                          ? "border-[var(--color-gold)]"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: getSwatchColor(color) }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size selection */}
            {sizes.length > 0 && (
              <div className="mt-6">
                <p className="text-sm text-[var(--color-coffee-dark)] mb-3">Size</p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => {
                    const variant = product.product_variants.find(
                      (v) => v.color === selectedColor && v.size === size
                    );
                    const outOfStock = (variant?.stock ?? 0) === 0;
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
            )}

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
              onClick={() => {
                if (!selectedSize || !selectedColor) return;
                addItem({
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  color: selectedColor,
                  size: selectedSize,
                  quantity,
                });
              }}
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