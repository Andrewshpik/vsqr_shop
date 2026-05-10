import Link from "next/link";
import type { Product } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";
import { formatPrice } from "@/lib/products";
import { ProductTile } from "./ProductTile";

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

function dotColor(c: string): string {
  return COLOR_DOTS[c] || "#cccccc";
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block overflow-hidden rounded-[2rem] bg-paper-light ring-1 ring-ink/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="relative p-3">
        <ProductTile product={product} />
        <div className="absolute left-5 top-5 flex gap-2">
          {product.isNew && (
            <span className="chip-dark bg-clay-600/95">Новинка</span>
          )}
          {product.isBestseller && (
            <span className="chip-dark bg-ink/85">★ Хит</span>
          )}
          {product.oldPrice && (
            <span className="chip-dark bg-clay-700/95">
              −
              {Math.round(
                (1 - product.price / product.oldPrice) * 100,
              )}
              %
            </span>
          )}
        </div>
      </div>
      <div className="flex items-start justify-between gap-4 px-5 pb-6 pt-3">
        <div className="min-w-0">
          <div className="eyebrow text-ink-muted">
            {CATEGORY_LABELS[product.category]}
            <span className="mx-1.5 opacity-50">/</span>
            {product.material}
          </div>
          <h3 className="display mt-1.5 truncate text-xl text-ink">
            {product.name}
          </h3>
          <div className="mt-3 flex items-center gap-1.5">
            {product.colors.slice(0, 4).map((c) => (
              <span
                key={c}
                title={c}
                className="h-3 w-3 rounded-full ring-1 ring-ink/15"
                style={{ background: dotColor(c) }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[11px] text-ink-muted">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        </div>
        <div className="flex-shrink-0 text-right">
          <div className="display text-2xl text-ink">
            {formatPrice(product.price)}
          </div>
          {product.oldPrice && (
            <div className="text-xs text-ink-muted line-through">
              {formatPrice(product.oldPrice)}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
