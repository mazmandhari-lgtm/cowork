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
    let list = products.filter((p) => activeCategory === "الكل" || p.category === activeCategory);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [activeCategory, sort]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <Reveal>
        <div className="text-center">
          <h1 className="text-[38px] font-bold">المتجر</h1>
          <p className="t-soft mt-2 text-[14.5px]">
            كل تصاميمنا بمكان واحد، اختاري ما يناسب مناسبتك ويومك.
          </p>
        </div>
      </Reveal>

      <div className="mt-8 flex flex-col items-center justify-between gap-4 border-b hairline pb-6 sm:flex-row">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`chip ${activeCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="sortsel"
        >
          <option value="featured">الأحدث</option>
          <option value="price-asc">السعر: من الأقل للأعلى</option>
          <option value="price-desc">السعر: من الأعلى للأقل</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="t-faint py-20 text-center">لا توجد منتجات في هذا التصنيف حاليًا.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-5 pb-10 sm:grid-cols-3">
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
