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

  return (
    <div
      className="art-frame relative aspect-[4/5]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {products.map((p, i) => (
        <div key={p.slug} className={`hero-slide ${i === index ? "active" : ""}`} aria-hidden={i !== index}>
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="(max-width: 1024px) 100vw, 480px"
            className="object-cover object-[78%_20%]"
            priority={i === 0}
          />
        </div>
      ))}

      <span className="panel-glass brand-en absolute bottom-5 end-5 rounded-full px-4 py-2 text-[12px] font-semibold transition-opacity duration-500">
        {products[index].name}
      </span>

      {products.length > 1 && (
        <div className="hero-dots">
          {products.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => setIndex(i)}
              aria-label={p.name}
              className={`hero-dot ${i === index ? "active" : ""}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
