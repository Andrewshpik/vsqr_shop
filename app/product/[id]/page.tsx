import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, getProduct, products } from "@/lib/products";
import { CATEGORY_LABELS } from "@/lib/types";
import { ProductTile } from "@/components/ProductTile";
import { ProductCard } from "@/components/ProductCard";
import { AddToCart } from "@/components/AddToCart";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.slug }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id);
  if (!product) notFound();

  const related = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4">
      <nav className="mt-8 flex items-center gap-1.5 text-xs text-ink-muted">
        <Link href="/" className="link-underline hover:text-ink">
          Главная
        </Link>
        <span>/</span>
        <Link href="/catalog" className="link-underline hover:text-ink">
          Каталог
        </Link>
        <span>/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="sticky top-28">
            <ProductTile product={product} size="xl" />
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="product-tile grain relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl text-3xl"
                  style={
                    {
                      ["--from" as any]: product.gradient[0],
                      ["--to" as any]: product.gradient[1],
                      filter: `hue-rotate(${i * 24}deg) brightness(${1 + i * 0.04})`,
                    } as React.CSSProperties
                  }
                >
                  <span aria-hidden className="relative">{product.emoji}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="eyebrow text-clay-700">
            {CATEGORY_LABELS[product.category]}
            <span className="mx-2 opacity-50">/</span>
            {product.material}
          </div>

          <h1 className="display mt-3 text-5xl leading-[0.95] md:text-6xl">
            {product.name}
          </h1>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="display text-4xl">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-lg text-ink-muted line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            {product.inStock ? (
              <span className="chip bg-sage-500/10 text-sage-700 ring-sage-500/20">
                ● В наличии
              </span>
            ) : (
              <span className="chip bg-clay-100 text-clay-800 ring-clay-200">
                Под заказ
              </span>
            )}
          </div>

          <p className="mt-6 leading-relaxed text-ink-soft">
            {product.description}
          </p>

          <ul className="mt-6 space-y-2.5 text-sm text-ink-soft">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5">
                <span className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-clay-600 text-[10px] text-paper-light">
                  ✓
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink/10">
            {[
              ["Материал", product.material],
              ["Размер, мм", product.sizeMm],
              ["Время печати", `~${product.printTimeHours} ч`],
              ["Доставка", "2–4 дня по РФ"],
            ].map(([k, v]) => (
              <div key={k} className="bg-paper-light p-4">
                <dt className="eyebrow text-ink-muted">{k}</dt>
                <dd className="mt-1.5 text-sm font-medium">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 border-t border-ink/10 pt-8">
            <AddToCart product={product} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <div className="flex items-end justify-between">
            <h2 className="display text-3xl md:text-5xl">Ещё на полках</h2>
            <Link href="/catalog" className="link-underline text-sm font-medium">
              Весь каталог →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
