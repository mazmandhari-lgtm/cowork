"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

const links = [
  { href: "/shop", label: "المتجر" },
  { href: "/about", label: "قصتنا" },
];

export function Navbar() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="topbar">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="wordmark">
          Uniflora Closet
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className="navlink">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link href="/cart" className="cart-btn" aria-label="سلة التسوق">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 6h15l-1.5 9h-12L6 3H3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9.5" cy="20" r="1.3" fill="currentColor" stroke="none" />
              <circle cx="17.5" cy="20" r="1.3" fill="currentColor" stroke="none" />
            </svg>
            {count > 0 && <span className="cart-badge">{count}</span>}
          </Link>
          <button
            className="cart-btn menu-btn"
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
        <div className="border-t hairline px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link key={l.label} href={l.href} onClick={() => setMenuOpen(false)} className="navlink text-[15px]">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
