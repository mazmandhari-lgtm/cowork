import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { getProducts } from "@/lib/products";

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

const sizeRows = [
  ["50", "135", "150–155 سم"],
  ["52", "140", "155–160 سم"],
  ["54", "145", "160–165 سم"],
  ["56", "150", "165–170 سم"],
  ["58", "155", "170–175 سم"],
  ["60", "160", "175+ سم"],
];

export default async function AboutPage() {
  const products = await getProducts();
  const strip = [
    products.find((p) => p.slug === "red-hibiscus")!,
    products.find((p) => p.slug === "blush-palm")!,
    products.find((p) => p.slug === "navy-lily")!,
  ];

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      <section className="py-16 text-center">
        <Reveal>
          <p className="eyebrow">قصتنا</p>
          <h1 className="mx-auto mt-3 max-w-[20ch] text-[40px] font-bold leading-tight">
            صُنعت لتُروى أناقتها، لا فقط لتُرتدى.
          </h1>
          <p className="t-soft mx-auto mt-4 max-w-[56ch] text-[15px] leading-8">
            بدأت رحلة Uniflora Closet من فكرة بسيطة: أن تكون العباية أكثر من قطعة ملابس، بل تعبيرًا
            عن الهوية والذوق. نصمم كل قطعة بعناية فائقة لتجمع بين الاحتشام الأصيل وروح العصر.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <div className="mt-10 flex items-end justify-center gap-4">
            {strip.map((p, i) => (
              <div
                key={p.slug}
                className={`art-frame relative w-28 sm:w-36 ${
                  i === 1 ? "h-72 sm:h-96" : "h-56 opacity-95 sm:h-72"
                }`}
              >
                <Image src={p.image} alt={p.name} fill sizes="160px" className="object-cover object-[75%_18%]" />
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <Reveal>
        <div className="panel-glass grid grid-cols-1 gap-8 px-6 py-12 text-center sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title}>
              <h3 className="text-[17px] font-bold" style={{ fontFamily: "var(--font-tajawal)" }}>
                {v.title}
              </h3>
              <p className="t-soft mt-2 px-3 text-[13.5px] leading-7">{v.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <section id="sizing" className="mx-auto max-w-3xl py-16">
        <Reveal>
          <h2 className="text-[26px] font-bold">دليل المقاسات</h2>
          <p className="t-soft mt-2 text-[13.5px]">
            نقيس الطول من أعلى الكتف إلى نهاية العباية. إن كنتِ بين مقاسين، ننصح باختيار المقاس الأكبر.
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="sizes-table min-w-[420px]">
              <thead>
                <tr>
                  <th>المقاس</th>
                  <th>الطول (سم)</th>
                  <th>يناسب الطول</th>
                </tr>
              </thead>
              <tbody>
                {sizeRows.map((row) => (
                  <tr key={row[0]}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      <section id="shipping" className="mx-auto max-w-3xl pb-16">
        <Reveal>
          <h2 className="text-[26px] font-bold">التوصيل والإرجاع</h2>
          <ul className="t-soft mt-5 flex flex-col gap-3 text-[14px] leading-8">
            <li>• التوصيل اختياري برسوم ثابتة 2 ر.ع.، أو الاستلام المباشر بدون توصيل مجانًا.</li>
            <li>• مدة التوصيل من 2 إلى 5 أيام عمل حسب المدينة.</li>
            <li>• إمكانية الإرجاع أو الاستبدال خلال 14 يومًا من الاستلام.</li>
            <li>• القطعة يجب أن تكون بحالتها الأصلية مع البطاقة والتغليف.</li>
          </ul>
        </Reveal>
      </section>

      <section id="contact" className="mx-auto max-w-md pb-20 text-center">
        <Reveal>
          <h2 className="text-[26px] font-bold">تواصلي معنا</h2>
          <p className="t-soft mt-2 text-[13.5px]">
            لأي استفسار حول الطلبات أو المقاسات، فريقنا جاهز لمساعدتك.
          </p>
          <div className="mt-4 text-[14px]">
            <p>support@unifloracloset.com</p>
            <p className="mt-1">+968 7798 9255</p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
