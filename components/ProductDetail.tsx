"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AbayaArt } from "./AbayaArt";
import { Button, ButtonLink } from "./Button";
import { useCart } from "@/lib/cart-context";
import { formatPrice, type Product } from "@/lib/products";

export function ProductDetail({ product }: { product: Product }) {
  const [colorIndex, setColorIndex] = useState(0);
  const [size, setSize] = useState(product.sizes[Math.floor(product.sizes.length / 2)]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();
  const color = product.colors[colorIndex];

  function handleAdd() {
    addItem(product, color.name, color.hex, size, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:py-20">
      <div className="flex items-center justify-center rounded-3xl bg-gradient-to-b from-neutral-200 to-neutral-100 py-16 dark:from-neutral-900 dark:to-neutral-950">
        <AbayaArt hex={color.hex} className="h-[420px] w-auto drop-shadow-2xl transition-all duration-500" />
      </div>

      <div>
        {(product.isNew || product.isBestseller) && (
          <span className="mb-3 inline-block rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
            {product.isNew ? "جديد" : "الأكثر مبيعًا"}
          </span>
        )}
        <p className="text-[13px] font-medium uppercase tracking-wider text-neutral-400">
          {product.category}
        </p>
        <h1 className="mt-2 text-[34px] font-bold tracking-tight">{product.name}</h1>
        <p className="mt-2 text-[16px] text-neutral-500 dark:text-neutral-400">{product.tagline}</p>

        <div className="mt-5 flex items-center gap-3">
          <span className="text-[24px] font-bold">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-[16px] text-neutral-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>

        <p className="mt-6 text-[15px] leading-8 text-neutral-600 dark:text-neutral-300">
          {product.description}
        </p>

        {/* Color selector */}
        <div className="mt-8">
          <p className="text-[13px] font-semibold">اللون: {color.name}</p>
          <div className="mt-3 flex gap-2">
            {product.colors.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setColorIndex(i)}
                className={`h-9 w-9 rounded-full ring-2 transition-all ${
                  i === colorIndex ? "ring-neutral-950 dark:ring-white" : "ring-transparent"
                }`}
                style={{ backgroundColor: c.hex }}
                aria-label={c.name}
              >
                <span className="sr-only">{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Size selector */}
        <div className="mt-7">
          <p className="text-[13px] font-semibold">المقاس</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`min-w-12 rounded-xl border px-3 py-2 text-[13px] font-medium transition-colors ${
                  size === s
                    ? "border-neutral-950 bg-neutral-950 text-white dark:border-white dark:bg-white dark:text-black"
                    : "border-neutral-300 text-neutral-700 hover:border-neutral-950 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Qty + Add to cart */}
        <div className="mt-8 flex items-center gap-4">
          <div className="flex items-center rounded-full border border-neutral-300 dark:border-neutral-700">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-11 w-11 items-center justify-center text-lg"
              aria-label="إنقاص الكمية"
            >
              −
            </button>
            <span className="w-8 text-center text-[15px] font-medium">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="flex h-11 w-11 items-center justify-center text-lg"
              aria-label="زيادة الكمية"
            >
              +
            </button>
          </div>
          <Button onClick={handleAdd} className="flex-1">
            {added ? "أُضيفت إلى السلة ✓" : "أضيفي إلى السلة"}
          </Button>
        </div>

        <button
          onClick={() => {
            addItem(product, color.name, color.hex, size, qty);
            router.push("/checkout");
          }}
          className="mt-3 w-full rounded-full border border-neutral-300 py-3 text-[15px] font-medium transition-colors hover:border-neutral-950 dark:border-neutral-700 dark:hover:border-white"
        >
          شراء الآن
        </button>

        {/* Details */}
        <div className="mt-10 border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <p className="text-[13px] font-semibold">تفاصيل المنتج</p>
          <ul className="mt-3 flex flex-col gap-2">
            {product.details.map((d) => (
              <li key={d} className="flex items-start gap-2 text-[14px] text-neutral-600 dark:text-neutral-300">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                {d}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[13px] text-neutral-500 dark:text-neutral-400">
            <span className="font-semibold text-neutral-700 dark:text-neutral-200">القماش: </span>
            {product.fabric}
          </p>
        </div>

        <div className="mt-8">
          <ButtonLink href="/shop" variant="ghost">
            العودة إلى المتجر
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
