import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, CtaBand, JsonLd, PageHero, SectionHead } from "@/components/Section";
import { PropertyCard } from "@/components/PropertyCard";
import { EnquiryForm } from "@/components/EnquiryForm";
import { CATEGORIES, getContent, getProperties, LOCATIONS } from "@/lib/content";

export const revalidate = 60;

export function generateStaticParams() {
  return Object.keys(LOCATIONS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!LOCATIONS[slug]) return {};
  const l = await getContent(`location:${slug}` as "location:marbella");
  return {
    title: { absolute: l.seoTitle },
    description: l.seoDescription,
    alternates: { canonical: `/locations/${slug}` },
    openGraph: { title: l.seoTitle, description: l.seoDescription, images: [{ url: l.image }] },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!LOCATIONS[slug]) notFound();
  const [l, props] = await Promise.all([
    getContent(`location:${slug}` as "location:marbella"),
    getProperties({ location: slug }),
  ]);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Place",
          name: l.name,
          description: l.seoDescription,
          address: { "@type": "PostalAddress", addressCountry: l.country },
        }}
      />
      <PageHero kicker={l.kicker} title={l.title} intro={l.intro} image={l.image} />

      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="kicker">About {l.name}</div>
              <div className="mt-6 space-y-3">
                {Object.values(CATEGORIES).map((c) => (
                  <Link key={c.slug} href={`/${c.slug}`} className="link-underline block text-sm text-ivory/80">
                    {c.label} in {l.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="lg:col-span-8">
              {l.body.map((p, i) => (
                <p key={i} className="lede mb-6 text-[1.1rem]">{p}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-12 lg:py-16">
        <Container>
          <SectionHead
            kicker={`${l.name} · Opportunities`}
            title={props.length ? `Currently in ${l.name}.` : `What we are handling in ${l.name} is shared privately.`}
            body={
              props.length
                ? "A brief outline of each. Full details after we have spoken."
                : "Register your brief below and we will let you know, in confidence, when something matching it becomes available."
            }
          />
          {props.length > 0 && (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {props.map((p) => (
                <PropertyCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="light-alt py-12 lg:py-16">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="kicker">Private enquiry</div>
              <h2 className="display-md mt-4">Looking in {l.name}?</h2>
              <p className="mt-5 text-sm leading-relaxed text-mist">
                Tell us the type of asset, the budget and the timing. We will tell you, candidly,
                what is realistic and what we can bring to the table.
              </p>
            </div>
            <div className="lg:col-span-8">
              <EnquiryForm sourcePage={`/locations/${slug}`} />
            </div>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
