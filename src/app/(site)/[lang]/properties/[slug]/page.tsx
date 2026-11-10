import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, JsonLd } from "@/components/Section";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PropertyCard } from "@/components/PropertyCard";
import { CATEGORIES, catText, getProperties, getProperty, locationLabel } from "@/lib/content";
import { alternates, dict, href, isLang, type Lang } from "@/lib/i18n";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang: l, slug } = await params;
  const lang: Lang = isLang(l) ? l : "en";
  const p = await getProperty(slug, lang);
  if (!p) return {};
  const cat = catText(lang, p.category);
  const t = dict(lang).property;
  const where = lang === "es" ? "en" : "in";
  const om = p.off_market ? (lang === "es" ? " off-market" : "Off-Market ") : "";
  const kind =
    lang === "es"
      ? `${cat.singular}${om}${p.category === "rental" ? "" : ` ${t.forSale}`}`
      : `${om}${cat.singular}${p.category === "rental" ? "" : ` ${t.forSale}`}`;
  const title = `${p.title} — ${kind} ${where} ${locationLabel(p.location, lang)}`;
  return {
    title: { absolute: `${title} | Thomson Calabria` },
    description: p.headline ?? p.description?.slice(0, 155),
    alternates: alternates(lang, `/properties/${slug}`),
    openGraph: { title, images: p.image_url ? [{ url: p.image_url }] : undefined },
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: l, slug } = await params;
  if (!isLang(l)) notFound();
  const lang = l;
  const p = await getProperty(slug, lang);
  if (!p) notFound();
  const cat = catText(lang, p.category);
  const d = dict(lang);
  const t = d.property;
  const related = (await getProperties({ category: p.category, limit: 4, lang })).filter((r) => r.id !== p.id).slice(0, 3);
  const rental = p.category === "rental";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": rental ? "LodgingBusiness" : "RealEstateListing",
          name: p.title,
          description: p.headline ?? p.description,
          inLanguage: lang,
          url: `${process.env.NEXT_PUBLIC_SITE_URL}${href(lang, `/properties/${p.slug}`)}`,
          image: p.image_url,
          address: { "@type": "PostalAddress", addressLocality: locationLabel(p.location, lang), addressCountry: p.country },
          offers: p.price_label ? { "@type": "Offer", price: p.price_label, availability: "https://schema.org/InStock" } : undefined,
        }}
      />
      <section className="dark relative flex min-h-[480px] items-end overflow-hidden bg-navy-950 lg:min-h-[540px]">
        {p.image_url ? (
          <div className={`absolute inset-0 ${p.off_market ? "private-img" : ""}`}>
            <Image src={p.image_url} alt="" fill priority sizes="100vw" className="object-cover" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(26,48,89,0.9),rgba(5,11,26,1))]" />
        )}
        <div className="veil absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-navy-950/25 to-transparent" />
        <Container className="relative z-10 pb-12 pt-32">
          <div className="flex flex-wrap items-center gap-3 text-[0.7rem] uppercase tracking-[0.12em] text-mist">
            <Link href={href(lang, `/${CATEGORIES[p.category].slug}`)} className="hover:text-accent">{cat.label}</Link>
            <span className="text-accent">/</span>
            <Link href={href(lang, `/locations/${p.location}`)} className="hover:text-accent">{locationLabel(p.location, lang)}</Link>
            <span className="text-accent">/</span>
            <span>Ref. {p.slug.slice(0, 8).toUpperCase()}</span>
          </div>
          <h1 className="display-lg rise mt-6 max-w-4xl">{p.title}</h1>
          {p.headline && <p className="lede rise rise-2 mt-6 max-w-2xl">{p.headline}</p>}
          {p.off_market && (
            <div className="rise rise-3 mt-8 inline-flex items-center gap-3 border border-accent/40 bg-navy-950/60 px-4 py-2 text-[0.7rem] uppercase tracking-[0.12em] text-accent-2 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {t.offMarketBadge}
            </div>
          )}
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="kicker">{p.off_market ? t.opportunity : rental ? t.theProperty : t.aboutProperty}</div>
              <div className="mt-6 space-y-5">
                {(p.description ?? "").split(/\n{2,}/).map((para, i) => (
                  <p key={i} className="lede text-[1.08rem]">{para}</p>
                ))}
              </div>

              {!p.off_market && p.gallery.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {p.gallery.map((src, i) => (
                    <a
                      key={i}
                      href={src}
                      target="_blank"
                      rel="noopener"
                      className={`relative block overflow-hidden ${i === 0 ? "col-span-2 aspect-[16/10] md:row-span-2 md:aspect-auto" : "aspect-[4/3]"}`}
                    >
                      <Image src={src} alt={`${p.title} — ${t.photo} ${i + 1}`} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transition-transform duration-500 hover:scale-105" />
                    </a>
                  ))}
                </div>
              )}

              {p.key_facts.length > 0 && (
                <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-line pt-10 md:grid-cols-3">
                  {p.key_facts.map((f) => (
                    <div key={f.label}>
                      <dt className="text-[0.68rem] uppercase tracking-[0.12em] text-mist-2">{f.label}</dt>
                      <dd className="mt-1.5 font-display text-2xl text-ivory">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            <aside className="lg:col-span-5">
              <div className="card sticky top-28 p-8 lg:p-10">
                <div className="text-[0.68rem] uppercase tracking-[0.12em] text-mist-2">
                  {rental ? d.card.rates : p.off_market ? d.card.guide : d.card.price}
                </div>
                <div className="mt-2 font-display text-4xl text-accent-2">{p.price_label ?? d.card.onApplication}</div>
                <div className="hairline my-8" />
                <h2 className="font-display text-2xl">
                  {p.off_market ? t.requestPrivate : rental ? t.checkAvailability : t.arrangeViewing}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  {p.off_market ? t.requestPrivateBody : rental ? t.checkAvailabilityBody : t.arrangeViewingBody}
                </p>
                <div className="mt-8">
                  <EnquiryForm
                    lang={lang}
                    compact
                    propertyRef={`${p.title} (${p.slug})`}
                    sourcePage={href(lang, `/properties/${p.slug}`)}
                    messagePlaceholder={rental ? t.phRental : p.off_market ? t.phOffMarket : t.phListed}
                    submitLabel={rental ? t.btnRental : p.off_market ? t.btnOffMarket : t.btnListed}
                  />
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line py-12 lg:py-16">
          <Container>
            <div className="kicker">
              {t.alsoIn} {cat.label.toLowerCase()}
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <PropertyCard key={r.id} p={r} lang={lang} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
