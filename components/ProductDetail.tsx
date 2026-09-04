"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, ButtonLink } from "./Button";
import { useCart } from "@/lib/cart-context";
import { formatPrice, type Product } from "@/lib/products";

export function ProductDetail({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[Math.floor(product.sizes.length / 2)]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  const badge = product.isNew ? "جديد" : product.isBestseller ? "الأكثر طلبًا" : null;

  function handleAdd() {
    addItem(product, size, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:py-16">
      <div className="art-frame relative aspect-[4/5] self-start lg:sticky lg:top-24">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-[66%_14%]"
          priority
        />
      </div>

      <div className="reveal">
        {badge && <span className="chip active mb-3 inline-block">{badge}</span>}
        <p className="eyebrow">{product.category}</p>
        <h1 className="brand-en mt-2 text-[38px] font-semibold">{product.name}</h1>
        <p className="t-soft mt-2 text-[15px]">{product.tagline}</p>
        <p className="mt-4 text-[24px] font-extrabold">{formatPrice(product.price)}</p>
        <p className="t-soft mt-5 text-[14.5px] leading-8">{product.description}</p>

        <p className="mt-7 text-[12.5px] font-bold">المقاس</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`size-btn ${size === s ? "active" : ""}`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-7 flex items-center gap-4">
          <div className="stepper">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="إنقاص الكمية">
              −
            </button>
            <span className="w-7 text-center font-semibold">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} aria-label="زيادة الكمية">
              +
            </button>
          </div>
          <Button onClick={handleAdd} className="flex-1">
            {added ? "أُضيفت إلى السلة ✓" : "أضيفي إلى السلة"}
          </Button>
        </div>

        <button
          onClick={() => {
            addItem(product, size, qty);
            router.push("/checkout");
          }}
          className="btn btn-ghost btn-block mt-3"
        >
          شراء الآن
        </button>

        <div className="mt-9 border-t hairline pt-7">
          <p className="text-[12.5px] font-bold">تفاصيل المنتج</p>
          <ul className="mt-3 flex flex-col gap-2">
            {product.details.map((d) => (
              <li key={d} className="t-soft flex items-start gap-2 text-[13.5px]">
                <span className="mt-2 h-[5px] w-[5px] shrink-0 rounded-full" style={{ background: "var(--gold)" }} />
                {d}
              </li>
            ))}
          </ul>
          <p className="t-soft mt-4 text-[13px]">
            <strong style={{ color: "var(--ink)" }}>القماش: </strong>
            {product.fabric}
          </p>
        </div>

        <div className="mt-7">
          <ButtonLink href="/shop" variant="ghost">
            العودة إلى المتجر
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
