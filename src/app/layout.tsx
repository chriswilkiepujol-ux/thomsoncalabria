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
    default: "Thomson Calabria — Off-Market Hotels, Restaurants & Residences",
    template: "%s | Thomson Calabria",
  },
  description:
    "International realty and consultancy. Off-market hotels, restaurants and private residences in Sotogrande, Marbella, Italy and Dubai — principal to principal.",
  openGraph: {
    type: "website",
    siteName: "Thomson Calabria",
    locale: "en_GB",
    images: [{ url: "https://kfgzhurkaybmuxkuolxc.supabase.co/storage/v1/object/public/media/site/hero-villa.jpg", width: 2000, height: 1334 }],
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
