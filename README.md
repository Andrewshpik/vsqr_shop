# VSQR — 3D-печать на заказ

Статичный лендинг мастерской 3D-печати: один файл `index.html` со
встроенными стилями и скриптами, плюс `products.json` как источник
данных о товарах. Деплой — GitHub Pages, ветка `main`, корень репо.

## Что внутри

- `index.html` — вся вёрстка, стили и логика (галерея-слайдер,
  анимированный canvas-фон, карточки товаров, Telegram-кнопки)
- `products.json` — данные товаров (название, цена, описание)

## Как править

Локальное превью — через локальный HTTP-сервер (просто открыть файл
двойным кликом не получится, т.к. `index.html` грузит `products.json`
через `fetch`, а `file://` это блокирует):

```powershell
python -m http.server 8000
# открыть http://localhost:8000
```

Контент:
- Товары — `products.json` (поля: `name`, `description`, `price`,
  `emoji`, `gradient`)
- Контакты — Telegram-кнопки в футере (`@andrewshpik`, `@fedornabilkin`)

## Деплой

`git push` в `main` → GitHub Pages автоматически публикует `index.html`
на привязанный домен. Настройки Pages — в Settings → Pages репозитория
на GitHub.
