"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { products, type Product } from "@/lib/products";

const categories: Array<Product["category"] | "الكل"> = [
  "الكل",
  ...Array.from(new Set(products.map((p) => p.category))),
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as Product["category"] | null;
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>(
    initialCategory && categories.includes(initialCategory) ? initialCategory : "الكل"
  );
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) => activeCategory === "الكل" || p.category === activeCategory
    );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [activeCategory, sort]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <Reveal>
        <div className="text-center">
          <h1 className="text-[36px] font-bold tracking-tight sm:text-[44px]">المتجر</h1>
          <p className="mx-auto mt-3 max-w-md text-[15px] text-neutral-500 dark:text-neutral-400">
            كل تصاميمنا بمكان واحد، اختاري ما يناسب مناسبتك ويومك.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 flex flex-col items-center justify-between gap-5 border-b border-neutral-200 pb-6 sm:flex-row dark:border-neutral-800">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-neutral-950 text-white dark:bg-white dark:text-black"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-[13px] outline-none dark:border-neutral-700 dark:bg-neutral-900"
        >
          <option value="featured">الأحدث</option>
          <option value="price-asc">السعر: من الأقل للأعلى</option>
          <option value="price-desc">السعر: من الأعلى للأقل</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="py-24 text-center text-neutral-400">لا توجد منتجات في هذا التصنيف حاليًا.</p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 6) * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopContent />
    </Suspense>
  );
}
