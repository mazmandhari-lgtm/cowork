import { getSupabaseClient } from "./supabase";

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  tagline: string;
  description: string;
  details: string[];
  fabric: string;
  sizes: string[];
  isNew?: boolean;
  isBestseller?: boolean;
};

function mapRow(row: {
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  tagline: string;
  description: string;
  details: string[];
  fabric: string;
  sizes: string[];
  is_new: boolean;
  is_bestseller: boolean;
}): Product {
  return {
    slug: row.slug,
    name: row.name,
    category: row.category,
    price: row.price,
    image: row.image,
    tagline: row.tagline,
    description: row.description,
    details: row.details,
    fabric: row.fabric,
    sizes: row.sizes,
    isNew: row.is_new,
    isBestseller: row.is_bestseller,
  };
}

export async function getProducts(): Promise<Product[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data.map(mapRow);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data ? mapRow(data) : undefined;
}

export function formatPrice(value: number) {
  const formatted = value.toLocaleString("ar-OM", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 3,
  });
  return `${formatted} ر.ع.`;
}
