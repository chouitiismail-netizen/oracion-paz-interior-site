import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://REPLACE_AFTER_VERCEL.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Oraciones para la paz interior - Calma tu mente y descansa en Dios",
  description: "Oraciones y reflexiones originales para calmar la mente, encontrar serenidad interior y descansar el corazón en Dios.",
  keywords: ["oraciones para la paz interior", "oración para calmar la mente", "oración para la serenidad", "paz interior católica", "oraciones de tranquilidad"],
  openGraph: {
    title: "Oraciones para la paz interior",
    description: "Oraciones y reflexiones originales para calmar la mente, encontrar serenidad interior y descansar el corazón en Dios.",
    url: baseUrl,
    siteName: "Oraciones para la paz interior",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oraciones para la paz interior",
    description: "Oraciones y reflexiones originales para calmar la mente, encontrar serenidad interior y descansar el corazón en Dios.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${fraunces.variable} ${inter.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
