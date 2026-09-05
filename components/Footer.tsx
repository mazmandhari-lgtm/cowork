import Link from "next/link";
import { getProducts } from "@/lib/products";

export async function Footer() {
  const products = await getProducts();
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <footer className="sitefoot mt-10">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2">
            <p className="wordmark text-[20px]">Uniflora Closet</p>
            <p className="t-soft mt-3 max-w-xs text-[13px] leading-7">
              عبايات مصمَّمة بعناية فائقة، حيث تلتقي البساطة بالفخامة في كل تفصيلة.
            </p>
          </div>
          <div>
            <p className="text-[13px] font-bold">التسوق</p>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <Link href="/shop" className="navlink">
                  كل العبايات
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link href={`/shop?category=${encodeURIComponent(c)}`} className="navlink">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[13px] font-bold">المتجر</p>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <Link href="/about" className="navlink">
                  قصتنا
                </Link>
              </li>
              <li>
                <Link href="/about#shipping" className="navlink">
                  التوصيل والإرجاع
                </Link>
              </li>
              <li>
                <Link href="/about#sizing" className="navlink">
                  دليل المقاسات
                </Link>
              </li>
              <li>
                <Link href="/about#contact" className="navlink">
                  تواصلي معنا
                </Link>
              </li>
              <li>
                <Link href="/terms" className="navlink">
                  الشروط والأحكام
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="t-faint mt-12 flex flex-col gap-3 border-t hairline pt-6 text-[12px] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Uniflora Closet. جميع الحقوق محفوظة.</p>
          <span>مسقط، سلطنة عُمان</span>
        </div>
      </div>
    </footer>
  );
}
