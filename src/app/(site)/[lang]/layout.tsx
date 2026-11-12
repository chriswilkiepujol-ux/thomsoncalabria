import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AccentPreview } from "@/components/AccentPreview";
import { JsonLd } from "@/components/Section";
import { getContent } from "@/lib/content";
import { isLang, LANGS } from "@/lib/i18n";

export const revalidate = 60;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
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
          name: "Thomson Calabria",
          alternateName: "Thomson Calabria SL — International Realty / Consultancy",
          url: site,
          logo: `${site}/icon.svg`,
          image: "https://kfgzhurkaybmuxkuolxc.supabase.co/storage/v1/object/public/media/site/hero-villa-sharp.jpg",
          email: settings.email,
          telephone: settings.phone,
          founder: { "@type": "Person", name: "Linda Thomson" },
          foundingDate: "2009",
          areaServed: ["Marbella", "Sotogrande", "Costa del Sol", "Spain"],
          address: { "@type": "PostalAddress", addressLocality: "Marbella", addressRegion: "Málaga", addressCountry: "ES" },
          knowsAbout: [
            "off-market hotels for sale",
            "restaurant sales",
            "hospitality consultancy",
            "hotel branding",
            "luxury villas",
            "luxury rentals at the Marbella Club",
          ],
          availableLanguage: ["English", "Spanish"],
          sameAs: ["https://ltpropertiesmarbella.com"],
        }}
      />
      <Header lang={lang} phone={settings.phone} phoneDisplay={settings.phoneDisplay} />
      <main className="light" lang={lang}>
        {children}
      </main>
      <Footer settings={settings} lang={lang} />
    </>
  );
}
