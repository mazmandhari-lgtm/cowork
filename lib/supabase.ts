import { createClient } from "@supabase/supabase-js";

type ProductRow = {
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
  sort_order: number;
};

type OrderRow = {
  id: string;
  customer_name: string;
  customer_phone: string;
  delivery: boolean;
  city: string | null;
  neighborhood: string | null;
  address: string | null;
  custom_measurements: {
    length: string;
    shoulder: string;
    chest: string;
    waist: string;
    sleeve: string;
    notes: string;
  } | null;
  items: { slug: string; name: string; size: string; qty: number; price: number }[];
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
  created_at: string;
};

type Database = {
  public: {
    Tables: {
      products: {
        Row: ProductRow;
        Insert: Partial<ProductRow>;
        Update: Partial<ProductRow>;
        Relationships: [];
      };
      orders: {
        Row: OrderRow;
        Insert: Omit<OrderRow, "id" | "status" | "created_at">;
        Update: Partial<OrderRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};

let client: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseClient() {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY env vars."
    );
  }

  client = createClient<Database>(url, anonKey);
  return client;
}
