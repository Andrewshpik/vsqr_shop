"use client";

import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORY_LABELS, type Category } from "@/lib/types";

type Filter = "all" | Category;
type Sort = "popular" | "price-asc" | "price-desc" | "new";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "Всё" },
  { key: "decor", label: CATEGORY_LABELS.decor },
  { key: "toys", label: CATEGORY_LABELS.toys },
  { key: "tech", label: CATEGORY_LABELS.tech },
  { key: "kitchen", label: CATEGORY_LABELS.kitchen },
  { key: "office", label: CATEGORY_LABELS.office },
  { key: "custom", label: CATEGORY_LABELS.custom },
];

export default function CatalogPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("popular");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    let arr = products.filter((p) =>
      filter === "all" ? true : p.category === filter,
    );
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      arr = arr.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }
    switch (sort) {
      case "price-asc":
        arr = [...arr].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        arr = [...arr].sort((a, b) => b.price - a.price);
        break;
      case "new":
        arr = [...arr].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
        break;
      case "popular":
      default:
        arr = [...arr].sort(
          (a, b) =>
            Number(!!b.isBestseller) - Number(!!a.isBestseller) ||
            Number(!!b.isNew) - Number(!!a.isNew),
        );
    }
    return arr;
  }, [filter, sort, query]);

  const activeFilters =
    [filter !== "all" ? CATEGORY_LABELS[filter as Category] : null, query.trim() || null].filter(
      Boolean,
    ).length;

  return (
    <div className="mx-auto max-w-7xl px-4">
      <section className="mt-10 grid items-end gap-6 md:grid-cols-12">
        <div className="md:col-span-8">
          <div className="eyebrow text-clay-700">Каталог</div>
          <h1 className="display mt-3 text-5xl md:text-7xl">
            Готовые
            <br />
            <span className="italic text-clay-600">изделия</span>
          </h1>
        </div>
        <div className="md:col-span-4 md:text-right">
          <p className="text-ink-soft">
            {products.length} наименований ·
            <br className="hidden md:inline" /> печать под выбранный цвет
          </p>
        </div>
      </section>

      <div className="sticky top-[68px] z-20 -mx-4 mt-10 border-y border-ink/5 bg-paper/85 px-4 py-4 backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full px-4 py-1.5 text-sm transition ${
                  filter === f.key
                    ? "bg-ink text-paper-light"
                    : "bg-paper-light text-ink-soft ring-1 ring-ink/10 hover:ring-ink/30"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск"
                className="input max-w-[200px] pl-9"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="input max-w-[200px] cursor-pointer pr-8"
            >
              <option value="popular">Сначала популярные</option>
              <option value="new">Сначала новинки</option>
              <option value="price-asc">Цена ↑</option>
              <option value="price-desc">Цена ↓</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-4 flex items-center justify-between text-sm text-ink-muted">
        <span>
          {list.length} {list.length === 1 ? "товар" : "товаров"}
          {activeFilters > 0 && (
            <button
              onClick={() => {
                setFilter("all");
                setQuery("");
              }}
              className="ml-3 text-ink underline-offset-4 hover:underline"
            >
              сбросить фильтры
            </button>
          )}
        </span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {list.length === 0 && (
        <div className="card mt-8 text-center text-ink-muted">
          По вашему запросу ничего не нашлось.
        </div>
      )}
    </div>
  );
}
