import Image from "next/image";
import Link from "next/link";
import { Container, CtaBand, SectionHead } from "@/components/Section";
import { PropertyCard } from "@/components/PropertyCard";
import { getContent, getProperties, LOCATIONS, CATEGORIES } from "@/lib/content";

export const revalidate = 60;

const CATEGORY_TILES = [
  {
    key: "hotel",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=80",
    blurb: "Boutique hotels, resorts and hospitality assets — trading or for conversion.",
  },
  {
    key: "restaurant",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
    blurb: "Beach clubs, fine dining and venues with licences that cannot be replaced.",
  },
  {
    key: "residential",
    image: "/images/villa-pool-day.jpg",
    blurb: "Front-line penthouses, estates and plots in addresses that rarely trade.",
  },
  {
    key: "rental",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    blurb: "Villas and residences in Puente Romano, the Marbella Club and Sotogrande.",
  },
] as const;

export default async function HomePage() {
  const [home, featured] = await Promise.all([getContent("home"), getProperties({ featured: true, limit: 3 })]);

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <Image src={home.heroImage} alt="" fill priority sizes="100vw" className="slowzoom object-cover" />
        <div className="veil absolute inset-0" />
        <Container className="relative z-10 pb-24 pt-48 lg:pb-32">
          <div className="max-w-4xl">
            <div className="kicker rise">{home.heroKicker}</div>
            <h1 className="display-xl rise rise-2 mt-7 text-ivory">{home.heroTitle}</h1>
            <p className="lede rise rise-3 mt-8 max-w-2xl text-lg">{home.heroSubtitle}</p>
            <div className="rise rise-4 mt-12 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="btn btn-solid">
                <span>Register your interest</span>
              </Link>
              <Link href="#portfolio" className="btn btn-ghost">
                <span>Explore the portfolio</span>
              </Link>
            </div>
          </div>
        </Container>
        <div className="absolute bottom-10 right-10 hidden flex-col items-center gap-3 text-mist-2 lg:flex">
          <span className="text-[0.58rem] uppercase tracking-[0.34em] [writing-mode:vertical-rl]">Scroll</span>
          <span className="h-16 w-px bg-gradient-to-b from-accent to-transparent" />
        </div>
      </section>

      {/* INTRO */}
      <section className="relative py-28 lg:py-36">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="kicker">{home.introKicker}</div>
              <h2 className="display-lg mt-5">{home.introTitle}</h2>
            </div>
            <div className="lg:col-span-7">
              <p className="lede text-[1.15rem]">{home.introBody}</p>
              <div className="mt-14 grid gap-10 sm:grid-cols-3">
                {home.pillars.map((p) => (
                  <div key={p.title}>
                    <div className="rule" />
                    <h3 className="mt-5 font-display text-2xl">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-mist">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CATEGORIES */}
      <section id="portfolio" className="border-t border-line py-24 lg:py-32">
        <Container>
          <SectionHead
            kicker="The portfolio"
            title="Four doors. All of them closed to the public."
            body="Each category is handled with the same discretion. Browse the type of asset you are considering, then tell us what you are looking for — the specifics are shared privately."
          />
          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {CATEGORY_TILES.map((t, i) => {
              const c = CATEGORIES[t.key];
              return (
                <Link
                  key={t.key}
                  href={`/${c.slug}`}
                  className={`group relative overflow-hidden ${i % 2 === 1 ? "lg:mt-12" : ""}`}
                  style={{ aspectRatio: "3 / 4" }}
                >
                  <Image
                    src={t.image}
                    alt={c.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/10" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <div className="text-[0.6rem] uppercase tracking-[0.3em] text-accent">0{i + 1}</div>
                    <h3 className="mt-2 font-display text-3xl font-light">{c.label}</h3>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-mist opacity-0 transition-all duration-500 group-hover:opacity-100">
                      {t.blurb}
                    </p>
                    <div className="mt-4 h-px w-10 bg-accent transition-all duration-500 group-hover:w-20" />
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* FEATURED OPPORTUNITIES */}
      {featured.length > 0 && (
        <section className="border-t border-line bg-navy-900/40 py-24 lg:py-32">
          <Container>
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <SectionHead
                kicker="Current opportunities"
                title="A glimpse. Never the whole picture."
                body="We describe each opportunity enough for you to know whether it is for you. Addresses, photography and financials follow once we have spoken."
              />
              <Link href="/residential" className="btn btn-ghost shrink-0">
                <span>View all</span>
              </Link>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((p, i) => (
                <PropertyCard key={p.id} p={p} priority={i === 0} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* LOCATIONS */}
      <section className="border-t border-line py-24 lg:py-32">
        <Container>
          <SectionHead
            kicker="Where we work"
            title="Two home markets. A short list of others."
            body="Sotogrande and Marbella are where our relationships run deepest. Beyond them we work selectively, through partners we trust, in places where the best property never reaches a portal."
          />
          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {Object.entries(LOCATIONS).map(([slug, l], i) => (
              <Link
                key={slug}
                href={`/locations/${slug}`}
                className={`group relative overflow-hidden ${i < 2 ? "aspect-[16/10]" : "aspect-[16/8]"}`}
              >
                <Image
                  src={l.image}
                  alt={l.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/40 to-transparent" />
                <div className="absolute inset-y-0 left-0 flex max-w-md flex-col justify-end p-8 lg:p-10">
                  <div className="kicker">{l.country}</div>
                  <h3 className="mt-3 font-display text-4xl font-light">{l.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">{l.intro.split(". ")[0]}.</p>
                  <span className="mt-5 text-[0.62rem] uppercase tracking-[0.28em] text-accent transition-transform duration-500 group-hover:translate-x-1">
                    Explore {l.name} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* PROCESS */}
      <section className="relative overflow-hidden border-t border-line bg-navy-900 py-24 lg:py-32">
        <div className="grain absolute inset-0" />
        <Container className="relative">
          <SectionHead kicker="The process" title={home.processTitle} align="center" />
          <div className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {home.process.map((s) => (
              <div key={s.step} className="relative">
                <div className="font-display text-6xl font-light text-accent/40">{s.step}</div>
                <div className="hairline my-6" />
                <h3 className="font-display text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-t border-line py-24 lg:py-32">
        <Container>
          <SectionHead kicker="In their words" title="Clients who came by introduction." align="center" />
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {home.testimonials.map((t) => (
              <figure key={t.name} className="card p-9">
                <div className="font-display text-5xl leading-none text-accent">&ldquo;</div>
                <blockquote className="mt-2 font-display text-xl font-light leading-relaxed text-ivory/90">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 text-[0.66rem] uppercase tracking-[0.26em] text-mist">
                  {t.name} <span className="text-accent">·</span> {t.place}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
