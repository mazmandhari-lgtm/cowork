import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const badge = product.isNew ? "جديد" : product.isBestseller ? "الأكثر طلبًا" : null;

  return (
    <Link href={`/shop/${product.slug}`} className="pcard group">
      <div className="relative aspect-[4/5] overflow-hidden">
        {badge && <span className="pcard-badge">{badge}</span>}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          className="object-cover object-[72%_18%] transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p className="t-faint text-[11px] font-semibold uppercase tracking-wider">{product.category}</p>
        <h3 className="brand-en mt-1 text-[21px] font-semibold">{product.name}</h3>
        <p className="t-soft mt-1 min-h-[2.4em] text-[12.5px] leading-6">{product.tagline}</p>
        <p className="mt-2 text-[14.5px] font-bold">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
