import type { Metadata } from "next";
import { Container, CtaBand, JsonLd, PageHero } from "@/components/Section";
import { EnquiryForm } from "@/components/EnquiryForm";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent("consultancy");
  return {
    title: { absolute: c.seoTitle },
    description: c.seoDescription,
    alternates: { canonical: "/consultancy" },
    openGraph: { title: c.seoTitle, description: c.seoDescription, images: [{ url: c.image }] },
  };
}

export default async function ConsultancyPage() {
  const c = await getContent("consultancy");
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Real estate and hospitality consultancy",
          name: c.title,
          description: c.seoDescription,
          provider: { "@type": "Organization", name: "Thomson Calabria" },
          areaServed: ["Marbella", "Sotogrande", "Italy", "Dubai"],
        }}
      />
      <PageHero kicker={c.kicker} title={c.title} intro={c.intro} image={c.image} />

      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.services.map((s, i) => (
              <div key={s.title} className="border-t border-accent/50 pt-5">
                <div className="font-display text-lg text-accent">0{i + 1}</div>
                <h2 className="mt-1 font-display text-xl">{s.title}</h2>
                <p className="mt-2 text-[0.94rem] leading-relaxed text-mist">{s.body}</p>
              </div>
            ))}
          </div>
          {c.body.length > 0 && (
            <div className="mt-10 max-w-3xl space-y-4">
              {c.body.map((p, i) => (
                <p key={i} className="lede">{p}</p>
              ))}
              {c.author && <p className="text-[0.9rem] font-semibold text-ivory">— {c.author}</p>}
            </div>
          )}
        </Container>
      </section>

      <section className="light-alt py-12 lg:py-16" id="enquire">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="kicker">Book a consultation</div>
              <h2 className="display-md mt-3">Tell us what you are trying to achieve.</h2>
              <p className="mt-3 text-[0.94rem] leading-relaxed text-mist">
                A short, confidential conversation is usually the best place to start.
              </p>
            </div>
            <div className="lg:col-span-8">
              <EnquiryForm defaultInterest="consultancy" sourcePage="/consultancy" />
            </div>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
