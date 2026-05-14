"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/about", label: "Мастерская" },
];

export function Header() {
  const { totalQty, hydrated } = useCart();
  const pathname = usePathname();

  return (
    <>
      <div className="bg-ink text-paper-light">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs">
          <span className="opacity-80">
            Печатаем в Москве · отправляем по России 2–4 дня
          </span>
          <span className="hidden opacity-80 md:inline">
            Бесплатный самовывоз · м. Тульская
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-ink/5 bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-2xl bg-ink text-paper-light">
              <span className="display text-lg leading-none">v□</span>
            </span>
            <div className="leading-none">
              <div className="display text-xl font-semibold tracking-tightest">
                VSQR
              </div>
              <div className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                мастерская
              </div>
            </div>
          </Link>

          <nav className="hidden gap-1 md:flex">
            {nav.map((n) => {
              const active =
                n.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    active
                      ? "bg-ink text-paper-light"
                      : "text-ink-soft hover:bg-ink/5 hover:text-ink"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/cart"
            className="group relative inline-flex items-center gap-2 rounded-full bg-paper-light px-4 py-2.5 text-sm font-medium text-ink ring-1 ring-ink/10 transition hover:ring-ink/30"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span>Корзина</span>
            {hydrated && totalQty > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-clay-600 px-1.5 text-[11px] font-semibold text-paper-light">
                {totalQty}
              </span>
            )}
          </Link>
          </div>
        </div>
      </header>
    </>
  );
}
