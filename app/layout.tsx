import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const sans = Inter({
  subsets: ["latin", "cyrillic-ext"],
  variable: "--font-sans",
  display: "swap",
});

const display = Bricolage_Grotesque({
  subsets: ["latin", "cyrillic-ext"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VSQR — мастерская 3D-печати",
  description:
    "Дизайнерские изделия с 3D-принтера: декор, аксессуары, индивидуальные заказы. Печать в Москве, доставка по России.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen flex flex-col bg-paper text-ink">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
