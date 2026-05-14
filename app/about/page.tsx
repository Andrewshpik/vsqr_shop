export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4">
      <section className="mt-12">
        <div className="eyebrow text-clay-700">О нас</div>
        <h1 className="display mt-3 text-6xl leading-[0.95] md:text-8xl">
          Маленькая
          <br />
          <span className="italic text-clay-600">мастерская</span>
          <br />в Москве.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-ink-soft">
          Три принтера, пара пар рук и горы катушек филамента. Печатаем вещи,
          которые приятно поставить на стол, подарить или использовать каждый
          день.
        </p>
      </section>

      <section className="mt-20">
        <div className="eyebrow text-clay-700">Что умеем</div>
        <div className="mt-6 space-y-px overflow-hidden rounded-3xl bg-ink/10">
          {[
            ["01", "Печать готовых моделей", "Из нашего каталога — выбираете изделие и цвет."],
            ["02", "Печать по вашему файлу", "STL, STEP, OBJ, 3MF — присылайте, печатаем."],
            ["03", "3D-моделирование под задачу", "От эскиза или фото до готового объекта."],
            ["04", "Постобработка", "Шлифовка, грунт, покраска акрилом — по запросу."],
          ].map(([n, t, d]) => (
            <div
              key={n}
              className="flex flex-col gap-2 bg-paper-light p-6 md:flex-row md:items-center md:gap-8"
            >
              <span className="display flex-shrink-0 text-2xl text-clay-600 md:w-16">
                {n}
              </span>
              <div className="flex-1">
                <div className="display text-2xl">{t}</div>
              </div>
              <div className="text-sm text-ink-soft md:max-w-sm md:text-right">
                {d}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="eyebrow text-clay-700">Материалы</div>
        <dl className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              t: "PLA",
              d: "Декор, игрушки, прототипы. Не любит солнце и +50°C.",
            },
            {
              t: "PETG",
              d: "Кухня, улица, влажные помещения. Прочнее и гибче PLA.",
            },
            {
              t: "TPU",
              d: "Эластичный материал: чехлы, прокладки, держатели.",
            },
          ].map((m) => (
            <div key={m.t} className="card">
              <dt className="display text-3xl">{m.t}</dt>
              <dd className="mt-2 text-sm text-ink-soft">{m.d}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="my-24 overflow-hidden rounded-[2.5rem] bg-ink p-10 text-paper-light md:p-14">
        <h3 className="display text-4xl md:text-5xl">
          Что-то конкретное?
          <br />
          <span className="italic text-clay-400">Опишите задачу.</span>
        </h3>
        <p className="mt-4 max-w-md text-paper-light/70">
          Напишите нам в Telegram — предложим материал, размер и срок.
        </p>
        <a
          href="https://t.me/vsqr_shop"
          className="mt-6 inline-flex rounded-full bg-paper-light px-6 py-3 text-sm font-medium text-ink hover:bg-paper"
        >
          Telegram @vsqr_shop →
        </a>
      </section>
    </div>
  );
}
