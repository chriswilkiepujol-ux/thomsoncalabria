import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { getContent } from "@/lib/content";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-manrope",
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
      className={`${cormorant.variable} ${manrope.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
