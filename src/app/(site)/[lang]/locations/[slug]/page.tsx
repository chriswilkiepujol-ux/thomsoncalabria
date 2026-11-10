import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, CtaBand, JsonLd, PageHero, SectionHead } from "@/components/Section";
import { PropertyCard } from "@/components/PropertyCard";
import { EnquiryForm } from "@/components/EnquiryForm";
import { CATEGORIES, catText, getContent, getProperties, LOCATIONS, type CategoryKey } from "@/lib/content";
import { alternates, dict, href, isLang, LANGS, type Lang } from "@/lib/i18n";

export const revalidate = 60;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => Object.keys(LOCATIONS).map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang: l, slug } = await params;
  const lang: Lang = isLang(l) ? l : "en";
  if (!LOCATIONS[slug]) return {};
  const c = await getContent(`location:${slug}` as "location:marbella", lang);
  return {
    title: { absolute: c.seoTitle },
    description: c.seoDescription,
    alternates: alternates(lang, `/locations/${slug}`),
    openGraph: { title: c.seoTitle, description: c.seoDescription, images: [{ url: c.image }] },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: l, slug } = await params;
  if (!isLang(l) || !LOCATIONS[slug]) notFound();
  const lang = l;
  const d = dict(lang);
  const t = d.locations;
  const [c, props] = await Promise.all([
    getContent(`location:${slug}` as "location:marbella", lang),
    getProperties({ location: slug, lang }),
  ]);
  const fill = (s: string) => s.replace("{place}", c.name);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Place",
          name: c.name,
          description: c.seoDescription,
          address: { "@type": "PostalAddress", addressCountry: LOCATIONS[slug].country },
        }}
      />
      <PageHero kicker={c.kicker} title={c.title} intro={c.intro} image={c.image} />

      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="kicker">
                {t.aboutPlace} {c.name}
              </div>
              <div className="mt-6 space-y-3">
                {(Object.keys(CATEGORIES) as CategoryKey[]).map((k) => (
                  <Link key={k} href={href(lang, `/${CATEGORIES[k].slug}`)} className="link-underline block text-sm text-ivory/80">
                    {catText(lang, k).label} {t.inPlace} {c.name}
                  </Link>
                ))}
                <Link href={href(lang, "/consultancy")} className="link-underline block text-sm text-ivory/80">
                  {d.nav.consultancy}
                </Link>
              </div>
            </div>
            <div className="lg:col-span-8">
              {c.body.map((p, i) => (
                <p key={i} className="lede mb-6 text-[1.1rem]">{p}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-12 lg:py-16">
        <Container>
          <SectionHead
            kicker={`${c.name} · ${t.opportunities}`}
            title={props.length ? `${t.currentlyIn} ${c.name}.` : fill(t.sharedPrivately)}
            body={props.length ? t.briefOutline : t.registerBelow}
          />
          {props.length > 0 && (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {props.map((p) => (
                <PropertyCard key={p.id} p={p} lang={lang} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="light-alt py-12 lg:py-16">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="kicker">{d.contact.kicker}</div>
              <h2 className="display-md mt-3">{fill(t.lookingIn)}</h2>
              <p className="mt-3 text-[0.94rem] leading-relaxed text-mist">{t.lookingBody}</p>
            </div>
            <div className="lg:col-span-8">
              <EnquiryForm lang={lang} sourcePage={href(lang, `/locations/${slug}`)} />
            </div>
          </div>
        </Container>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}
