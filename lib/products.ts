export type ColorOption = {
  name: string;
  hex: string;
  shade: string;
};

export type Product = {
  slug: string;
  name: string;
  category: "يومية" | "مناسبات" | "إحرام وصلاة" | "سفر";
  price: number;
  compareAtPrice?: number;
  tagline: string;
  description: string;
  details: string[];
  fabric: string;
  colors: ColorOption[];
  sizes: string[];
  isNew?: boolean;
  isBestseller?: boolean;
};

export const products: Product[] = [
  {
    slug: "layan-al-aswad",
    name: "عباية ليان",
    category: "يومية",
    price: 420,
    compareAtPrice: 520,
    tagline: "البساطة في أرقى صورها.",
    description:
      "قصّة انسيابية بخطوط نظيفة وتفاصيل دقيقة، مصمّمة لتمنحك إطلالة أنيقة في كل لحظة من يومك. تعتمد على قماش خفيف الوزن يتحرك معك بسلاسة.",
    details: [
      "تصميم بقصّة A-Line انسيابية",
      "أكمام واسعة بحواف مخيطة يدويًا",
      "جيوب جانبية مخفية",
      "قماش لا يحتاج إلى كي متكرر",
    ],
    fabric: "كريب ياباني فاخر 100%",
    colors: [
      { name: "أسود عميق", hex: "#111113", shade: "#000000" },
      { name: "كحلي ليلي", hex: "#1c2333", shade: "#0c101c" },
      { name: "بيج رملي", hex: "#cdbfa5", shade: "#a8977a" },
    ],
    sizes: ["52", "54", "56", "58", "60"],
    isBestseller: true,
  },
  {
    slug: "sama-almunasabat",
    name: "عباية سما",
    category: "مناسبات",
    price: 780,
    tagline: "لحظات استثنائية تستحق قصّة استثنائية.",
    description:
      "مطرّزة يدويًا بخيوط ذهبية دقيقة على قماش كريستال فاخر، صُممت لتكون نجمة المناسبات الخاصة دون أن تفرّط في الطابع المحتشم الراقي.",
    details: [
      "تطريز يدوي بخيوط معدنية",
      "بطانة داخلية كاملة ناعمة الملمس",
      "حزام خصر قابل للفصل",
      "تصميم محدود الكمية",
    ],
    fabric: "كريستال فاخر مبطّن",
    colors: [
      { name: "أسود مطرّز", hex: "#15120f", shade: "#000000" },
      { name: "ذهبي عاجي", hex: "#e9dfc7", shade: "#c9b98a" },
    ],
    sizes: ["52", "54", "56", "58"],
    isNew: true,
  },
  {
    slug: "nasma-alsafar",
    name: "عباية نسمة",
    category: "سفر",
    price: 390,
    tagline: "خفيفة كالهواء، أنيقة أينما كنت.",
    description:
      "صُممت خصيصًا لأيام السفر الطويلة، بقماش لا يتجعّد وتصميم عملي لا يفقد أناقته من المطار حتى الوجهة.",
    details: [
      "قماش مضاد للتجعّد بالكامل",
      "قصّة عملية خفيفة الوزن",
      "جيب داخلي بسحّاب للأساسيات",
      "قابلة للطي دون أن تتجعّد",
    ],
    fabric: "نانو كريب تقني",
    colors: [
      { name: "رمادي غيمي", hex: "#8b8d91", shade: "#5f6165" },
      { name: "أسود سفر", hex: "#131315", shade: "#000000" },
      { name: "زيتوني هادئ", hex: "#6b7052", shade: "#454935" },
    ],
    sizes: ["50", "52", "54", "56", "58", "60"],
  },
  {
    slug: "rawda-alsalah",
    name: "عباية روضة",
    category: "إحرام وصلاة",
    price: 340,
    tagline: "سكينة الحركة، وسعة الحضور.",
    description:
      "قصّة فضفاضة ومريحة مثالية لأوقات الصلاة والعبادة، بقماش ناعم يلامس البشرة برفق ولا يقيّد الحركة.",
    details: [
      "قصّة فضفاضة بالكامل بلا حزام",
      "غطاء رأس متصل اختياري",
      "قماش ناعم مضاد للحساسية",
      "تهوية ممتازة للاستخدام اليومي",
    ],
    fabric: "قطن ممزوج ناعم",
    colors: [
      { name: "أبيض نقي", hex: "#f7f5f0", shade: "#d8d3c4" },
      { name: "رمادي فاتح", hex: "#c9cad0", shade: "#a3a5ad" },
    ],
    sizes: ["Free Size"],
  },
  {
    slug: "zahra-almasa",
    name: "عباية زهرة",
    category: "مناسبات",
    price: 650,
    tagline: "تفاصيل تُروى، وأناقة تُذكر.",
    description:
      "لمسات من الدانتيل الفرنسي على أطراف الأكمام والياقة، تمنح إطلالتك عمقًا وفخامة دون مبالغة.",
    details: [
      "دانتيل فرنسي أصلي على الأطراف",
      "تصميم بأزرار مخفية أمامية",
      "قصّة مفصّلة عند الخصر",
      "ألوان محايدة تناسب كل بشرة",
    ],
    fabric: "كريب مطاطي فاخر",
    colors: [
      { name: "أسود دانتيل", hex: "#141414", shade: "#000000" },
      { name: "بني توباز", hex: "#5a4632", shade: "#382b1e" },
    ],
    sizes: ["52", "54", "56", "58"],
    isNew: true,
  },
  {
    slug: "hala_yaomiya",
    name: "عباية هالة",
    category: "يومية",
    price: 360,
    tagline: "رفيقتك في كل التفاصيل اليومية.",
    description:
      "تصميم عصري بسيط بخط أكتاف مربّع أنيق، مثالي للعمل والتسوق والمشاوير اليومية بثقة وراحة تامة.",
    details: [
      "خط أكتاف مربّع عصري",
      "قماش يتنفّس طوال اليوم",
      "قصّة مستقيمة تناسب جميع الأجسام",
      "متوفرة بمقاسات موسّعة",
    ],
    fabric: "كريب سوفت متين",
    colors: [
      { name: "أسود كلاسيك", hex: "#121212", shade: "#000000" },
      { name: "كحلي داكن", hex: "#202a3d", shade: "#0f1420" },
      { name: "بني قرميدي", hex: "#7a4a35", shade: "#4f2e20" },
    ],
    sizes: ["50", "52", "54", "56", "58", "60"],
    isBestseller: true,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(value: number) {
  return `${value.toLocaleString("ar-SA")} ر.س`;
}
