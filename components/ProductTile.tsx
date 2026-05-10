import type { Product } from "@/lib/types";

export function ProductTile({
  product,
  size = "md",
  className = "",
}: {
  product: Product;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizeClass =
    size === "xl"
      ? "text-[10rem]"
      : size === "lg"
        ? "text-8xl"
        : size === "sm"
          ? "text-4xl"
          : "text-6xl";

  return (
    <div
      className={`product-tile grain relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[2rem] ${className}`}
      style={
        {
          ["--from" as any]: product.gradient[0],
          ["--to" as any]: product.gradient[1],
        } as React.CSSProperties
      }
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_50%)]" />
      <span
        className={`relative drop-shadow-[0_12px_28px_rgba(0,0,0,0.4)] ${sizeClass}`}
        aria-hidden
      >
        {product.emoji}
      </span>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent" />
    </div>
  );
}
