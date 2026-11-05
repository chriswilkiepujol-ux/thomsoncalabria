import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AccentPreview } from "@/components/AccentPreview";
import { JsonLd } from "@/components/Section";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getContent("settings");
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thomsoncalabria.com";
  return (
    <>
      <Suspense fallback={null}>
        <AccentPreview />
      </Suspense>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: "Thomson & Calabria",
          alternateName: "Thomson & Calabria SL — International Realty / Consultancy",
          url: site,
          logo: `${site}/icon.svg`,
          image: `${site}/images/hero-villa.jpg`,
          email: settings.email,
          telephone: settings.phone,
          founder: { "@type": "Person", name: "Linda Thomson" },
          foundingDate: "2009",
          areaServed: ["Marbella", "Sotogrande", "Costa del Sol", "Italy", "Dubai"],
          address: { "@type": "PostalAddress", addressLocality: "Marbella", addressRegion: "Málaga", addressCountry: "ES" },
          knowsAbout: ["off-market property", "hotel acquisitions", "restaurant sales", "luxury villas", "luxury rentals"],
          sameAs: ["https://ltpropertiesmarbella.com"],
        }}
      />
      <Header phone={settings.phone} phoneDisplay={settings.phoneDisplay} />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  );
}
