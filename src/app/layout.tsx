import type { Metadata } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import { getContent } from "@/lib/content";
import "./globals.css";

const serif = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans-face",
  display: "swap",
});

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thomsoncalabria.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Thomson Calabria — Luxury Property in Marbella & Sotogrande | Homes, Rentals, Hotels",
    template: "%s | Thomson Calabria",
  },
  description:
    "International realty and consultancy. Luxury villas and apartments for sale and rent in Marbella and Sotogrande, and discreet off-market sales of hotels and restaurants.",
  openGraph: {
    type: "website",
    siteName: "Thomson Calabria",
    locale: "en_GB",
    images: [{ url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&h=630&q=80", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getContent("settings");
  return (
    <html
      lang="en"
      data-accent={settings.accent}
      className={`${serif.variable} ${sans.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
