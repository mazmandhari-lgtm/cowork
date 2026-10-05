"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/products";

export function HeroSlider({ products }: { products: Product[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || products.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % products.length);
    }, 5000);
    return () => clearInterval(id);
  }, [paused, products.length]);

  const current = products[index];

  return (
    <div
      className="art-frame relative aspect-[4/5]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hero-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {products.map((p) => (
          <div key={p.slug} className="hero-slide-item">
            <Image
              src={p.image}
              alt={p.name}
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover object-[78%_20%]"
              priority={p.slug === products[0].slug}
            />
          </div>
        ))}
      </div>

      <span className="panel-glass brand-en absolute bottom-5 end-5 rounded-full px-4 py-2 text-[12px] font-semibold">
        {current.name}
      </span>
    </div>
  );
}
