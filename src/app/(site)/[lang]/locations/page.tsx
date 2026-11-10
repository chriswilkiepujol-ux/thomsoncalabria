import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, CtaBand, PageHero } from "@/components/Section";
import { getContent, LOCATIONS } from "@/lib/content";
import { alternates, dict, href, isLang, type Lang } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: l } = await params;
  const lang: Lang = isLang(l) ? l : "en";
  return lang === "es"
    ? {
        title: "Ubicaciones — Sotogrande, Marbella, Italia, Dubái",
        description: "Dónde trabaja Thomson Calabria: Sotogrande, la Milla de Oro de Marbella, Capri y la Costa Amalfitana, y Dubái.",
        alternates: alternates(lang, "/locations"),
      }
    : {
        title: "Locations — Sotogrande, Marbella, Italy, Dubai",
        description: "Where Thomson Calabria works: Sotogrande, Marbella's Golden Mile, Capri and the Amalfi Coast, and Dubai.",
        alternates: alternates(lang, "/locations"),
      };
}

export default async function LocationsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  if (!isLang(l)) notFound();
  const lang = l;
  const t = dict(lang).locations;
  const locs = await Promise.all(
    Object.keys(LOCATIONS).map(async (slug) => [slug, await getContent(`location:${slug}` as "location:marbella", lang)] as const)
  );
  return (
    <>
      <PageHero
        kicker={t.indexKicker}
        title={t.indexTitle}
        intro={t.indexIntro}
        image="https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="py-12 lg:py-16">
        <Container>
          <div className="space-y-6">
            {locs.map(([slug, c], i) => (
              <Link
                key={slug}
                href={href(lang, `/locations/${slug}`)}
                className="group grid items-stretch gap-0 overflow-hidden border border-line md:grid-cols-12"
              >
                <div className={`relative aspect-[16/9] md:col-span-5 md:aspect-auto ${i % 2 ? "md:order-2" : ""}`}>
                  <Image src={c.image} alt={c.name} fill sizes="50vw" className="object-cover transition-transform duration-[1.6s] group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-center p-8 md:col-span-7 lg:p-12">
                  <div className="kicker">{c.kicker}</div>
                  <h2 className="mt-3 font-display text-3xl">{c.title}</h2>
                  <p className="lede mt-4">{c.intro}</p>
                  <span className="mt-5 text-[0.8rem] font-semibold text-accent">
                    {t.explore} {c.name} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}
