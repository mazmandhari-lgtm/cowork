import { ShopClient } from "@/components/ShopClient";
import { getProducts } from "@/lib/products";

export default async function ShopPage() {
  const products = await getProducts();
  return <ShopClient products={products} />;
}
