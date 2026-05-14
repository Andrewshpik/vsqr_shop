import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ThemeProvider } from "@/components/ThemeProvider";

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

const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('vsqr-theme');
    if (!t) {
      t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if (t === 'dark') document.documentElement.classList.add('dark');
  } catch(e){}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen flex flex-col text-ink">
        <ThemeProvider>
          <AnimatedBackground />
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
