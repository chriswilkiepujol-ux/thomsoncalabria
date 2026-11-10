import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container, CtaBand, JsonLd } from "@/components/Section";
import { getContent } from "@/lib/content";
import { alternates, dict, isLang, type Lang } from "@/lib/i18n";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: l } = await params;
  const lang: Lang = isLang(l) ? l : "en";
  return lang === "es"
    ? {
        title: "Nosotros — Linda Thomson",
        description:
          "Linda Thomson fundó LT Properties Marbella en 2009. Thomson Calabria se centra hoy en la venta off-market de hoteles y restaurantes y en la consultoría hotelera.",
        alternates: alternates(lang, "/about"),
      }
    : {
        title: "About — Linda Thomson",
        description:
          "Linda Thomson founded LT Properties Marbella in 2009. Thomson Calabria today focuses on off-market hotel and restaurant sales and hospitality consultancy.",
        alternates: alternates(lang, "/about"),
      };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  if (!isLang(l)) notFound();
  const lang = l;
  const t = dict(lang).about;
  const [about, home, settings] = await Promise.all([getContent("about", lang), getContent("home", lang), getContent("settings")]);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Linda Thomson",
          jobTitle: "Founder, Thomson Calabria",
          image: about.photo,
          worksFor: { "@type": "Organization", name: "Thomson Calabria" },
          email: settings.email,
          telephone: settings.phone,
        }}
      />
      <section className="pt-32 pb-12 lg:pt-36 lg:pb-16">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image src={about.photo} alt="Linda Thomson" fill priority sizes="(max-width:1024px) 100vw, 40vw" className="object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                <div className="dark absolute inset-x-0 bottom-0 p-8">
                  <div className="kicker">{t.founder}</div>
                  <div className="mt-2 font-display text-3xl">Linda Thomson</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="kicker">{about.kicker}</div>
              <h1 className="display-lg mt-3">{about.title}</h1>
              <div className="mt-10 space-y-6">
                {about.body.map((p, i) => (
                  <p key={i} className="lede text-[1.1rem]">{p}</p>
                ))}
              </div>
              <blockquote className="mt-8 border-l border-accent pl-8 font-display text-2xl italic leading-snug text-ivory/90">
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

      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="kicker">{t.fromLt}</div>
              <h2 className="display-md mt-4">{t.fromLtTitle}</h2>
            </div>
            <div className="lg:col-span-8">
              <p className="lede">{t.fromLtBody}</p>
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {home.testimonials.map((q) => (
                  <figure key={q.name} className="card p-7">
                    <blockquote className="font-display text-lg leading-relaxed text-ivory/90">&ldquo;{q.quote}&rdquo;</blockquote>
                    <figcaption className="mt-6 text-[0.7rem] uppercase tracking-[0.12em] text-mist">
                      {q.name} <span className="text-accent">·</span> {q.place}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}
