"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice, products } from "@/lib/products";
import { ProductTile } from "@/components/ProductTile";

const SHIPPING = 350;

export default function CartPage() {
  const { items, setQty, remove, subtotal, hydrated, clear } = useCart();

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-ink-muted">
        Загружаем корзину…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="display text-7xl">○</div>
        <h1 className="display mt-6 text-5xl">Корзина пуста</h1>
        <p className="mt-3 text-ink-soft">
          В каталоге есть готовые изделия и формат «печать по файлу».
        </p>
        <Link href="/catalog" className="btn-primary mt-8">
          К каталогу →
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="mt-10 flex items-end justify-between">
        <div>
          <div className="eyebrow text-clay-700">Заказ</div>
          <h1 className="display mt-3 text-5xl md:text-6xl">Корзина</h1>
        </div>
        <button
          onClick={clear}
          className="text-sm text-ink-muted hover:text-clay-700"
        >
          Очистить
        </button>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {items.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            if (!product) return null;
            return (
              <div
                key={`${item.productId}-${item.color}`}
                className="flex flex-col gap-5 rounded-3xl bg-paper-light p-4 ring-1 ring-ink/5 sm:flex-row sm:items-center"
              >
                <div className="w-full max-w-[140px] flex-shrink-0">
                  <ProductTile product={product} size="sm" />
                </div>
                <div className="flex-1">
                  <Link
                    href={`/product/${product.slug}`}
                    className="display text-2xl hover:text-clay-700"
                  >
                    {product.name}
                  </Link>
                  <div className="mt-1 text-sm text-ink-muted">
                    Цвет: <span className="text-ink">{item.color}</span>
                    <span className="divider-dot" />
                    {product.material}
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="inline-flex items-center rounded-full bg-ink/5">
                      <button
                        onClick={() =>
                          setQty(item.productId, item.color, item.qty - 1)
                        }
                        className="grid h-9 w-9 place-items-center text-ink-soft hover:text-ink"
                        aria-label="Уменьшить"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.qty}
                      </span>
                      <button
                        onClick={() =>
                          setQty(item.productId, item.color, item.qty + 1)
                        }
                        className="grid h-9 w-9 place-items-center text-ink-soft hover:text-ink"
                        aria-label="Увеличить"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => remove(item.productId, item.color)}
                      className="text-sm text-ink-muted hover:text-clay-700"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="display text-2xl">
                    {formatPrice(product.price * item.qty)}
                  </div>
                  {item.qty > 1 && (
                    <div className="text-xs text-ink-muted">
                      {formatPrice(product.price)} × {item.qty}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <aside className="h-fit rounded-3xl bg-ink p-6 text-paper-light">
          <h2 className="display text-3xl">Итого</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-paper-light/60">Товары</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-paper-light/60">Доставка</dt>
              <dd>{formatPrice(SHIPPING)}</dd>
            </div>
            <div className="my-4 h-px bg-white/10" />
            <div className="flex items-baseline justify-between">
              <dt className="text-base font-medium">К оплате</dt>
              <dd className="display text-3xl">
                {formatPrice(subtotal + SHIPPING)}
              </dd>
            </div>
          </dl>
          <Link
            href="/checkout"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-paper-light py-3.5 text-sm font-medium text-ink hover:bg-paper"
          >
            Оформить заказ →
          </Link>
          <p className="mt-3 text-xs text-paper-light/60">
            Оплата после согласования: перевод на карту или СБП.
          </p>
        </aside>
      </div>
    </div>
  );
}
