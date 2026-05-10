import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <div className="display text-[10rem] leading-none text-clay-600">404</div>
      <h1 className="display mt-4 text-4xl">Здесь пусто</h1>
      <p className="mt-2 text-ink-soft">
        Возможно, изделие уже распечатали и убрали с витрины.
      </p>
      <Link href="/" className="btn-primary mt-8">
        На главную
      </Link>
    </div>
  );
}
