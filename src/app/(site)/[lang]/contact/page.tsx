import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, JsonLd } from "@/components/Section";
import { EnquiryForm } from "@/components/EnquiryForm";
import { getContent } from "@/lib/content";
import { alternates, dict, href, isLang, type Lang } from "@/lib/i18n";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: l } = await params;
  const lang: Lang = isLang(l) ? l : "en";
  return lang === "es"
    ? {
        title: "Contacto — Consulta privada",
        description:
          "Contacte con Thomson Calabria sobre hoteles y restaurantes off-market, consultoría hotelera, villas en venta o alquileres de lujo en el Marbella Club.",
        alternates: alternates(lang, "/contact"),
      }
    : {
        title: "Contact — Private Enquiry",
        description:
          "Contact Thomson Calabria about off-market hotels and restaurants, hospitality consultancy, villas for sale or luxury rentals at the Marbella Club.",
        alternates: alternates(lang, "/contact"),
      };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  if (!isLang(l)) notFound();
  const lang = l;
  const t = dict(lang).contact;
  const settings = await getContent("settings");
  const label = "text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-mist-2";
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Thomson Calabria",
          inLanguage: lang,
          url: `${process.env.NEXT_PUBLIC_SITE_URL}${href(lang, "/contact")}`,
        }}
      />
      <section className="pt-32 pb-12 lg:pt-36 lg:pb-16">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <div className="kicker">{t.kicker}</div>
              <h1 className="display-lg mt-3">{t.title}</h1>
              <p className="lede mt-6">{t.intro}</p>

              <div id="call" className="mt-10 space-y-7">
                <div>
                  <div className={label}>{t.telephone}</div>
                  <a href={`tel:${settings.phone}`} className="link-underline mt-2 inline-block font-display text-2xl">
                    {settings.phoneDisplay}
                  </a>
                </div>
                <div>
                  <div className={label}>{t.whatsapp}</div>
                  <a
                    href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(t.whatsappText)}`}
                    target="_blank"
                    rel="noopener"
                    className="link-underline mt-2 inline-block font-display text-2xl"
                  >
                    {t.whatsappCta}
                  </a>
                </div>
                <div>
                  <div className={label}>{t.email}</div>
                  <a href={`mailto:${settings.email}`} className="link-underline mt-2 inline-block font-display text-2xl">
                    {settings.email}
                  </a>
                </div>
                <div>
                  <div className={label}>{t.offices}</div>
                  <div className="mt-2 font-display text-2xl">{settings.address}</div>
                  <p className="mt-2 text-sm text-mist">{t.meetings}</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="card p-8 lg:p-12">
                <EnquiryForm lang={lang} sourcePage={href(lang, "/contact")} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
