import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-paper-light">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h3 className="display text-4xl tracking-tightest md:text-5xl">
              Хотите свою
              <br />
              вещь — напишите.
            </h3>
            <p className="mt-4 max-w-md text-paper-light/70">
              Маленькая мастерская в Москве. Печатаем на заказ, моделируем по
              эскизу, отправляем по России.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://t.me/vsqr_shop"
                className="rounded-full bg-paper-light px-6 py-3 text-sm font-medium text-ink hover:bg-paper"
              >
                Telegram @vsqr_shop
              </a>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="grid gap-10 sm:grid-cols-3">
              <div>
                <div className="eyebrow text-paper-light/50">Магазин</div>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li>
                    <Link
                      href="/catalog"
                      className="link-underline text-paper-light/85 hover:text-paper-light"
                    >
                      Каталог
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="link-underline text-paper-light/85 hover:text-paper-light"
                    >
                      Мастерская
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <div className="eyebrow text-paper-light/50">Контакты</div>
                <ul className="mt-4 space-y-2.5 text-sm text-paper-light/85">
                  <li>+7 (000) 000-00-00</li>
                  <li>Telegram @vsqr_shop</li>
                </ul>
              </div>

              <div>
                <div className="eyebrow text-paper-light/50">Доставка</div>
                <ul className="mt-4 space-y-2.5 text-sm text-paper-light/85">
                  <li>Самовывоз — м. Тульская</li>
                  <li>СДЭК · Boxberry</li>
                  <li>Ozon Доставка</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-paper-light/50 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} VSQR Workshop</span>
          <span>Слоями по 0.12 мм · сделано вручную</span>
        </div>
      </div>
    </footer>
  );
}
