import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { products } from "@/lib/products";

const categories = Array.from(new Set(products.map((p) => p.category)));

export default function Home() {
  const bestsellers = products.filter((p) => p.isBestseller);
  const featured = products.find((p) => p.slug === "navy-lily") ?? products[0];
  const secondFeature = products.find((p) => p.slug === "red-hibiscus") ?? products[1];
  const heroProducts = [products[3], products[0], products[4]];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-100 via-white to-white px-6 py-20 text-center dark:from-neutral-950 dark:via-black dark:to-black">
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

        <div className="mt-14 flex w-full max-w-xl items-end justify-center gap-5">
          {heroProducts.map((p, i) => (
            <Link
              key={p.slug}
              href={`/shop/${p.slug}`}
              className={`relative w-24 overflow-hidden rounded-2xl shadow-xl transition-transform duration-500 hover:-translate-y-1 sm:w-32 ${
                i === 1 ? "h-64 sm:h-80" : "h-52 sm:h-64 opacity-90"
              } ${i === 0 ? "-rotate-3" : i === 2 ? "rotate-3" : ""}`}
            >
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="160px"
                className="object-cover object-[60%_center]"
                priority={i === 1}
              />
            </Link>
          ))}
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {categories.map((cat, i) => {
            const sample = products.find((p) => p.category === cat)!;
            return (
              <Reveal key={cat} delay={i * 80}>
                <Link
                  href={`/shop?category=${encodeURIComponent(cat)}`}
                  className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl"
                >
                  <Image
                    src={sample.image}
                    alt={cat}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover object-[65%_center] transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="relative bg-gradient-to-t from-black/70 to-transparent p-5 pt-16">
                    <p className="text-center text-[16px] font-semibold text-white">{cat}</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Feature 1 */}
      <section className="bg-neutral-950 py-24 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-5 sm:px-8 lg:flex-row-reverse">
          <Reveal className="relative aspect-[4/5] w-full max-w-md flex-1 overflow-hidden rounded-3xl">
            <Image
              src={featured.image}
              alt={featured.name}
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover object-[60%_center]"
            />
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
          <Reveal className="relative aspect-[4/5] w-full max-w-md flex-1 overflow-hidden rounded-3xl">
            <Image
              src={secondFeature.image}
              alt={secondFeature.name}
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover object-[60%_center]"
            />
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
          <h2 className="text-[28px] font-bold tracking-tight sm:text-[34px]">مختاراتنا</h2>
          <p className="mt-2 text-[15px] text-neutral-500 dark:text-neutral-400">
            القطع المفضّلة التي تحبها عميلاتنا أكثر من غيرها.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
          {(bestsellers.length > 0 ? bestsellers : products).map((p, i) => (
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
