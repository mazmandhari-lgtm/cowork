"use client";

import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";

const SHIPPING_FEE = 2;

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-28 text-center">
        <span className="text-[44px]">🪡</span>
        <h1 className="mt-6 text-[26px] font-bold">سلتك فارغة</h1>
        <p className="t-soft mt-2 text-[15px]">
          لم تضيفي أي عباية إلى سلتك بعد. تصفّحي مجموعتنا لتجدي ما يناسبك.
        </p>
        <div className="mt-7">
          <ButtonLink href="/shop">تصفّحي المتجر</ButtonLink>
        </div>
      </div>
    );
  }

  const shipping = SHIPPING_FEE;

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
      <h1 className="text-[32px] font-bold">سلة التسوق</h1>

      <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          {items.map((item) => (
            <div key={`${item.slug}-${item.size}`} className="cart-line">
              <Link
                href={`/shop/${item.slug}`}
                className="relative h-24 w-20 shrink-0 overflow-hidden rounded-2xl border hairline"
              >
                <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover object-[65%_15%]" />
              </Link>
              <div className="flex flex-1 flex-col gap-1">
                <Link href={`/shop/${item.slug}`} className="text-[15px] font-bold hover:underline">
                  {item.name}
                </Link>
                <p className="t-faint text-[12.5px]">المقاس: {item.size}</p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="stepper" style={{ height: 32 }}>
                    <button
                      onClick={() => updateQty(item.slug, item.size, item.qty - 1)}
                      style={{ width: 32, height: 32, fontSize: 14 }}
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-[13px]">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.slug, item.size, item.qty + 1)}
                      style={{ width: 32, height: 32, fontSize: 14 }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.slug, item.size)}
                    className="t-faint text-[12.5px] hover:text-[var(--accent)]"
                  >
                    إزالة
                  </button>
                </div>
              </div>
              <p className="whitespace-nowrap text-[14.5px] font-bold">
                {formatPrice(item.price * item.qty)}
              </p>
            </div>
          ))}
        </div>

        <div className="summary-card h-fit lg:sticky lg:top-24">
          <h2 className="text-[16px] font-bold">ملخص الطلب</h2>
          <div className="t-soft mt-4 flex justify-between text-[14px]">
            <span>المجموع الفرعي</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="t-soft mt-3 flex justify-between text-[14px]">
            <span>الشحن</span>
            <span>{formatPrice(shipping)}</span>
          </div>
          <div className="mt-4 flex justify-between border-t hairline pt-4 text-[17px] font-extrabold">
            <span>الإجمالي</span>
            <span>{formatPrice(subtotal + shipping)}</span>
          </div>
          <p className="t-faint mt-3 text-[11.5px] leading-6">
            * التوصيل اختياري — يمكنك إلغاء تفعيله عند إتمام الطلب فلا تُحتسب أي رسوم.
          </p>
          <ButtonLink href="/checkout" className="btn-block mt-4">
            المتابعة للدفع
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
