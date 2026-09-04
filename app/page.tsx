import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { getProducts } from "@/lib/products";

export default async function Home() {
  const products = await getProducts();
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const bestsellers = products.filter((p) => p.isBestseller);
  const picks = bestsellers.length > 0 ? bestsellers : products.slice(0, 3);
  const featured = products.find((p) => p.slug === "navy-lily") ?? products[0];
  const second = products.find((p) => p.slug === "red-hibiscus") ?? products[1];
  const heroProduct = products.find((p) => p.slug === "emerald-ruby") ?? products[0];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_.9fr]">
        <Reveal>
          <p className="eyebrow">مجموعة الخريف ٢٠٢٦</p>
          <h1 className="mt-4 text-[44px] font-bold leading-[1.18] sm:text-[52px]">
            العباية الجديدة.
            <br />
            أناقة مُعاد تعريفها.
          </h1>
          <p className="t-soft mt-4 max-w-[46ch] text-[16px] leading-8">
            تصميم مدروس، أقمشة مختارة بعناية، وحرفية دقيقة في كل غرزة. هذه ليست مجرد عباية، إنها
            فلسفة في الأناقة.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/shop">تسوّقي الآن</ButtonLink>
            <ButtonLink href="/about" variant="ghost">
              قصتنا
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="art-frame relative aspect-[4/5]">
            <Image
              src={heroProduct.image}
              alt={heroProduct.name}
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover object-[78%_20%]"
              priority
            />
            <span className="panel-glass brand-en absolute bottom-5 end-5 rounded-full px-4 py-2 text-[12px] font-semibold">
              {heroProduct.name}
            </span>
          </div>
        </Reveal>
      </section>

      {/* Categories */}
      <section className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <Reveal>
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-[28px] font-bold">تسوّقي حسب المناسبة</h2>
            <Link href="/shop" className="navlink">
              عرض الكل ←
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {categories.map((cat, i) => {
            const sample = products.find((p) => p.category === cat)!;
            return (
              <Reveal key={cat} delay={i * 80}>
                <Link href={`/shop?category=${encodeURIComponent(cat)}`} className="cat-card group block aspect-[4/5]">
                  <Image
                    src={sample.image}
                    alt={cat}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover object-[75%_22%] transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(20,14,10,.72), transparent 55%)" }}
                  />
                  <span className="cat-label">{cat}</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Feature — dark glass */}
      <section className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8">
        <div className="panel-dark grid grid-cols-1 items-center gap-12 p-8 sm:p-12 lg:grid-cols-2">
          <Reveal className="order-1 lg:order-2">
            <div className="art-frame relative aspect-[4/5]">
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                sizes="(max-width: 1024px) 100vw, 440px"
                className="object-cover object-[70%_18%]"
              />
            </div>
          </Reveal>
          <Reveal delay={120} className="order-2 lg:order-1">
            <p className="eyebrow">{featured.category}</p>
            <h2 className="brand-en mt-2 text-[36px] font-semibold">{featured.name}</h2>
            <p className="mt-4 max-w-[50ch] text-[15px] leading-8" style={{ color: "rgba(246,239,228,.74)" }}>
              {featured.tagline} {featured.description}
            </p>
            <div className="mt-6">
              <ButtonLink href={`/shop/${featured.slug}`} variant="gold">
                اكتشفي التفاصيل
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Feature — light */}
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <div className="art-frame relative aspect-[4/5]">
            <Image
              src={second.image}
              alt={second.name}
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover object-[70%_18%]"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">{second.category}</p>
          <h2 className="brand-en mt-2 text-[36px] font-semibold">{second.name}</h2>
          <p className="t-soft mt-4 max-w-[50ch] text-[15px] leading-8">
            {second.tagline} {second.description}
          </p>
          <div className="mt-6">
            <ButtonLink href={`/shop/${second.slug}`} variant="ghost">
              اكتشفي التفاصيل
            </ButtonLink>
          </div>
        </Reveal>
      </section>

      {/* Picks */}
      <section className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <Reveal>
          <h2 className="text-[28px] font-bold">مختاراتنا</h2>
        </Reveal>
        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3">
          {picks.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8">
        <Reveal>
          <div className="panel-glass px-6 py-10 text-center">
            <h2 className="text-[24px] font-bold">كوني أول من يعلم</h2>
            <p className="t-soft mx-auto mt-2 max-w-md text-[14px]">
              اشتركي في نشرتنا لتصلك أحدث المجموعات والعروض الحصرية أولًا بأول.
            </p>
            <NewsletterForm />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
