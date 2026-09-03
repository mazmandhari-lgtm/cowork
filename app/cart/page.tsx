"use client";

import Image from "next/image";
import Link from "next/link";
import { AbayaArt } from "@/components/AbayaArt";
import { ButtonLink } from "@/components/Button";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";

const FREE_SHIPPING_THRESHOLD = 40;
const SHIPPING_FEE = 2;

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-32 text-center">
        <AbayaArt hex="#c9cad0" className="h-40 w-auto opacity-70" />
        <h1 className="mt-8 text-[26px] font-bold">سلتك فارغة</h1>
        <p className="mt-2 text-[15px] text-neutral-500 dark:text-neutral-400">
          لم تضيفي أي عباية إلى سلتك بعد. تصفّحي مجموعتنا لتجدي ما يناسبك.
        </p>
        <div className="mt-8">
          <ButtonLink href="/shop">تصفّحي المتجر</ButtonLink>
        </div>
      </div>
    );
  }

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <h1 className="text-[32px] font-bold tracking-tight">سلة التسوق</h1>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          {items.map((item) => (
            <div
              key={`${item.slug}-${item.size}`}
              className="flex items-center gap-4 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800"
            >
              <Link
                href={`/shop/${item.slug}`}
                className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900"
              >
                <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover object-[60%_center]" />
              </Link>
              <div className="flex flex-1 flex-col gap-1">
                <Link href={`/shop/${item.slug}`} className="text-[15px] font-semibold hover:underline">
                  {item.name}
                </Link>
                <p className="text-[13px] text-neutral-500 dark:text-neutral-400">
                  المقاس: {item.size}
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center rounded-full border border-neutral-300 dark:border-neutral-700">
                    <button
                      onClick={() => updateQty(item.slug, item.size, item.qty - 1)}
                      className="flex h-8 w-8 items-center justify-center text-base"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-[13px]">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.slug, item.size, item.qty + 1)}
                      className="flex h-8 w-8 items-center justify-center text-base"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.slug, item.size)}
                    className="text-[13px] text-neutral-400 hover:text-red-500"
                  >
                    إزالة
                  </button>
                </div>
              </div>
              <p className="text-[15px] font-semibold whitespace-nowrap">
                {formatPrice(item.price * item.qty)}
              </p>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-2xl bg-neutral-50 p-6 dark:bg-neutral-950">
          <h2 className="text-[16px] font-semibold">ملخص الطلب</h2>
          <div className="mt-4 flex justify-between text-[14px] text-neutral-600 dark:text-neutral-300">
            <span>المجموع الفرعي</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between text-[14px] text-neutral-600 dark:text-neutral-300">
            <span>الشحن</span>
            <span>{shipping === 0 ? "مجاني" : formatPrice(shipping)}</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4 text-[16px] font-bold dark:border-neutral-800">
            <span>الإجمالي</span>
            <span>{formatPrice(subtotal + shipping)}</span>
          </div>
          <ButtonLink href="/checkout" className="mt-6 w-full">
            المتابعة للدفع
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
