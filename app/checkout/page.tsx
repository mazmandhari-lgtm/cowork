"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AbayaArt } from "@/components/AbayaArt";
import { Button, ButtonLink } from "@/components/Button";
import { useCart, type CartItem } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";

const SHIPPING_FEE = 2;
const WHATSAPP_NUMBER = "96877989255";

function buildWhatsAppMessage(
  customer: { name: string; phone: string; city: string; neighborhood: string; address: string },
  items: CartItem[],
  subtotal: number,
  shipping: number
) {
  const lines = [
    "مرحبًا Uniflora Closet 👋 أرغب بطلب:",
    "",
    "بيانات الزبونة:",
    `• الاسم الكامل: ${customer.name}`,
    `• رقم الجوال: ${customer.phone}`,
    `• المدينة: ${customer.city} — ${customer.neighborhood}`,
    `• العنوان التفصيلي: ${customer.address}`,
    "",
    "تفاصيل الطلب:",
    ...items.map((item) => `• ${item.name} (${item.size}) × ${item.qty} — ${formatPrice(item.price * item.qty)}`),
    "",
    `الشحن: ${formatPrice(shipping)}`,
    `الإجمالي: ${formatPrice(subtotal + shipping)}`,
    "",
    "من فضلكم أرسلوا لي تفاصيل التحويل. بعد التحويل بأرسل لكم صورة الإيصال لتأكيد الطلب.",
  ];
  return lines.join("\n");
}

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();
  const [placed, setPlaced] = useState(false);
  const [waLink, setWaLink] = useState("");

  const shipping = SHIPPING_FEE;
  const total = subtotal + shipping;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const customer = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      city: String(data.get("city") ?? ""),
      neighborhood: String(data.get("neighborhood") ?? ""),
      address: String(data.get("address") ?? ""),
    };
    const message = buildWhatsAppMessage(customer, items, subtotal, shipping);
    const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setWaLink(link);
    window.open(link, "_blank", "noopener");
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
        <h1 className="mt-8 text-[26px] font-bold">تم إرسال طلبك عبر واتساب</h1>
        <p className="mt-2 text-[15px] text-neutral-500 dark:text-neutral-400">
          أكملي المحادثة معنا على واتساب لإرسال إيصال التحويل وتأكيد طلبك نهائيًا.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href={waLink}>فتح واتساب مرة أخرى</ButtonLink>
          <ButtonLink href="/shop" variant="ghost">
            متابعة التسوق
          </ButtonLink>
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
              <input required name="name" placeholder="الاسم الكامل" className="input" />
              <input required name="phone" type="tel" placeholder="رقم الجوال" className="input" />
              <input required name="city" placeholder="المدينة" className="input" />
              <input required name="neighborhood" placeholder="الحي" className="input" />
              <input required name="address" placeholder="العنوان التفصيلي" className="input sm:col-span-2" />
            </div>
          </div>

          <div>
            <h2 className="text-[16px] font-semibold">إتمام الطلب والدفع</h2>
            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-neutral-950 p-4 dark:border-white">
              <span className="text-[20px] leading-none">🟢</span>
              <div>
                <p className="text-[14px] font-semibold">الطلب والدفع عبر واتساب</p>
                <p className="mt-1 text-[13px] leading-6 text-neutral-500 dark:text-neutral-400">
                  عند الضغط على الزر، بيفتح واتساب برسالة جاهزة فيها تفاصيل طلبك كاملة. بعد التواصل
                  معنا وتحويل المبلغ، أرسلي لنا صورة إيصال التحويل بنفس المحادثة لتأكيد طلبك.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-fit rounded-2xl bg-neutral-50 p-6 dark:bg-neutral-950">
          <h2 className="text-[16px] font-semibold">ملخص الطلب</h2>
          <div className="mt-4 flex flex-col gap-3">
            {items.map((item) => (
              <div key={`${item.slug}-${item.size}`} className="flex items-center gap-3">
                <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-white dark:bg-neutral-900">
                  <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover object-[60%_center]" />
                </div>
                <div className="flex-1 text-[13px]">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-neutral-400">
                    {item.size} × {item.qty}
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
            <span>{formatPrice(shipping)}</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4 text-[16px] font-bold dark:border-neutral-800">
            <span>الإجمالي</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Button type="submit" className="mt-6 w-full">
            إرسال الطلب عبر واتساب
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
