import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AnimeHub - Tu Universo Anime Favorito",
  description:
    "Descubre la colección más completa de productos anime. Figuras, mangas, ropa y más con envío rápido a todo el Perú.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" richColors/>
      </body>
    </html>
  );
}
