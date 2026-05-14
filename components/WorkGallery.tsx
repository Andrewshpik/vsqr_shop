"use client";

import { useEffect, useState } from "react";

const slides = [
  { n: "01", title: "Работа в галерее", hint: "PLA · декор" },
  { n: "02", title: "Работа в галерее", hint: "PETG · кухня" },
  { n: "03", title: "Работа в галерее", hint: "TPU · аксессуар" },
  { n: "04", title: "Работа в галерее", hint: "PLA · игрушки" },
  { n: "05", title: "Работа в галерее", hint: "PETG · сад" },
  { n: "06", title: "Работа в галерее", hint: "PLA · подарок" },
];

const AUTO_MS = 4500;

export function WorkGallery() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const len = slides.length;

  const next = () => setIndex((i) => (i + 1) % len);
  const prev = () => setIndex((i) => (i - 1 + len) % len);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % len), AUTO_MS);
    return () => clearInterval(id);
  }, [paused, len]);

  return (
    <section
      className="mt-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Галерея работ"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="eyebrow text-clay-700">Галерея</div>
          <h2 className="display mt-3 text-4xl md:text-6xl">
            Работы из мастерской
          </h2>
        </div>
        <div className="font-mono text-sm text-ink-muted">
          {String(index + 1).padStart(2, "0")}{" "}
          <span className="text-ink/30">/</span>{" "}
          {String(len).padStart(2, "0")}
        </div>
      </div>

      <div className="relative mt-10 overflow-hidden rounded-[2.5rem] bg-paper-light ring-1 ring-ink/5">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div
              key={i}
              className="w-full flex-shrink-0"
              aria-hidden={i !== index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} из ${len}`}
            >
              <div
                className="grain relative grid h-[360px] place-items-center md:h-[480px]"
                style={{
                  background:
                    "linear-gradient(135deg, #efe9df 0%, #e2d8c8 55%, #c7b7a0 100%)",
                }}
              >
                <div className="text-center">
                  <div className="display text-[8rem] leading-none text-ink/15 md:text-[12rem]">
                    {s.n}
                  </div>
                  <div className="eyebrow mt-4 text-ink-muted">заглушка</div>
                  <div className="display mt-2 text-2xl text-ink">
                    {s.title}
                  </div>
                  <div className="mt-1 text-xs text-ink-muted">{s.hint}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Предыдущий слайд"
          onClick={prev}
          className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-paper-light/85 text-ink ring-1 ring-ink/10 backdrop-blur transition hover:bg-paper-light md:left-5 md:h-12 md:w-12"
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
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Следующий слайд"
          onClick={next}
          className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-paper-light/85 text-ink ring-1 ring-ink/10 backdrop-blur transition hover:bg-paper-light md:right-5 md:h-12 md:w-12"
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
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Перейти к слайду ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index
                ? "w-8 bg-ink"
                : "w-2 bg-ink/20 hover:bg-ink/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
