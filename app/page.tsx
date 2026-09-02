import Link from "next/link";
import { AbayaArt } from "@/components/AbayaArt";
import { ButtonLink } from "@/components/Button";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { products } from "@/lib/products";

export default function Home() {
  const bestsellers = products.filter((p) => p.isBestseller);
  const featured = products[1];
  const secondFeature = products.find((p) => p.category === "سفر")!;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-100 via-white to-white px-6 text-center dark:from-neutral-950 dark:via-black dark:to-black">
        <div className="animate-fade-in-up flex flex-col items-center">
          <p className="text-[13px] font-semibold tracking-[0.2em] text-neutral-400">
            مجموعة الخريف ٢٠٢٦
          </p>
          <h1 className="mt-4 max-w-3xl text-[44px] font-bold leading-[1.15] tracking-tight sm:text-[68px]">
            العباية الجديدة.
            <br />
            أناقة مُعاد تعريفها.
          </h1>
          <p className="mt-5 max-w-lg text-[17px] leading-8 text-neutral-500 dark:text-neutral-400">
            تصميم مدروس، أقمشة مختارة بعناية، وحرفية دقيقة في كل غرزة.
            هذه ليست مجرد عباية، إنها فلسفة في الأناقة.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/shop">تسوّقي الآن</ButtonLink>
            <ButtonLink href={`/shop/${featured.slug}`} variant="ghost">
              اكتشفي المزيد
            </ButtonLink>
          </div>
        </div>

        <div className="mt-14 flex w-full max-w-md items-end justify-center gap-6">
          <AbayaArt hex="#1c2333" className="h-56 w-auto -rotate-3 opacity-80" />
          <AbayaArt hex="#111113" className="h-72 w-auto drop-shadow-2xl" />
          <AbayaArt hex="#cdbfa5" className="h-56 w-auto rotate-3 opacity-80" />
        </div>
      </section>

      {/* Collections strip */}
      <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8">
        <Reveal>
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-[28px] font-bold tracking-tight sm:text-[34px]">
              تسوّقي حسب المناسبة
            </h2>
            <Link href="/shop" className="hidden text-[14px] font-medium text-neutral-500 hover:text-neutral-900 sm:block dark:hover:text-white">
              عرض الكل ←
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {(["يومية", "مناسبات", "سفر", "إحرام وصلاة"] as const).map((cat, i) => {
            const sample = products.find((p) => p.category === cat)!;
            return (
              <Reveal key={cat} delay={i * 80}>
                <Link
                  href={`/shop?category=${encodeURIComponent(cat)}`}
                  className="group flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-b from-neutral-200 to-neutral-100 p-5 transition-transform duration-500 hover:-translate-y-1 dark:from-neutral-900 dark:to-neutral-950"
                >
                  <AbayaArt
                    hex={sample.colors[0].hex}
                    className="mx-auto h-[70%] w-auto transition-transform duration-500 group-hover:scale-105"
                  />
                  <p className="mt-3 text-center text-[15px] font-semibold">{cat}</p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Feature 1 */}
      <section className="bg-neutral-950 py-24 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-5 sm:px-8 lg:flex-row-reverse">
          <Reveal className="relative flex flex-1 justify-center">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-[380px] w-[380px] rounded-full bg-white/[0.06] blur-3xl" />
            </div>
            <AbayaArt hex={featured.colors[1]?.hex ?? featured.colors[0].hex} className="relative h-[420px] w-auto drop-shadow-2xl" />
          </Reveal>
          <Reveal delay={120} className="flex-1 text-center lg:text-right">
            <p className="text-[13px] font-semibold tracking-[0.2em] text-neutral-400">
              {featured.category}
            </p>
            <h2 className="mt-3 text-[36px] font-bold leading-tight tracking-tight sm:text-[46px]">
              {featured.name}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[17px] leading-8 text-neutral-300 lg:mr-0">
              {featured.tagline} {featured.description}
            </p>
            <div className="mt-8">
              <ButtonLink href={`/shop/${featured.slug}`} variant="secondary">
                اكتشفي التفاصيل
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Feature 2 */}
      <section className="bg-gradient-to-b from-white to-neutral-100 py-24 dark:from-black dark:to-neutral-950">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-5 sm:px-8 lg:flex-row">
          <Reveal className="flex flex-1 justify-center">
            <AbayaArt hex={secondFeature.colors[0].hex} className="h-[420px] w-auto drop-shadow-2xl" />
          </Reveal>
          <Reveal delay={120} className="flex-1 text-center lg:text-right">
            <p className="text-[13px] font-semibold tracking-[0.2em] text-neutral-400">
              {secondFeature.category}
            </p>
            <h2 className="mt-3 text-[36px] font-bold leading-tight tracking-tight sm:text-[46px]">
              {secondFeature.name}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[17px] leading-8 text-neutral-500 dark:text-neutral-400 lg:mr-0">
              {secondFeature.tagline} {secondFeature.description}
            </p>
            <div className="mt-8">
              <ButtonLink href={`/shop/${secondFeature.slug}`}>اكتشفي التفاصيل</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8">
        <Reveal>
          <h2 className="text-[28px] font-bold tracking-tight sm:text-[34px]">الأكثر مبيعًا</h2>
          <p className="mt-2 text-[15px] text-neutral-500 dark:text-neutral-400">
            القطع المفضّلة التي تحبها عميلاتنا أكثر من غيرها.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
          {bestsellers.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-20 text-center dark:border-neutral-900 dark:bg-neutral-950">
        <Reveal className="mx-auto max-w-xl px-6">
          <h2 className="text-[26px] font-bold tracking-tight">كوني أول من يعلم</h2>
          <p className="mt-2 text-[15px] text-neutral-500 dark:text-neutral-400">
            اشتركي في نشرتنا لتصلك أحدث المجموعات والعروض الحصرية أولًا بأول.
          </p>
          <NewsletterForm />
        </Reveal>
      </section>
    </div>
  );
}
