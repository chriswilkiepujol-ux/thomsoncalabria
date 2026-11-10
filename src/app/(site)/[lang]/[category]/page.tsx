import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, CtaBand, JsonLd, PageHero, SectionHead } from "@/components/Section";
import { PropertyCard } from "@/components/PropertyCard";
import { EnquiryForm } from "@/components/EnquiryForm";
import { CATEGORIES, catText, categoryFromSlug, getContent, getProperties, LOCATIONS, locationLabel } from "@/lib/content";
import { alternates, dict, href, isLang, LANGS, type Lang } from "@/lib/i18n";

export const revalidate = 60;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => Object.values(CATEGORIES).map((c) => ({ lang, category: c.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; category: string }> }): Promise<Metadata> {
  const { lang: l, category } = await params;
  const lang: Lang = isLang(l) ? l : "en";
  const key = categoryFromSlug(category);
  if (!key) return {};
  const c = await getContent(`category:${key}` as const, lang);
  return {
    title: { absolute: c.seoTitle },
    description: c.seoDescription,
    alternates: alternates(lang, `/${category}`),
    openGraph: { title: c.seoTitle, description: c.seoDescription, images: [{ url: c.image }] },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ lang: string; category: string }> }) {
  const { lang: l, category } = await params;
  if (!isLang(l)) notFound();
  const lang = l;
  const key = categoryFromSlug(category);
  if (!key) notFound();

  const [c, props] = await Promise.all([getContent(`category:${key}` as const, lang), getProperties({ category: key, lang })]);
  const cat = catText(lang, key);
  const d = dict(lang);
  const t = d.category;
  const listed = key === "rental" || key === "residential";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: c.seoTitle,
          description: c.seoDescription,
          inLanguage: lang,
          url: `${process.env.NEXT_PUBLIC_SITE_URL}${href(lang, `/${category}`)}`,
          isPartOf: { "@type": "WebSite", name: "Thomson Calabria", url: process.env.NEXT_PUBLIC_SITE_URL },
        }}
      />
      <PageHero kicker={c.kicker} title={c.title} intro={c.intro} image={c.image} />

      <section className="py-12 lg:py-16">
        <Container>
          {c.notice && (
            <div className="mb-10 flex gap-4 border-l-4 border-accent bg-white p-5 shadow-[0_10px_30px_-24px_rgba(19,38,74,0.5)] lg:p-6">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">i</div>
              <div>
                <p className="text-[0.98rem] leading-relaxed text-ivory">{c.notice}</p>
                <Link href="#enquire" className="mt-2 inline-block text-[0.84rem] font-semibold text-accent hover:underline">
                  {t.registerBrief}
                </Link>
              </div>
            </div>
          )}
          <div className="grid gap-10 md:grid-cols-3">
            {c.highlights.map((h) => (
              <div key={h.title}>
                <div className="rule" />
                <h3 className="mt-5 font-display text-2xl">{h.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{h.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-12 lg:py-16">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHead
              kicker={`${t.current} · ${cat.nounPlural}`}
              title={
                props.length
                  ? key === "rental" ? t.titleRental : key === "residential" ? t.titleResidential : t.titleDefault
                  : listed ? t.titleEmptyListed : t.titleEmptyPrivate
              }
              body={
                props.length
                  ? key === "rental" ? t.bodyRental : key === "residential" ? t.bodyResidential : t.bodyDefault
                  : t.bodyEmpty
              }
            />
            <div className="flex flex-wrap gap-2 md:justify-end">
              {Object.keys(LOCATIONS).map((slug) => (
                <Link
                  key={slug}
                  href={href(lang, `/locations/${slug}`)}
                  className="border border-line px-3.5 py-1.5 text-[0.7rem] uppercase tracking-[0.12em] text-mist hover:border-accent hover:text-accent-2"
                >
                  {locationLabel(slug, lang)}
                </Link>
              ))}
            </div>
          </div>

          {props.length > 0 && (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {props.map((p) => (
                <PropertyCard key={p.id} p={p} lang={lang} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="light-alt py-12 lg:py-16" id="enquire">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="kicker">{key === "rental" ? t.bookKicker : t.briefKicker}</div>
              <h2 className="display-md mt-3">{key === "rental" ? t.bookTitle : t.briefTitle}</h2>
              <p className="mt-3 text-[0.94rem] leading-relaxed text-mist">{key === "rental" ? t.bookBody : t.briefBody}</p>
            </div>
            <div className="lg:col-span-8">
              <EnquiryForm lang={lang} defaultInterest={key} sourcePage={href(lang, `/${category}`)} />
            </div>
          </div>
        </Container>
      </section>

      <CtaBand lang={lang} title={d.cta.talkTitle} body={d.cta.talkBody} />
    </>
  );
}
