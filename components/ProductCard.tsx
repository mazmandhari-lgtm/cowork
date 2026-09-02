import Link from "next/link";
import { AbayaArt } from "./AbayaArt";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl bg-neutral-100 transition-transform duration-500 hover:-translate-y-1 dark:bg-neutral-900"
    >
      <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900">
        {(product.isNew || product.isBestseller) && (
          <span className="absolute right-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-neutral-900 backdrop-blur">
            {product.isNew ? "جديد" : "الأكثر مبيعًا"}
          </span>
        )}
        <AbayaArt
          hex={product.colors[0].hex}
          className="h-[78%] w-auto drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-5">
        <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">
          {product.category}
        </p>
        <h3 className="text-[16px] font-semibold text-neutral-900 dark:text-white">
          {product.name}
        </h3>
        <p className="text-[13px] text-neutral-500 dark:text-neutral-400">{product.tagline}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-[15px] font-semibold text-neutral-900 dark:text-white">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-[13px] text-neutral-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        <div className="mt-3 flex gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c.name}
              className="h-4 w-4 rounded-full ring-1 ring-black/10 dark:ring-white/20"
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>
      </div>
    </Link>
  );
}
