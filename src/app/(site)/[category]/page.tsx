import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, CtaBand, JsonLd, PageHero, SectionHead } from "@/components/Section";
import { PropertyCard } from "@/components/PropertyCard";
import { EnquiryForm } from "@/components/EnquiryForm";
import { CATEGORIES, categoryFromSlug, getContent, getProperties, LOCATIONS } from "@/lib/content";

export const revalidate = 60;

export function generateStaticParams() {
  return Object.values(CATEGORIES).map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const key = categoryFromSlug(category);
  if (!key) return {};
  const c = await getContent(`category:${key}` as const);
  return {
    title: { absolute: c.seoTitle },
    description: c.seoDescription,
    alternates: { canonical: `/${category}` },
    openGraph: { title: c.seoTitle, description: c.seoDescription, images: [{ url: c.image }] },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const key = categoryFromSlug(category);
  if (!key) notFound();

  const [c, props] = await Promise.all([getContent(`category:${key}` as const), getProperties({ category: key })]);
  const cat = CATEGORIES[key];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: c.seoTitle,
          description: c.seoDescription,
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/${category}`,
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
                  Register your brief →
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
              kicker={`Current ${cat.nounPlural}`}
              title={
                props.length
                  ? key === "rental" ? "Available to book." : key === "residential" ? "Properties for sale." : "Opportunities we can discuss today."
                  : key === "rental" || key === "residential" ? "New properties coming soon." : "Opportunities are shared privately."
              }
              body={
                props.length
                  ? key === "rental"
                    ? "Contact us with your dates and we will confirm availability and rates."
                    : key === "residential"
                      ? "Some homes are listed in full; others are offered privately, with details shared after a short conversation."
                      : "Each listing is deliberately brief. Full details — location, photography, accounts — are released after a short conversation and a confidentiality agreement."
                  : "Tell us what you are looking for and we will let you know as soon as something suitable becomes available."
              }
            />
            <div className="flex flex-wrap gap-2 md:justify-end">
              {Object.entries(LOCATIONS).map(([slug, l]) => (
                <Link
                  key={slug}
                  href={`/locations/${slug}`}
                  className="border border-line px-3.5 py-1.5 text-[0.7rem] uppercase tracking-[0.12em] text-mist hover:border-accent hover:text-accent-2"
                >
                  {l.name}
                </Link>
              ))}
            </div>
          </div>

          {props.length > 0 && (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {props.map((p) => (
                <PropertyCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="light-alt py-12 lg:py-16" id="enquire">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="kicker">{key === "rental" ? "Book a stay" : "Register your brief"}</div>
              <h2 className="display-md mt-3">
                {key === "rental" ? "Tell us your dates." : "Tell us what you are looking for."}
              </h2>
              <p className="mt-3 text-[0.94rem] leading-relaxed text-mist">
                {key === "rental"
                  ? "Let us know when you would like to stay and how many guests, and we will confirm availability and rates personally."
                  : "If your brief is on file, you hear first — including about properties we do not advertise. Nothing is ever shared without your consent."}
              </p>
            </div>
            <div className="lg:col-span-8">
              <EnquiryForm defaultInterest={key} sourcePage={`/${category}`} />
            </div>
          </div>
        </Container>
      </section>

      <CtaBand title="Prefer to talk?" body="Call or email Linda directly. There is no switchboard and no sales team — just one conversation." />
    </>
  );
}
