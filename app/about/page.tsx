import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { products } from "@/lib/products";

const values = [
  {
    title: "حرفية دقيقة",
    desc: "كل عباية تمر بأكثر من 40 خطوة تصنيع يدوية، من اختيار القماش حتى الغرزة الأخيرة.",
  },
  {
    title: "أقمشة مختارة",
    desc: "نستورد أقمشتنا من أفضل الموردين حول العالم، ونختبرها لضمان الجودة والراحة.",
  },
  {
    title: "استدامة حقيقية",
    desc: "نعتمد إنتاجًا محدودًا يقلّل الهدر، وتغليفًا صديقًا للبيئة في كل طلب.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="flex flex-col items-center px-6 py-24 text-center">
        <Reveal>
          <p className="text-[13px] font-semibold tracking-[0.2em] text-neutral-400">قصتنا</p>
          <h1 className="mt-4 max-w-2xl text-[38px] font-bold leading-tight tracking-tight sm:text-[52px]">
            صُنعت لتُروى أناقتها، لا فقط لتُرتدى.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-8 text-neutral-500 dark:text-neutral-400">
            بدأت رحلة سِتر من فكرة بسيطة: أن تكون العباية أكثر من قطعة ملابس،
            بل تعبيرًا عن الهوية والذوق. نصمم كل قطعة بعناية فائقة لتجمع بين
            الاحتشام الأصيل وروح العصر.
          </p>
        </Reveal>
        <Reveal delay={150} className="mt-14 flex items-end gap-4">
          {[products[2], products[0], products[4]].map((p, i) => (
            <div
              key={p.slug}
              className={`relative w-32 overflow-hidden rounded-2xl shadow-xl sm:w-40 ${
                i === 1 ? "h-72 sm:h-96" : "h-56 sm:h-72 opacity-90"
              } ${i === 0 ? "-rotate-6" : i === 2 ? "rotate-6" : ""}`}
            >
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="160px"
                className="object-cover object-[60%_center]"
              />
            </div>
          ))}
        </Reveal>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50 py-24 dark:border-neutral-900 dark:bg-neutral-950">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 sm:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 100} className="text-center">
              <h3 className="text-[18px] font-semibold">{v.title}</h3>
              <p className="mt-2 text-[14px] leading-7 text-neutral-500 dark:text-neutral-400">
                {v.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="sizing" className="mx-auto max-w-4xl px-6 py-24">
        <Reveal>
          <h2 className="text-[26px] font-bold tracking-tight">دليل المقاسات</h2>
          <p className="mt-2 text-[14px] text-neutral-500 dark:text-neutral-400">
            نقيس الطول من أعلى الكتف إلى نهاية العباية. إن كنت بين مقاسين، ننصح باختيار المقاس الأكبر.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <table className="w-full min-w-[420px] text-right text-[13px]">
              <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
                <tr>
                  <th className="p-3 font-medium">المقاس</th>
                  <th className="p-3 font-medium">الطول (سم)</th>
                  <th className="p-3 font-medium">يناسب الطول</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {[
                  ["50", "135", "150 - 155 سم"],
                  ["52", "140", "155 - 160 سم"],
                  ["54", "145", "160 - 165 سم"],
                  ["56", "150", "165 - 170 سم"],
                  ["58", "155", "170 - 175 سم"],
                  ["60", "160", "175+ سم"],
                ].map((row) => (
                  <tr key={row[0]}>
                    <td className="p-3 font-medium">{row[0]}</td>
                    <td className="p-3">{row[1]}</td>
                    <td className="p-3">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      <section id="shipping" className="border-t border-neutral-200 dark:border-neutral-900">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <Reveal>
            <h2 className="text-[26px] font-bold tracking-tight">التوصيل والإرجاع</h2>
            <ul className="mt-6 flex flex-col gap-4 text-[14px] leading-7 text-neutral-600 dark:text-neutral-300">
              <li>• التوصيل اختياري برسوم ثابتة 2 ر.ع.، أو الاستلام المباشر بدون توصيل مجانًا.</li>
              <li>• مدة التوصيل من 2 إلى 5 أيام عمل حسب المدينة.</li>
              <li>• إمكانية الإرجاع أو الاستبدال خلال 14 يومًا من الاستلام.</li>
              <li>• القطعة يجب أن تكون بحالتها الأصلية مع البطاقة والتغليف.</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="border-t border-neutral-200 bg-neutral-50 py-24 text-center dark:border-neutral-900 dark:bg-neutral-950">
        <Reveal className="mx-auto max-w-md px-6">
          <h2 className="text-[26px] font-bold tracking-tight">تواصلي معنا</h2>
          <p className="mt-2 text-[14px] text-neutral-500 dark:text-neutral-400">
            لأي استفسار حول الطلبات أو المقاسات، فريقنا جاهز لمساعدتك.
          </p>
          <div className="mt-6 flex flex-col gap-2 text-[14px] text-neutral-700 dark:text-neutral-200">
            <span>support@sitr-store.com</span>
            <span>+968 9X XXX XXX</span>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
