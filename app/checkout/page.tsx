"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AbayaArt } from "@/components/AbayaArt";
import { Button, ButtonLink } from "@/components/Button";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();
  const [placed, setPlaced] = useState(false);
  const [payment, setPayment] = useState<"card" | "cod">("card");

  const shipping = subtotal >= 500 || subtotal === 0 ? 0 : 25;
  const total = subtotal + shipping;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPlaced(true);
    clear();
  }

  if (placed) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-32 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-950 text-white dark:bg-white dark:text-black">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="mt-8 text-[26px] font-bold">تم استلام طلبك بنجاح</h1>
        <p className="mt-2 text-[15px] text-neutral-500 dark:text-neutral-400">
          شكرًا لثقتك بنا. سنرسل لك تأكيدًا وتفاصيل الشحن قريبًا.
        </p>
        <div className="mt-8">
          <ButtonLink href="/shop">متابعة التسوق</ButtonLink>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-32 text-center">
        <AbayaArt hex="#c9cad0" className="h-40 w-auto opacity-70" />
        <h1 className="mt-8 text-[26px] font-bold">لا يوجد ما يمكن إتمام طلبه</h1>
        <p className="mt-2 text-[15px] text-neutral-500 dark:text-neutral-400">سلتك فارغة حاليًا.</p>
        <div className="mt-8">
          <ButtonLink href="/shop">تصفّحي المتجر</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <h1 className="text-[32px] font-bold tracking-tight">إتمام الطلب</h1>

      <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="flex flex-col gap-8 lg:col-span-2">
          <div>
            <h2 className="text-[16px] font-semibold">معلومات التوصيل</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input required placeholder="الاسم الكامل" className="input" />
              <input required type="tel" placeholder="رقم الجوال" className="input" />
              <input required type="email" placeholder="البريد الإلكتروني" className="input sm:col-span-2" />
              <input required placeholder="المدينة" className="input" />
              <input required placeholder="الحي" className="input" />
              <input required placeholder="العنوان التفصيلي" className="input sm:col-span-2" />
            </div>
          </div>

          <div>
            <h2 className="text-[16px] font-semibold">طريقة الدفع</h2>
            <div className="mt-4 flex flex-col gap-3">
              <label
                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-colors ${
                  payment === "card" ? "border-neutral-950 dark:border-white" : "border-neutral-200 dark:border-neutral-800"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === "card"}
                    onChange={() => setPayment("card")}
                  />
                  <span className="text-[14px] font-medium">بطاقة ائتمان / مدى</span>
                </span>
              </label>
              <label
                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-colors ${
                  payment === "cod" ? "border-neutral-950 dark:border-white" : "border-neutral-200 dark:border-neutral-800"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === "cod"}
                    onChange={() => setPayment("cod")}
                  />
                  <span className="text-[14px] font-medium">الدفع عند الاستلام</span>
                </span>
              </label>

              {payment === "card" && (
                <div className="grid grid-cols-1 gap-4 rounded-2xl bg-neutral-50 p-4 sm:grid-cols-2 dark:bg-neutral-950">
                  <input required placeholder="رقم البطاقة" className="input sm:col-span-2" />
                  <input required placeholder="تاريخ الانتهاء (MM/YY)" className="input" />
                  <input required placeholder="CVC" className="input" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="h-fit rounded-2xl bg-neutral-50 p-6 dark:bg-neutral-950">
          <h2 className="text-[16px] font-semibold">ملخص الطلب</h2>
          <div className="mt-4 flex flex-col gap-3">
            {items.map((item) => (
              <div key={`${item.slug}-${item.color}-${item.size}`} className="flex items-center gap-3">
                <div className="flex h-14 w-12 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-neutral-900">
                  <AbayaArt hex={item.colorHex} className="h-12 w-auto" />
                </div>
                <div className="flex-1 text-[13px]">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-neutral-400">
                    {item.color} · {item.size} × {item.qty}
                  </p>
                </div>
                <p className="text-[13px] font-semibold">{formatPrice(item.price * item.qty)}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-between border-t border-neutral-200 pt-4 text-[14px] text-neutral-600 dark:border-neutral-800 dark:text-neutral-300">
            <span>المجموع الفرعي</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between text-[14px] text-neutral-600 dark:text-neutral-300">
            <span>الشحن</span>
            <span>{shipping === 0 ? "مجاني" : formatPrice(shipping)}</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4 text-[16px] font-bold dark:border-neutral-800">
            <span>الإجمالي</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Button type="submit" className="mt-6 w-full">
            تأكيد الطلب
          </Button>
          <button
            type="button"
            onClick={() => router.push("/cart")}
            className="mt-3 w-full text-center text-[13px] text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
          >
            العودة إلى السلة
          </button>
        </div>
      </form>
    </div>
  );
}
