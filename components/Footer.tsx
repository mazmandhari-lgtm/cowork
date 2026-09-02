import Link from "next/link";

const columns = [
  {
    title: "التسوق",
    links: [
      { label: "كل العبايات", href: "/shop" },
      { label: "يومية", href: "/shop?category=يومية" },
      { label: "مناسبات", href: "/shop?category=مناسبات" },
      { label: "سفر", href: "/shop?category=سفر" },
    ],
  },
  {
    title: "المتجر",
    links: [
      { label: "قصتنا", href: "/about" },
      { label: "التوصيل والإرجاع", href: "/about#shipping" },
      { label: "دليل المقاسات", href: "/about#sizing" },
      { label: "تواصل معنا", href: "/about#contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-900 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-2">
            <p className="text-[20px] font-semibold tracking-tight">سِتر</p>
            <p className="mt-3 max-w-xs text-[14px] leading-6 text-neutral-500 dark:text-neutral-400">
              عبايات مصمَّمة بعناية فائقة، حيث تلتقي البساطة بالفخامة في كل تفصيلة.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[13px] font-semibold text-neutral-900 dark:text-white">{col.title}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[13px] text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-neutral-200 pt-6 text-[12px] text-neutral-400 sm:flex-row sm:items-center sm:justify-between dark:border-neutral-800">
          <p>© {new Date().getFullYear()} سِتر. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <span>الرياض، المملكة العربية السعودية</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
