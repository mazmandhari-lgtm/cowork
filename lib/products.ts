const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
function productImage(filename: string) {
  return `${BASE_PATH}/products/${filename}`;
}

export type Product = {
  slug: string;
  name: string;
  category: "يومية" | "مناسبات" | "سفر";
  price: number;
  image: string;
  color: string;
  tagline: string;
  description: string;
  details: string[];
  fabric: string;
  sizes: string[];
  isNew?: boolean;
  isBestseller?: boolean;
};

export const products: Product[] = [
  {
    slug: "blush-palm",
    name: "Blush Palm",
    category: "مناسبات",
    price: 41.5,
    image: productImage("blush-palm.jpg"),
    color: "#efe9df",
    tagline: "نخيل مطرّز بخيوط وردية على قماش عاجي ناعم.",
    description:
      "عباية بيضاء عاجية مطرّزة يدويًا بنقشة سعف النخيل بخيوط وردية دقيقة، بتنورة مطوية (بليسيه) تمنحها حركة وثقلاً أنيقًا عند كل خطوة.",
    details: [
      "تطريز يدوي بخيط وردي على القماش بالكامل",
      "تنورة سفلية مطوية (بليسيه) بالكامل",
      "سحّاب خلفي مخفي",
      "أكمام طويلة واسعة",
    ],
    fabric: "قطن كريب فاخر",
    sizes: ["52", "54", "56", "58"],
    isNew: true,
  },
  {
    slug: "sky-rain",
    name: "Sky Rain",
    category: "يومية",
    price: 31,
    image: productImage("sky-rain.jpg"),
    color: "#a7bdd1",
    tagline: "طبقة خفيفة بنقشة هندسية زرقاء، تُرتدى فوق أي إطلالة.",
    description:
      "قطعة علوية خفيفة بطبعة هندسية زرقاء مستوحاة من زخارف المشربية، مثالية كطبقة تُضاف فوق العباية اليومية أو كرداء منفرد في المشاوير السريعة.",
    details: [
      "قماش خفيف الوزن يتنفس بالكامل",
      "طبعة هندسية مطبوعة بتقنية الصبغ الرقمي",
      "قصّة مفتوحة بلا أزرار",
      "مقاس واحد يناسب الجميع",
    ],
    fabric: "قطن مغسول ناعم",
    sizes: ["Free Size"],
  },
  {
    slug: "navy-lily",
    name: "Navy Lily",
    category: "مناسبات",
    price: 33,
    image: productImage("navy-lily.jpg"),
    color: "#1f2a3d",
    tagline: "معطف كحلي بطبعة زنبق أبيض تمتد على كامل الذيل.",
    description:
      "معطف عباية كحلي بقصّة ياقة كلاسيكية، تزيّن أطرافه السفلية طبعة فنية لزهور الزنبق، يُرتدى فوق فستان داخلي لإطلالة مركّبة وأنيقة في المناسبات المسائية.",
    details: [
      "طبعة زهور فنية على كامل الذيل السفلي",
      "ياقة كلاسيكية مفتوحة من الأمام",
      "أكمام واسعة بقصّة مستقيمة",
      "يُرتدى كطبقة علوية فوق فستان داخلي",
    ],
    fabric: "كريب صوفي فاخر",
    sizes: ["52", "54", "56", "58", "60"],
    isBestseller: true,
  },
  {
    slug: "emerald-ruby",
    name: "Emerald & Ruby",
    category: "مناسبات",
    price: 33,
    image: productImage("emerald-ruby.jpg"),
    color: "#2f4a3e",
    tagline: "قطعة بلونين متباينين، سويدي فاخر بغرزة يدوية بارزة.",
    description:
      "عباية من قماش السويدي الفاخر بتصميم ثنائي اللون بين الزمردي والعنابي، تُبرز خياطتها اليدوية البارزة على الحواف حرفية الصنع في كل تفصيلة.",
    details: [
      "قماش سويدي فاخر بلونين متباينين",
      "خياطة حواف يدوية بارزة بخيط أبيض",
      "قصّة مفتوحة من الأمام دون أزرار",
      "تصميم محدود الكمية",
    ],
    fabric: "سويدي (شمواه) صناعي فاخر",
    sizes: ["52", "54", "56", "58"],
  },
  {
    slug: "red-hibiscus",
    name: "Red Hibiscus",
    category: "مناسبات",
    price: 37,
    image: productImage("red-hibiscus.jpg"),
    color: "#5c1620",
    tagline: "زهرة الكركديه على حرير أسود، بأكمام عنابية وشراشيب.",
    description:
      "عباية بلوحة زهرة كركديه فنية على لوح أسود حريري، بأكمام وأطراف عنابية داكنة تنتهي بشراشيب حريرية، لإطلالة مسائية درامية ومميزة.",
    details: [
      "طبعة فنية لزهرة الكركديه على قماش حريري",
      "أكمام وأطراف بلون عنابي داكن متباين",
      "شراشيب حريرية عند الذيل",
      "تصميم محدود الكمية",
    ],
    fabric: "حرير صناعي فاخر",
    sizes: ["52", "54", "56", "58"],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(value: number) {
  const formatted = value.toLocaleString("ar-OM", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 3,
  });
  return `${formatted} ر.ع.`;
}
