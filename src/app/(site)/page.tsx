import Image from "next/image";
import Link from "next/link";
import { Container, CtaBand, SectionHead } from "@/components/Section";
import { PropertyCard } from "@/components/PropertyCard";
import { PostCard } from "@/components/PostCard";
import { getPosts } from "@/lib/blog";
import { getContent, getProperties, LOCATIONS, CATEGORIES } from "@/lib/content";

export const revalidate = 60;

const CATEGORY_TILES = [
  {
    key: "hotel",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80",
    blurb: "Boutique hotels and resorts, trading or for conversion.",
  },
  {
    key: "restaurant",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
    blurb: "Beach clubs, fine dining and licensed venues.",
  },
  {
    key: "residential",
    image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=1000&q=80",
    blurb: "Villas, penthouses and estates that rarely trade.",
  },
  {
    key: "rental",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
    blurb: "Short stays in Puente Romano, Marbella Club and Sotogrande.",
  },
] as const;

export default async function HomePage() {
  const [home, featured, posts] = await Promise.all([
    getContent("home"),
    getProperties({ featured: true, limit: 3 }),
    getPosts({ limit: 3 }),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="dark relative flex min-h-[600px] items-end overflow-hidden bg-navy-950 lg:min-h-[680px]">
        <Image src={home.heroImage} alt="" fill priority sizes="100vw" className="slowzoom object-cover" />
        <div className="veil absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-navy-950/25 to-transparent" />
        <Container className="hero-text relative z-10 pb-14 pt-32 lg:pb-20">
          <div className="max-w-2xl">
            <div className="kicker rise">{home.heroKicker}</div>
            <h1 className="display-xl rise rise-2 mt-4">{home.heroTitle}</h1>
            <p className="lede rise rise-3 mt-5 text-[1.12rem]">{home.heroSubtitle}</p>
            <div className="rise rise-4 mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-solid">
                Register your interest
              </Link>
              <Link href="#portfolio" className="btn btn-ghost">
                What we handle
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

      {/* WHAT WE HANDLE */}
      <section id="portfolio" className="light-alt scroll-mt-16 py-14 lg:py-20">
        <Container>
          <SectionHead
            kicker="What we handle"
            title="Four ways we can help."
          />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {CATEGORY_TILES.map((t) => {
              const c = CATEGORIES[t.key];
              return (
                <Link key={t.key} href={`/${c.slug}`} className="group relative block aspect-[3/4] overflow-hidden sm:aspect-[4/5]">
                  <Image
                    src={t.image}
                    alt={c.label}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/30 to-transparent" />
                  <div className="dark absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <h3 className="font-display text-xl sm:text-2xl">{c.label}</h3>
                    <p className="mt-1 hidden text-[0.9rem] leading-snug text-mist sm:block">{t.blurb}</p>
                    <span className="mt-2 inline-block text-[0.8rem] font-semibold text-accent-2 sm:mt-3">
                      View {c.label.toLowerCase()} →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          <Link
            href="/consultancy"
            className="group mt-4 flex flex-col gap-2 border border-line bg-white/60 p-5 transition-colors hover:border-accent sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <span className="font-display text-xl">Consultancy</span>
              <span className="mt-1 block text-[0.94rem] text-mist sm:ml-3 sm:mt-0 sm:inline">
                Advice for owners, investors and operators — acquisition, valuation and hospitality.
              </span>
            </div>
            <span className="text-[0.8rem] font-semibold text-accent">Find out more →</span>
          </Link>
        </Container>
      </section>

      {/* CURRENT OPPORTUNITIES */}
      {featured.length > 0 && (
        <section className="py-14 lg:py-20">
          <Container>
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <SectionHead
                kicker="Current opportunities"
                title="Featured properties."
                body="Homes for sale and rent, and a selection of private opportunities — off-market details are shared once we have spoken."
              />
              <Link href="/residential" className="btn btn-ghost btn-sm self-start md:self-auto">
                View all
              </Link>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((p, i) => (
                <PropertyCard key={p.id} p={p} priority={i === 0} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* WHERE WE WORK */}
      <section className="dark bg-navy-950 py-14 lg:py-20">
        <Container>
          <SectionHead
            kicker="Where we work"
            title="Sotogrande and Marbella, and a few select places beyond."
          />
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {Object.entries(LOCATIONS).map(([slug, l]) => (
              <Link key={slug} href={`/locations/${slug}`} className="group relative block aspect-[3/4] overflow-hidden">
                <Image
                  src={l.image}
                  alt={l.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 lg:p-5">
                  <div className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-accent-2">{l.country}</div>
                  <h3 className="mt-1 font-display text-2xl">{l.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-14 lg:py-20">
        <Container>
          <SectionHead kicker="How it works" title={home.processTitle} />
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

      {/* BLOG */}
      {posts.length > 0 && (
        <section className="py-14 lg:py-20">
          <Container>
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <SectionHead kicker="From the blog" title="Out and about, and property news." />
              <Link href="/blog" className="btn btn-ghost btn-sm self-start md:self-auto">
                All posts
              </Link>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.id} p={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* TESTIMONIALS */}
      <section className="light-alt py-14 lg:py-20">
        <Container>
          <SectionHead kicker="Client words" title="Trusted on the Golden Mile since 2009." />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {home.testimonials.map((t) => (
              <figure key={t.name} className="card p-6">
                <blockquote className="font-display text-lg leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-[0.8rem] font-semibold text-mist">
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
