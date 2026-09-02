"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "./products";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product, size: string, qty: number) => void;
  removeItem: (slug: string, size: string) => void;
  updateQty: (slug: string, size: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "abaya-store-cart";

function sameLine(a: CartItem, slug: string, size: string) {
  return a.slug === slug && a.size === size;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Reads localStorage (unavailable during SSR) once after mount, so the
    // server-rendered empty cart and the first client render stay in sync.
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((product: Product, size: string, qty: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => sameLine(i, product.slug, size));
      if (existing) {
        return prev.map((i) =>
          sameLine(i, product.slug, size) ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...prev,
        {
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          qty,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((slug: string, size: string) => {
    setItems((prev) => prev.filter((i) => !sameLine(i, slug, size)));
  }, []);

  const updateQty = useCallback((slug: string, size: string, qty: number) => {
    setItems((prev) =>
      prev.map((i) => (sameLine(i, slug, size) ? { ...i, qty: Math.max(1, qty) } : i))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.qty * i.price, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQty, clear, count, subtotal, isOpen, setIsOpen }),
    [items, addItem, removeItem, updateQty, clear, count, subtotal, isOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
