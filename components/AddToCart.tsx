"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import { useCart } from "./CartProvider";

const COLOR_DOTS: Record<string, string> = {
  "Слоновая кость": "#efe6d3",
  Бронза: "#a16f3c",
  Графит: "#3a3a3a",
  Белый: "#ffffff",
  Чёрный: "#111111",
  Песочный: "#e0c499",
  Серый: "#9aa0a6",
  Рыжий: "#c75a2a",
  Терракота: "#b8451f",
  Олива: "#637b58",
  Изумруд: "#0f3d2e",
  Красный: "#b91c1c",
  Золотой: "#c89a3f",
  Мятный: "#a7e8c7",
  "Чёрный матовый": "#1a1a1a",
};

export function AddToCart({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { add } = useCart();
  const router = useRouter();

  function handleAdd(goToCart = false) {
    add(product.id, color, qty);
    setAdded(true);
    if (goToCart) {
      router.push("/cart");
    } else {
      setTimeout(() => setAdded(false), 1500);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="label">
          Цвет · <span className="text-ink-soft normal-case tracking-normal">{color}</span>
        </span>
        <div className="flex flex-wrap gap-2.5">
          {product.colors.map((c) => {
            const isActive = color === c;
            return (
              <button
                key={c}
                onClick={() => setColor(c)}
                title={c}
                className={`group flex items-center gap-2.5 rounded-full px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-ink text-paper-light"
                    : "bg-paper-light text-ink-soft ring-1 ring-ink/10 hover:ring-ink/40"
                }`}
              >
                <span
                  className="h-4 w-4 rounded-full ring-1 ring-ink/15"
                  style={{ background: COLOR_DOTS[c] || "#cccccc" }}
                />
                <span>{c}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <span className="label">Количество</span>
        <div className="inline-flex items-center rounded-full bg-paper-light ring-1 ring-ink/10">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid h-11 w-11 place-items-center text-lg text-ink-soft transition hover:text-ink"
            aria-label="Уменьшить"
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-medium">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            className="grid h-11 w-11 place-items-center text-lg text-ink-soft transition hover:text-ink"
            aria-label="Увеличить"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          onClick={() => handleAdd(false)}
          disabled={!product.inStock}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {added ? "✓ Добавлено" : "Добавить в корзину"}
        </button>
        <button
          onClick={() => handleAdd(true)}
          disabled={!product.inStock}
          className="btn-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          Купить сейчас →
        </button>
      </div>
    </div>
  );
}
