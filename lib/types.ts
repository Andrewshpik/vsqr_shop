export type Category =
  | "decor"
  | "toys"
  | "tech"
  | "kitchen"
  | "office"
  | "custom";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  oldPrice?: number;
  material: string;
  colors: string[];
  description: string;
  highlights: string[];
  emoji: string;
  gradient: [string, string];
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
};

export type CartItem = {
  productId: string;
  qty: number;
  color: string;
};

export const CATEGORY_LABELS: Record<Category, string> = {
  decor: "Декор",
  toys: "Игрушки",
  tech: "Гаджеты",
  kitchen: "Кухня",
  office: "Офис",
  custom: "На заказ",
};
