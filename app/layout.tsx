import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "سِتر | عبايات فاخرة بلمسة عصرية",
  description:
    "متجر سِتر لبيع العبايات الفاخرة — تصاميم أنيقة بجودة استثنائية، للحياة اليومية والمناسبات والسفر.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} antialiased`}>
      <body className="flex min-h-screen flex-col bg-white text-neutral-900 dark:bg-black dark:text-white">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
