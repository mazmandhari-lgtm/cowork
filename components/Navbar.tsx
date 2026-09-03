"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";

const links = [
  { href: "/shop", label: "المتجر" },
  { href: "/shop?category=يومية", label: "يومية" },
  { href: "/shop?category=مناسبات", label: "مناسبات" },
  { href: "/about", label: "قصتنا" },
];

export function Navbar() {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-neutral-200/70 dark:bg-black/70 dark:border-neutral-800/70"
          : "bg-white/0 border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="text-[19px] font-semibold tracking-tight">
          سِتر
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-[13px] font-medium text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900"
            aria-label="سلة التسوق"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 6h15l-1.5 9h-12L6 3H3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9.5" cy="20" r="1.3" fill="currentColor" stroke="none" />
              <circle cx="17.5" cy="20" r="1.3" fill="currentColor" stroke="none" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-1 -left-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-neutral-950 px-1 text-[10px] font-semibold text-white dark:bg-white dark:text-black">
                {count}
              </span>
            )}
          </Link>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="القائمة"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-neutral-200 bg-white px-5 py-4 md:hidden dark:bg-black dark:border-neutral-800">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-[15px] font-medium text-neutral-700 dark:text-neutral-200"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
