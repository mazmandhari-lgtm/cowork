"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, ButtonLink } from "@/components/Button";
import { useCart, type CartItem } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import { getSupabaseClient } from "@/lib/supabase";

const SHIPPING_FEE = 2;
const WHATSAPP_NUMBER = "96877989255";

type Measurements = {
  length: string;
  shoulder: string;
  chest: string;
  waist: string;
  sleeve: string;
  notes: string;
};

function buildWhatsAppMessage(
  customer: { name: string; phone: string; city: string; neighborhood: string; address: string },
  delivery: boolean,
  needsMeasurements: boolean,
  measurements: Measurements,
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
  ];
  if (delivery) {
    lines.push(
      `• طريقة الاستلام: توصيل`,
      `• المدينة: ${customer.city} — ${customer.neighborhood}`,
      `• العنوان التفصيلي: ${customer.address}`
    );
  } else {
    lines.push(`• طريقة الاستلام: استلام مباشر (بدون توصيل)`);
  }

  if (needsMeasurements) {
    lines.push(
      "",
      "⚠️ العباية غير جاهزة للتسليم الفوري — تحتاج تفصيل حسب القياسات:",
      `• الطول: ${measurements.length || "—"} سم`,
      `• الكتف: ${measurements.shoulder || "—"} سم`,
      `• الصدر: ${measurements.chest || "—"} سم`,
      `• الخصر: ${measurements.waist || "—"} سم`,
      `• طول الكم: ${measurements.sleeve || "—"} سم`
    );
    if (measurements.notes) lines.push(`• ملاحظات: ${measurements.notes}`);
  }

  lines.push(
    "",
    "تفاصيل الطلب:",
    ...items.map((item) => `• ${item.name} (${item.size}) × ${item.qty} — ${formatPrice(item.price * item.qty)}`),
    "",
    `الشحن: ${shipping === 0 ? "لا يوجد (استلام مباشر)" : formatPrice(shipping)}`,
    `الإجمالي: ${formatPrice(subtotal + shipping)}`,
    "",
    "من فضلكم أرسلوا لي تفاصيل التحويل. بعد التحويل بأرسل لكم صورة الإيصال لتأكيد الطلب."
  );
  return lines.join("\n");
}

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();
  const [placed, setPlaced] = useState(false);
  const [waLink, setWaLink] = useState("");
  const [delivery, setDelivery] = useState(true);
  const [needsMeasurements, setNeedsMeasurements] = useState(false);

  const shipping = delivery ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const customer = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      city: String(data.get("city") ?? ""),
      neighborhood: String(data.get("neighborhood") ?? ""),
      address: String(data.get("address") ?? ""),
    };
    const measurements: Measurements = {
      length: String(data.get("m_length") ?? ""),
      shoulder: String(data.get("m_shoulder") ?? ""),
      chest: String(data.get("m_chest") ?? ""),
      waist: String(data.get("m_waist") ?? ""),
      sleeve: String(data.get("m_sleeve") ?? ""),
      notes: String(data.get("m_notes") ?? ""),
    };
    const message = buildWhatsAppMessage(
      customer,
      delivery,
      needsMeasurements,
      measurements,
      items,
      subtotal,
      shipping
    );
    const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setWaLink(link);
    window.open(link, "_blank", "noopener");
    setPlaced(true);
    clear();

    try {
      const supabase = getSupabaseClient();
      await supabase.from("orders").insert({
        customer_name: customer.name,
        customer_phone: customer.phone,
        delivery,
        city: delivery ? customer.city : null,
        neighborhood: delivery ? customer.neighborhood : null,
        address: delivery ? customer.address : null,
        custom_measurements: needsMeasurements ? measurements : null,
        items: items.map((item) => ({
          slug: item.slug,
          name: item.name,
          size: item.size,
          qty: item.qty,
          price: item.price,
        })),
        subtotal,
        shipping,
        total: subtotal + shipping,
      });
    } catch (err) {
      // The WhatsApp message already carries the full order — a DB hiccup
      // here must never block the customer from completing checkout.
      console.error("Failed to save order to Supabase", err);
    }
  }

  if (placed) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-28 text-center">
        <div className="success-check">✓</div>
        <h1 className="mt-7 text-[26px] font-bold">تم إرسال طلبك عبر واتساب</h1>
        <p className="t-soft mt-2 text-[15px]">
          أكملي المحادثة معنا على واتساب لإرسال إيصال التحويل وتأكيد طلبك نهائيًا.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
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
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-28 text-center">
        <span className="text-[44px]">🪡</span>
        <h1 className="mt-6 text-[26px] font-bold">لا يوجد ما يمكن إتمام طلبه</h1>
        <p className="t-soft mt-2 text-[15px]">سلتك فارغة حاليًا.</p>
        <div className="mt-7">
          <ButtonLink href="/shop">تصفّحي المتجر</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
      <h1 className="text-[32px] font-bold">إتمام الطلب</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-3">
        <div className="flex flex-col gap-7 lg:col-span-2">
          <div>
            <h2 className="text-[16px] font-bold">بياناتك</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input required name="name" placeholder="الاسم الكامل" className="input" />
              <input required name="phone" type="tel" placeholder="رقم الجوال" className="input" />
            </div>

            <label className={`option-card mt-4 ${delivery ? "active" : ""}`}>
              <input type="checkbox" checked={delivery} onChange={(e) => setDelivery(e.target.checked)} />
              <span className="text-[14px] font-medium">
                توصيل (+{formatPrice(SHIPPING_FEE)}) — إن لم تُفعّليه، فلا رسوم توصيل
              </span>
            </label>

            {delivery && (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input required name="city" placeholder="المدينة" className="input" />
                <input required name="neighborhood" placeholder="الحي" className="input" />
                <input required name="address" placeholder="العنوان التفصيلي" className="input sm:col-span-2" />
              </div>
            )}
          </div>

          <div>
            <h2 className="text-[16px] font-bold">القياسات</h2>
            <label className={`option-card mt-4 ${needsMeasurements ? "active" : ""}`}>
              <input
                type="checkbox"
                checked={needsMeasurements}
                onChange={(e) => setNeedsMeasurements(e.target.checked)}
              />
              <span className="text-[14px] font-medium">
                العباية غير جاهزة للتسليم الفوري — أحتاج تفصيل حسب قياساتي
              </span>
            </label>

            {needsMeasurements && (
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <input name="m_length" placeholder="الطول (سم)" className="input" />
                <input name="m_shoulder" placeholder="الكتف (سم)" className="input" />
                <input name="m_chest" placeholder="الصدر (سم)" className="input" />
                <input name="m_waist" placeholder="الخصر (سم)" className="input" />
                <input name="m_sleeve" placeholder="طول الكم (سم)" className="input" />
                <input name="m_notes" placeholder="ملاحظات إضافية" className="input sm:col-span-3" />
              </div>
            )}
          </div>

          <div>
            <h2 className="text-[16px] font-bold">إتمام الطلب والدفع</h2>
            <div className="option-card active mt-4 items-start">
              <span className="text-[20px] leading-none">🟢</span>
              <div>
                <p className="text-[14px] font-bold">الطلب والدفع عبر واتساب</p>
                <p className="t-soft mt-1 text-[13px] leading-7">
                  عند الضغط على الزر، بيفتح واتساب برسالة جاهزة فيها تفاصيل طلبك كاملة. بعد التواصل
                  معنا وتحويل المبلغ، أرسلي لنا صورة إيصال التحويل بنفس المحادثة لتأكيد طلبك.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="summary-card h-fit lg:sticky lg:top-24">
          <h2 className="text-[16px] font-bold">ملخص الطلب</h2>
          <div className="mt-4 flex flex-col gap-3">
            {items.map((item) => (
              <div key={`${item.slug}-${item.size}`} className="flex items-center gap-3">
                <div className="relative h-14 w-11 shrink-0 overflow-hidden rounded-lg">
                  <Image src={item.image} alt={item.name} fill sizes="44px" className="object-cover object-[65%_15%]" />
                </div>
                <div className="flex-1 text-[12.5px]">
                  <p className="font-bold">{item.name}</p>
                  <p className="t-faint">
                    {item.size} × {item.qty}
                  </p>
                </div>
                <p className="text-[12.5px] font-bold">{formatPrice(item.price * item.qty)}</p>
              </div>
            ))}
          </div>
          <div className="t-soft mt-4 flex justify-between border-t hairline pt-4 text-[14px]">
            <span>المجموع الفرعي</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="t-soft mt-3 flex justify-between text-[14px]">
            <span>الشحن</span>
            <span>{shipping === 0 ? "مجاني" : formatPrice(shipping)}</span>
          </div>
          <div className="mt-4 flex justify-between border-t hairline pt-4 text-[17px] font-extrabold">
            <span>الإجمالي</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Button type="submit" className="btn-block mt-5">
            إرسال الطلب عبر واتساب
          </Button>
          <button
            type="button"
            onClick={() => router.push("/cart")}
            className="btn btn-ghost btn-block mt-3"
          >
            العودة إلى السلة
          </button>
        </div>
      </form>
    </div>
  );
}
