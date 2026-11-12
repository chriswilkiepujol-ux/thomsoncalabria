import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, CtaBand, JsonLd, PageHero } from "@/components/Section";
import { EnquiryForm } from "@/components/EnquiryForm";
import { getContent } from "@/lib/content";
import { alternates, dict, href, isLang, type Lang } from "@/lib/i18n";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: l } = await params;
  const lang: Lang = isLang(l) ? l : "en";
  const c = await getContent("consultancy", lang);
  return {
    title: { absolute: c.seoTitle },
    description: c.seoDescription,
    alternates: alternates(lang, "/consultancy"),
    openGraph: { title: c.seoTitle, description: c.seoDescription, images: [{ url: c.image }] },
  };
}

export default async function ConsultancyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  if (!isLang(l)) notFound();
  const lang = l;
  const c = await getContent("consultancy", lang);
  const t = dict(lang).consultancy;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Hospitality consultancy and hotel branding",
          name: c.title,
          description: c.seoDescription,
          inLanguage: lang,
          provider: { "@type": "Organization", name: "Thomson Calabria" },
          areaServed: ["Marbella", "Sotogrande", "Spain", "International"],
        }}
      />
      <PageHero kicker={c.kicker} title={c.title} intro={c.intro} image={c.image} />

      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.services.map((s, i) => (
              <div key={s.title} className="border-t border-accent/50 pt-5">
                <div className="font-display text-lg text-accent">0{i + 1}</div>
                <h2 className="mt-1 font-display text-xl">{s.title}</h2>
                <p className="mt-2 text-[0.94rem] leading-relaxed text-mist">{s.body}</p>
              </div>
            ))}
          </div>
          {c.body.length > 0 && (
            <div className="mt-10 max-w-3xl space-y-4">
              {c.body.map((p, i) => (
                <p key={i} className="lede">{p}</p>
              ))}
              {c.author && <p className="text-[0.9rem] font-semibold text-ivory">— {c.author}</p>}
            </div>
          )}
        </Container>
      </section>

      <section className="light-alt py-12 lg:py-16" id="enquire">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="kicker">{t.bookKicker}</div>
              <h2 className="display-md mt-3">{t.bookTitle}</h2>
              <p className="mt-3 text-[0.94rem] leading-relaxed text-mist">{t.bookBody}</p>
            </div>
            <div className="lg:col-span-8">
              <EnquiryForm lang={lang} defaultInterest="consultancy" sourcePage={href(lang, "/consultancy")} />
            </div>
          </div>
        </Container>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}
