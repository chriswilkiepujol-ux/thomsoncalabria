import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, CtaBand, SectionHead } from "@/components/Section";
import { PropertyCard } from "@/components/PropertyCard";
import { catText, countryLabel, getContent, getProperties, LOCATIONS, locationLabel, CATEGORIES } from "@/lib/content";
import { alternates, dict, href, isLang, type Lang } from "@/lib/i18n";

export const revalidate = 60;

const TITLES: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "Thomson Calabria — Off-Market Hotels & Restaurants, Hospitality Consultancy | Marbella",
    description:
      "Off-market sales of hotels and restaurants, hospitality consultancy and hotel branding in Marbella, Sotogrande and beyond — plus select villas and luxury rentals at the Marbella Club.",
  },
  es: {
    title: "Thomson Calabria — Hoteles y restaurantes off-market, consultoría hotelera | Marbella",
    description:
      "Venta off-market de hoteles y restaurantes, consultoría hotelera y branding en Marbella, Sotogrande y más allá — además de villas selectas y alquileres de lujo en el Marbella Club.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: l } = await params;
  const lang = isLang(l) ? l : "en";
  return {
    title: { absolute: TITLES[lang].title },
    description: TITLES[lang].description,
    alternates: alternates(lang, "/"),
    openGraph: { locale: lang === "es" ? "es_ES" : "en_GB" },
  };
}

type TileKey = "hotel" | "restaurant" | "consultancy" | "residential" | "rental";
const TILES: { key: TileKey; image: string }[] = [
  { key: "hotel", image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=80" },
  { key: "restaurant", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80" },
  { key: "consultancy", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80" },
  { key: "residential", image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=1000&q=80" },
  { key: "rental", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80" },
];

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang: Lang = isLang(l) ? l : "en";
  const d = dict(lang);
  const t = d.home;
  const [home, featured] = await Promise.all([getContent("home", lang), getProperties({ featured: true, limit: 3, lang })]);

  const tileLabel = (k: TileKey) => (k === "consultancy" ? d.nav.consultancy : catText(lang, k).label);
  const tileHref = (k: TileKey) => href(lang, k === "consultancy" ? "/consultancy" : `/${CATEGORIES[k].slug}`);

  return (
    <>
      {/* HERO */}
      <section className="dark relative flex min-h-[600px] items-end overflow-hidden bg-navy-950 lg:min-h-[680px]">
        <Image src={home.heroImage} alt="" fill priority quality={90} sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/55 via-transparent via-30% to-navy-950/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/60 via-navy-950/10 via-50% to-transparent" />
        <div className="absolute inset-0 bg-navy-950/35 sm:hidden" />
        <Container className="hero-text relative z-10 pb-14 pt-32 lg:pb-20">
          <div className="max-w-2xl">
            <div className="kicker rise">{home.heroKicker}</div>
            <h1 className="display-xl rise rise-2 mt-4">{home.heroTitle}</h1>
            <p className="lede rise rise-3 mt-5 text-[1.12rem]">{home.heroSubtitle}</p>
            <div className="rise rise-4 mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={href(lang, "/contact")} className="btn btn-solid">
                {t.ctaPrimary}
              </Link>
              <Link href="#portfolio" className="btn btn-ghost">
                {t.ctaSecondary}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* WHAT WE DO */}
      <section className="py-14 lg:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <div className="kicker">{home.introKicker}</div>
              <h2 className="display-lg mt-3">{home.introTitle}</h2>
              <p className="lede mt-4">{home.introBody}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3 lg:col-span-7 lg:gap-8 lg:pt-8">
              {home.pillars.map((p, i) => (
                <div key={p.title} className="border-t border-accent/50 pt-5">
                  <div className="font-display text-lg text-accent">0{i + 1}</div>
                  <h3 className="mt-1 font-display text-xl">{p.title}</h3>
                  <p className="mt-2 text-[0.94rem] leading-relaxed text-mist">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* WHAT WE DO — TILES */}
      <section id="portfolio" className="light-alt scroll-mt-20 py-14 lg:py-20">
        <Container>
          <SectionHead kicker={t.portfolioKicker} title={t.portfolioTitle} />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
            {TILES.map((tile, i) => (
              <Link
                key={tile.key}
                href={tileHref(tile.key)}
                className={`group relative block overflow-hidden ${i === 0 ? "col-span-2 aspect-[16/10] lg:col-span-1 lg:aspect-[3/4]" : "aspect-[3/4]"}`}
              >
                <Image
                  src={tile.image}
                  alt={tileLabel(tile.key)}
                  fill
                  sizes="(max-width: 1024px) 50vw, 20vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/35 to-transparent" />
                <div className="dark absolute inset-x-0 bottom-0 p-4 lg:p-5">
                  <h3 className="font-display text-xl lg:text-2xl">{tileLabel(tile.key)}</h3>
                  <p className="mt-1 hidden text-[0.88rem] leading-snug text-mist sm:block">{d.tiles[tile.key]}</p>
                  <span className="mt-2 inline-block text-[0.8rem] font-semibold text-accent-2 lg:mt-3">{t.view} →</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="py-14 lg:py-20">
          <Container>
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <SectionHead kicker={t.featuredKicker} title={t.featuredTitle} body={t.featuredBody} />
              <Link href={href(lang, "/hotels")} className="btn btn-ghost btn-sm self-start md:self-auto">
                {t.viewAll}
              </Link>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((p, i) => (
                <PropertyCard key={p.id} p={p} lang={lang} priority={i === 0} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* WHERE WE WORK */}
      <section className="dark bg-navy-950 py-14 lg:py-20">
        <Container>
          <SectionHead kicker={t.whereKicker} title={t.whereTitle} />
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {Object.entries(LOCATIONS).map(([slug, loc]) => (
              <Link key={slug} href={href(lang, `/locations/${slug}`)} className="group relative block aspect-[3/4] overflow-hidden">
                <Image
                  src={loc.image}
                  alt={locationLabel(slug, lang)}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 lg:p-5">
                  <div className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-accent-2">
                    {countryLabel(loc.country, lang)}
                  </div>
                  <h3 className="mt-1 font-display text-2xl">{locationLabel(slug, lang)}</h3>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-14 lg:py-20">
        <Container>
          <SectionHead kicker={t.howKicker} title={home.processTitle} />
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {home.process.map((s) => (
              <li key={s.step} className="border-t border-accent/50 pt-5">
                <div className="font-display text-lg text-accent">{s.step}</div>
                <h3 className="mt-1 font-display text-xl">{s.title}</h3>
                <p className="mt-2 text-[0.94rem] leading-relaxed text-mist">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* TESTIMONIALS */}
      <section className="light-alt py-14 lg:py-20">
        <Container>
          <SectionHead kicker={t.clientsKicker} title={t.clientsTitle} />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {home.testimonials.map((q) => (
              <figure key={q.name} className="card p-6">
                <blockquote className="font-display text-lg leading-relaxed">&ldquo;{q.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-[0.8rem] font-semibold text-mist">
                  {q.name} <span className="text-accent">·</span> {q.place}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand lang={lang} />
    </>
  );
}
