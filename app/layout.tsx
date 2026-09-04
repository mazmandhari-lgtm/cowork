import type { Metadata } from "next";
import { Tajawal, Amiri, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Uniflora Closet | عبايات فاخرة بلمسة عصرية",
  description:
    "Uniflora Closet — عبايات فاخرة مصمَّمة بعناية، للحياة اليومية والمناسبات. الطلب والدفع عبر واتساب.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${amiri.variable} ${cormorant.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <div className="ambient" aria-hidden="true" />
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
