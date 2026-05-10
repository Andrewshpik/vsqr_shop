"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice, products } from "@/lib/products";

const SHIPPING = 350;

type Delivery = "pickup" | "cdek" | "post";
type Payment = "card" | "sbp" | "cash";

export default function CheckoutPage() {
  const { items, subtotal, clear, hydrated } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    delivery: "cdek" as Delivery,
    payment: "sbp" as Payment,
    comment: "",
    customFile: false,
  });
  const [submitted, setSubmitted] = useState<null | string>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function update<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Укажите имя";
    if (!form.phone.trim()) next.phone = "Укажите телефон";
    if (form.delivery !== "pickup" && !form.city.trim())
      next.city = "Город нужен для доставки";
    if (form.delivery !== "pickup" && !form.address.trim())
      next.address = "Укажите адрес или ПВЗ";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const orderId = `VSQR-${Date.now().toString(36).toUpperCase()}`;
    setSubmitted(orderId);
    clear();
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="display text-7xl text-clay-600">✦</div>
        <h1 className="display mt-6 text-5xl">Заявка принята</h1>
        <p className="mt-3 text-ink-soft">
          Номер заказа{" "}
          <span className="rounded-md bg-ink/5 px-2 py-1 font-mono">
            {submitted}
          </span>
          . Свяжемся в течение часа в рабочее время — уточним детали и
          реквизиты для оплаты.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn-outline">
            На главную
          </Link>
          <Link href="/catalog" className="btn-primary">
            К каталогу →
          </Link>
        </div>
      </div>
    );
  }

  const total = subtotal + (form.delivery === "pickup" ? 0 : SHIPPING);

  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="mt-10">
        <div className="eyebrow text-clay-700">Оформление</div>
        <h1 className="display mt-3 text-5xl md:text-6xl">
          Расскажите, куда везти
        </h1>
        <p className="mt-3 text-ink-soft">
          Это заявка — оплату подтвердим после согласования.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]"
      >
        <div className="space-y-6">
          <section className="card">
            <h2 className="display text-2xl">Контакты</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label">Имя *</label>
                <input
                  className="input"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Как к вам обращаться"
                />
                {errors.name && (
                  <div className="mt-1 text-xs text-clay-700">
                    {errors.name}
                  </div>
                )}
              </div>
              <div>
                <label className="label">Телефон *</label>
                <input
                  className="input"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+7"
                  inputMode="tel"
                />
                {errors.phone && (
                  <div className="mt-1 text-xs text-clay-700">
                    {errors.phone}
                  </div>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="label">Email</label>
                <input
                  className="input"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="для трек-номера"
                />
              </div>
            </div>
          </section>

          <section className="card">
            <h2 className="display text-2xl">Доставка</h2>
            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              {(
                [
                  ["pickup", "Самовывоз", "м. Тульская · бесплатно"],
                  ["cdek", "СДЭК / Boxberry", `${formatPrice(SHIPPING)} · 2–4 дня`],
                  ["post", "Почта России", `${formatPrice(SHIPPING)} · 4–10 дней`],
                ] as const
              ).map(([value, title, hint]) => (
                <label
                  key={value}
                  className={`cursor-pointer rounded-2xl border p-4 transition ${
                    form.delivery === value
                      ? "border-ink bg-ink/5"
                      : "border-ink/10 bg-paper-light hover:border-ink/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    className="sr-only"
                    checked={form.delivery === value}
                    onChange={() => update("delivery", value)}
                  />
                  <div className="text-sm font-semibold">{title}</div>
                  <div className="mt-1 text-xs text-ink-muted">{hint}</div>
                </label>
              ))}
            </div>

            {form.delivery !== "pickup" && (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label">Город *</label>
                  <input
                    className="input"
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                  />
                  {errors.city && (
                    <div className="mt-1 text-xs text-clay-700">
                      {errors.city}
                    </div>
                  )}
                </div>
                <div>
                  <label className="label">Адрес или ПВЗ *</label>
                  <input
                    className="input"
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                    placeholder="Улица, дом / номер ПВЗ"
                  />
                  {errors.address && (
                    <div className="mt-1 text-xs text-clay-700">
                      {errors.address}
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>

          <section className="card">
            <h2 className="display text-2xl">Способ оплаты</h2>
            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              {(
                [
                  ["sbp", "СБП", "QR-код или ссылка"],
                  ["card", "Карта", "Перевод на карту"],
                  ["cash", "Наличными", "Только при самовывозе"],
                ] as const
              ).map(([value, title, hint]) => (
                <label
                  key={value}
                  className={`cursor-pointer rounded-2xl border p-4 transition ${
                    form.payment === value
                      ? "border-ink bg-ink/5"
                      : "border-ink/10 bg-paper-light hover:border-ink/30"
                  } ${
                    value === "cash" && form.delivery !== "pickup"
                      ? "pointer-events-none opacity-40"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="sr-only"
                    checked={form.payment === value}
                    onChange={() => update("payment", value)}
                  />
                  <div className="text-sm font-semibold">{title}</div>
                  <div className="mt-1 text-xs text-ink-muted">{hint}</div>
                </label>
              ))}
            </div>
          </section>

          <section className="card">
            <h2 className="display text-2xl">Дополнительно</h2>
            <div className="mt-5">
              <label className="label">Комментарий к заказу</label>
              <textarea
                className="input min-h-[110px]"
                value={form.comment}
                onChange={(e) => update("comment", e.target.value)}
                placeholder="Цвета, сроки, индивидуальные пожелания…"
              />
            </div>
            <label className="mt-4 flex items-start gap-3 text-sm text-ink-soft">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-ink/20 accent-clay-600"
                checked={form.customFile}
                onChange={(e) => update("customFile", e.target.checked)}
              />
              <span>
                У меня есть свой файл (STL / STEP / OBJ) — пришлю после
                оформления в Telegram или на email.
              </span>
            </label>
          </section>
        </div>

        <aside className="h-fit rounded-3xl bg-ink p-6 text-paper-light">
          <h2 className="display text-2xl">Ваш заказ</h2>
          {!hydrated ? (
            <div className="mt-4 text-sm text-paper-light/60">Загружаем…</div>
          ) : items.length === 0 ? (
            <div className="mt-4 text-sm text-paper-light/60">
              Корзина пуста. Можно оставить заявку «на печать по файлу» — опишите
              задачу в комментарии.
            </div>
          ) : (
            <ul className="mt-4 space-y-3 text-sm">
              {items.map((i) => {
                const p = products.find((x) => x.id === i.productId);
                if (!p) return null;
                return (
                  <li
                    key={`${i.productId}-${i.color}`}
                    className="flex justify-between gap-3"
                  >
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-paper-light/60">
                        {i.color} · {i.qty} шт
                      </div>
                    </div>
                    <div>{formatPrice(p.price * i.qty)}</div>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="my-5 h-px bg-white/10" />
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-paper-light/60">Товары</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-paper-light/60">Доставка</dt>
              <dd>
                {form.delivery === "pickup" ? "Бесплатно" : formatPrice(SHIPPING)}
              </dd>
            </div>
            <div className="my-4 h-px bg-white/10" />
            <div className="flex items-baseline justify-between">
              <dt className="text-base font-medium">К оплате</dt>
              <dd className="display text-3xl">{formatPrice(total)}</dd>
            </div>
          </dl>

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-paper-light py-3.5 text-sm font-medium text-ink hover:bg-paper"
          >
            Отправить заявку →
          </button>
          <p className="mt-3 text-xs text-paper-light/60">
            Нажимая, вы соглашаетесь на обработку данных для связи по заказу.
          </p>
        </aside>
      </form>
    </div>
  );
}
