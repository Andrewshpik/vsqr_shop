import type { Product } from "./types";

export const products: Product[] = [
  {
    id: "p-001",
    slug: "svitok-odinarniy",
    name: "Свиток одинарный",
    category: "decor",
    price: 250,
    material: "PETG",
    sizeMm: "180 × 60 × 60",
    colors: ["Слоновая кость", "Бронза", "Графит", "Белый"],
    printTimeHours: 5,
    description:
      "Декоративный свиток с одной осью. Печатается цельно — стержень и полотно как одна деталь. Подходит для интерьерных композиций, фотозон, настольных табличек с гравировкой.",
    highlights: [
      "Цельная печать без склейки",
      "Слой 0.12 мм — фактура пергамента",
      "Можно красить акрилом и патинировать",
    ],
    emoji: "📜",
    gradient: ["#3f2d1a", "#d97706"],
    inStock: true,
    isBestseller: true,
  },
  {
    id: "p-002",
    slug: "svitok-dvoynoy",
    name: "Свиток двойной",
    category: "decor",
    price: 350,
    material: "PETG",
    sizeMm: "220 × 80 × 70",
    colors: ["Слоновая кость", "Бронза", "Графит", "Белый"],
    printTimeHours: 8,
    description:
      "Свиток с двумя осями — развёрнутый, с обеими ручками. Эффектная подача: подойдёт для подарочной упаковки, тематических подарков и оформления полок.",
    highlights: [
      "Две оси, развёрнутый формат",
      "Слой 0.12 мм — фактура пергамента",
      "Устойчиво стоит без подставки",
    ],
    emoji: "📜",
    gradient: ["#1f2330", "#a16207"],
    inStock: true,
    isNew: true,
  },
  {
    id: "p-003",
    slug: "homyak",
    name: "Хомяк",
    category: "toys",
    price: 500,
    material: "PETG",
    sizeMm: "70 × 50 × 55",
    colors: ["Песочный", "Белый", "Серый", "Рыжий"],
    printTimeHours: 3,
    description:
      "Маленький хомяк, который удобно ложится в ладонь. Печатается без поддержек, поверхность приятная на ощупь. Хорошо стоит на столе и не катится.",
    highlights: [
      "Печать без поддержек",
      "Устойчивое плоское основание",
      "Безопасный PETG",
    ],
    emoji: "🐹",
    gradient: ["#7c5a2e", "#fbbf24"],
    inStock: true,
  },
  {
    id: "p-004",
    slug: "vaza",
    name: "Ваза",
    category: "decor",
    price: 100,
    material: "PETG",
    sizeMm: "80 × 80 × 140",
    colors: ["Белый", "Чёрный", "Графит", "Терракота"],
    printTimeHours: 4,
    description:
      "Простая интерьерная ваза. Подходит для сухоцветов и небольших букетов. Стенки печатаются спиралью — без заметных швов.",
    highlights: [
      "Печать спиралью, без шва",
      "Устойчивое утолщённое дно",
      "Влагостойкий PETG",
    ],
    emoji: "🏺",
    gradient: ["#15181f", "#4453cf"],
    inStock: true,
  },
];

export function getProduct(idOrSlug: string): Product | undefined {
  return products.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}

export function formatPrice(rub: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(rub);
}
