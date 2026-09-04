import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { getProductBySlug, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);

  return (
    <div>
      <ProductDetail product={product} />
      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
          <Reveal>
            <h2 className="text-[22px] font-bold">قد يعجبك أيضًا</h2>
          </Reveal>
          <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
