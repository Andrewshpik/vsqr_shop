import Link from "next/link";
import { products, formatPrice } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductTile } from "@/components/ProductTile";
import { WorkGallery } from "@/components/WorkGallery";

export default function HomePage() {
  const featured = products.slice(0, 4);
  const hero = products[0];

  return (
    <div className="mx-auto max-w-7xl px-4">
      {/* HERO */}
      <section className="relative mt-10 md:mt-16">
        <div className="grid items-end gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3">
              <span className="inline-block h-2 w-2 animate-floaty rounded-full bg-clay-500" />
              <span className="eyebrow text-ink-muted">
                Мастерская 3D-печати · с 2023
              </span>
            </div>

            <h1 className="display mt-6 text-[3.5rem] leading-[0.95] sm:text-7xl md:text-[6.5rem]">
              Вещи, что
              <br />
              <span className="italic text-clay-600">растут</span>
              <span className="text-ink-muted">.</span>
              <br />
              Слой за слоем.
            </h1>

            <p className="mt-8 max-w-md text-lg text-ink-soft">
              Готовые изделия и индивидуальные заказы. Декор, аксессуары и
              подарки, напечатанные у нас в Москве.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/catalog" className="btn-primary">
                Открыть каталог
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-ink/10 pt-6">
              <div>
                <dt className="eyebrow text-ink-muted">Слой</dt>
                <dd className="display mt-1.5 text-2xl">0.08–0.2 мм</dd>
              </div>
              <div>
                <dt className="eyebrow text-ink-muted">Материалы</dt>
                <dd className="display mt-1.5 text-2xl">PLA · PETG</dd>
              </div>
              <div>
                <dt className="eyebrow text-ink-muted">Срок</dt>
                <dd className="display mt-1.5 text-2xl">2–4 дня</dd>
              </div>
            </dl>
          </div>

          <div className="relative md:col-span-5">
            <div className="absolute -left-10 -top-10 hidden h-72 w-72 rounded-full bg-clay-200 blur-3xl md:block" />
            <div className="relative">
              <div className="absolute -left-4 -top-4 z-20 rotate-[-6deg] rounded-2xl bg-ink px-4 py-2 text-xs text-paper-light shadow-soft">
                печатается сейчас
              </div>
              <div className="animate-floaty">
                <ProductTile product={hero} size="xl" />
              </div>
              <div className="absolute -bottom-4 right-2 z-20 rounded-2xl bg-paper-light px-4 py-3 text-xs ring-1 ring-ink/10 shadow-soft">
                <div className="eyebrow text-ink-muted">{hero.material}</div>
                <div className="mt-0.5 font-medium">
                  {hero.name} · {formatPrice(hero.price)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="relative mt-20 overflow-hidden border-y border-ink/10 py-5">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center gap-12 pr-12 text-3xl tracking-tightest md:text-5xl"
            >
              <span className="display">Декор</span>
              <span className="text-clay-600">✦</span>
              <span className="display italic">Игрушки</span>
              <span className="text-clay-600">✦</span>
              <span className="display">Аксессуары</span>
              <span className="text-clay-600">✦</span>
              <span className="display italic">На заказ</span>
              <span className="text-clay-600">✦</span>
              <span className="display">Подарки</span>
              <span className="text-clay-600">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED — BENTO */}
      <section className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow text-clay-700">Витрина</div>
            <h2 className="display mt-3 text-4xl md:text-6xl">
              Что у нас на полках
            </h2>
          </div>
          <Link href="/catalog" className="link-underline text-sm font-medium">
            Весь каталог →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <div
              key={p.id}
              className={i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}
            >
              {i === 0 ? (
                <Link
                  href={`/product/${p.slug}`}
                  className="group block h-full overflow-hidden rounded-[2rem] bg-ink text-paper-light ring-1 ring-ink/5 transition hover:-translate-y-1"
                >
                  <div className="relative p-4">
                    <ProductTile product={p} size="lg" />
                  </div>
                  <div className="p-6 pt-2">
                    <div className="eyebrow text-paper-light/60">
                      Главное предложение · {p.material}
                    </div>
                    <h3 className="display mt-2 text-3xl">{p.name}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-paper-light/70">
                      {p.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="display text-3xl">
                        {formatPrice(p.price)}
                      </span>
                      <span className="rounded-full bg-paper-light/10 px-4 py-2 text-sm ring-1 ring-white/10 group-hover:bg-paper-light/20">
                        Подробнее →
                      </span>
                    </div>
                  </div>
                </Link>
              ) : (
                <ProductCard product={p} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <WorkGallery />

      {/* HOW IT WORKS */}
      <section className="mt-24 rounded-[2.5rem] bg-paper-light p-8 ring-1 ring-ink/5 md:p-14">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="eyebrow text-clay-700">Процесс</div>
            <h2 className="display mt-3 text-4xl md:text-5xl">
              Как мы работаем
            </h2>
            <p className="mt-4 text-ink-soft">
              От выбора модели до отправки занимает от двух дней. Сложные
              заказы — до недели.
            </p>
          </div>

          <ol className="md:col-span-8 md:grid md:grid-cols-2 md:gap-6">
            {[
              {
                n: "01",
                t: "Выбираете изделие",
                d: "Из каталога или присылаете STL/STEP. Можно описать словами — поможем смоделировать.",
              },
              {
                n: "02",
                t: "Согласуем материал",
                d: "PLA для декора, PETG для влаги и солнца, TPU для гибких деталей.",
              },
              {
                n: "03",
                t: "Печатаем",
                d: "Слой от 0.08 мм. По запросу — шлифовка, грунт, покраска.",
              },
              {
                n: "04",
                t: "Доставляем",
                d: "Самовывоз в Москве или СДЭК / Boxberry / Почта.",
              },
            ].map((s) => (
              <li
                key={s.n}
                className="mb-6 flex gap-4 last:mb-0 md:mb-0"
              >
                <span className="display flex-shrink-0 text-3xl text-clay-600">
                  {s.n}
                </span>
                <div>
                  <h3 className="display text-xl">{s.t}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* MATERIALS */}
      <section className="mt-24">
        <div className="eyebrow text-clay-700">Материалы</div>
        <h2 className="display mt-3 text-4xl md:text-5xl">
          С чем мы работаем
        </h2>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              t: "PLA",
              d: "Декор, игрушки, прототипы. Чистая фактура, легко красится. Не любит температуру выше 50°C.",
              from: "#3a342e",
              to: "#7a7167",
            },
            {
              t: "PETG",
              d: "Кухня, улица, влажные помещения. Прочнее и гибче PLA, не размокает.",
              from: "#0c7064",
              to: "#3ec2ab",
            },
            {
              t: "TPU",
              d: "Эластичный материал. Чехлы, прокладки, держатели, гибкие шарниры.",
              from: "#3f6e68",
              to: "#6aa8a0",
            },
          ].map((m) => (
            <div
              key={m.t}
              className="grain relative overflow-hidden rounded-[2rem] p-8 text-paper-light"
              style={{
                background: `linear-gradient(135deg, ${m.from}, ${m.to})`,
              }}
            >
              <div className="eyebrow text-paper-light/70">материал</div>
              <div className="display mt-4 text-5xl">{m.t}</div>
              <p className="mt-4 max-w-xs text-sm text-paper-light/80">
                {m.d}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
