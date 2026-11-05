import type { Metadata } from "next";
import Image from "next/image";
import { Container, CtaBand, JsonLd } from "@/components/Section";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Linda Thomson — Founder",
  description:
    "Linda Thomson founded LT Properties Marbella in 2009 and now leads Thomson & Calabria, an international realty and consultancy practice specialising in off-market hotels, restaurants and residences.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const [about, home, settings] = await Promise.all([getContent("about"), getContent("home"), getContent("settings")]);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Linda Thomson",
          jobTitle: "Founder, Thomson & Calabria",
          image: `${process.env.NEXT_PUBLIC_SITE_URL}${about.photo}`,
          worksFor: { "@type": "Organization", name: "Thomson & Calabria" },
          email: settings.email,
          telephone: settings.phone,
        }}
      />
      <section className="pt-40 pb-24 lg:pt-52">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image src={about.photo} alt="Linda Thomson" fill priority sizes="(max-width:1024px) 100vw, 40vw" className="object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <div className="kicker">Founder</div>
                  <div className="mt-2 font-display text-3xl">Linda Thomson</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="kicker">{about.kicker}</div>
              <h1 className="display-lg mt-5">{about.title}</h1>
              <div className="mt-10 space-y-6">
                {about.body.map((p, i) => (
                  <p key={i} className="lede text-[1.1rem]">{p}</p>
                ))}
              </div>
              <blockquote className="mt-14 border-l border-accent pl-8 font-display text-3xl font-light italic leading-snug text-ivory/90">
                &ldquo;{about.quote}&rdquo;
              </blockquote>
              <div className="mt-12 flex flex-col gap-3 text-sm text-mist">
                <a href={`mailto:${settings.email}`} className="link-underline w-fit">{settings.email}</a>
                <a href={`tel:${settings.phone}`} className="link-underline w-fit">{settings.phoneDisplay}</a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-navy-900/40 py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="kicker">From LT Properties Marbella</div>
              <h2 className="display-md mt-4">Same relationships. A wider horizon.</h2>
            </div>
            <div className="lg:col-span-8">
              <p className="lede">
                LT Properties Marbella built its reputation on the Golden Mile, in Puente Romano and the Marbella Club,
                with holiday rentals and sales that were always handled personally. Thomson &amp; Calabria carries that
                work forward with a sharper focus — exclusively off-market opportunities, three asset classes, and a
                small number of international destinations — under the same hands and the same standards.
              </p>
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {home.testimonials.map((t) => (
                  <figure key={t.name} className="card p-7">
                    <blockquote className="font-display text-lg font-light leading-relaxed text-ivory/90">&ldquo;{t.quote}&rdquo;</blockquote>
                    <figcaption className="mt-6 text-[0.62rem] uppercase tracking-[0.26em] text-mist">
                      {t.name} <span className="text-accent">·</span> {t.place}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
