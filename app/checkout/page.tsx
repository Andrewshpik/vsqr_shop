import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <div className="display text-7xl text-clay-600">✦</div>
      <h1 className="display mt-6 text-5xl md:text-6xl">
        Приём заявок приостановлен
      </h1>
      <p className="mt-4 text-ink-soft">
        Возвращаемся к работе позже. Пока можно изучить каталог или написать
        нам в Telegram — отвечаем по будням.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/catalog" className="btn-primary">
          К каталогу →
        </Link>
        <a
          href="https://t.me/vsqr_shop"
          className="btn-outline"
        >
          Telegram @vsqr_shop
        </a>
      </div>
    </div>
  );
}
