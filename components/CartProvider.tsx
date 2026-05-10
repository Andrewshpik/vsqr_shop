"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem } from "@/lib/types";
import { products } from "@/lib/products";

const STORAGE_KEY = "vsqr-cart-v1";

type CartContextValue = {
  items: CartItem[];
  totalQty: number;
  subtotal: number;
  add: (productId: string, color: string, qty?: number) => void;
  remove: (productId: string, color: string) => void;
  setQty: (productId: string, color: string, qty: number) => void;
  clear: () => void;
  hydrated: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add = useCallback(
    (productId: string, color: string, qty = 1) => {
      setItems((prev) => {
        const idx = prev.findIndex(
          (i) => i.productId === productId && i.color === color,
        );
        if (idx === -1) return [...prev, { productId, color, qty }];
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      });
    },
    [],
  );

  const remove = useCallback((productId: string, color: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.color === color)),
    );
  }, []);

  const setQty = useCallback(
    (productId: string, color: string, qty: number) => {
      setItems((prev) => {
        if (qty <= 0) {
          return prev.filter(
            (i) => !(i.productId === productId && i.color === color),
          );
        }
        return prev.map((i) =>
          i.productId === productId && i.color === color ? { ...i, qty } : i,
        );
      });
    },
    [],
  );

  const clear = useCallback(() => setItems([]), []);

  const { totalQty, subtotal } = useMemo(() => {
    let q = 0;
    let s = 0;
    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) continue;
      q += item.qty;
      s += product.price * item.qty;
    }
    return { totalQty: q, subtotal: s };
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({ items, totalQty, subtotal, add, remove, setQty, clear, hydrated }),
    [items, totalQty, subtotal, add, remove, setQty, clear, hydrated],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
