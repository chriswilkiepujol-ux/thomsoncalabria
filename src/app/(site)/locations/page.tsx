import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, CtaBand, PageHero } from "@/components/Section";
import { LOCATIONS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Locations — Sotogrande, Marbella, Italy, Dubai",
  description:
    "Where Thomson Calabria sources off-market hotels, restaurants and residences: Sotogrande, Marbella's Golden Mile, Capri and the Amalfi Coast, Dubai.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      <PageHero
        kicker="Locations"
        title="The addresses that matter, and the people who hold them."
        intro="We are deliberately narrow. Two home markets where we know every street, and a short list of international destinations served through partners we have worked with for years."
        image="https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="light py-24">
        <Container>
          <div className="space-y-6">
            {Object.entries(LOCATIONS).map(([slug, l], i) => (
              <Link
                key={slug}
                href={`/locations/${slug}`}
                className="group grid items-stretch gap-0 overflow-hidden border border-line md:grid-cols-12"
              >
                <div className={`relative aspect-[16/9] md:col-span-5 md:aspect-auto ${i % 2 ? "md:order-2" : ""}`}>
                  <Image src={l.image} alt={l.name} fill sizes="50vw" className="object-cover transition-transform duration-[1.6s] group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-center p-10 md:col-span-7 lg:p-14">
                  <div className="kicker">{l.kicker}</div>
                  <h2 className="mt-4 font-display text-4xl font-light">{l.title}</h2>
                  <p className="lede mt-5">{l.intro}</p>
                  <span className="mt-6 text-[0.7rem] uppercase tracking-[0.28em] text-accent">Explore {l.name} →</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
