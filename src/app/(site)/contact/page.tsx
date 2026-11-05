import type { Metadata } from "next";
import { Container, JsonLd } from "@/components/Section";
import { EnquiryForm } from "@/components/EnquiryForm";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Private Enquiry — Contact Linda Thomson",
  description:
    "Contact Thomson Calabria for off-market hotels, restaurants and residences in Sotogrande, Marbella, Italy and Dubai. Strictly confidential. Principals only.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settings = await getContent("settings");
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Private Enquiry — Thomson Calabria",
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
        }}
      />
      <section className="pt-40 pb-24 lg:pt-52">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <div className="kicker">Private enquiry</div>
              <h1 className="display-lg mt-5">One conversation is all it takes.</h1>
              <p className="lede mt-7">
                Tell us as much as you can — the type of asset, where, the budget and the timing. The more
                complete your brief, the faster we can match you with an owner. Everything is handled by
                Linda personally.
              </p>

              <div id="call" className="mt-12 space-y-8">
                <div>
                  <div className="text-[0.6rem] uppercase tracking-[0.26em] text-mist-2">Telephone</div>
                  <a href={`tel:${settings.phone}`} className="link-underline mt-2 inline-block font-display text-2xl">
                    {settings.phoneDisplay}
                  </a>
                </div>
                <div>
                  <div className="text-[0.6rem] uppercase tracking-[0.26em] text-mist-2">WhatsApp</div>
                  <a
                    href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent("Hello Linda, I would like to discuss an off-market opportunity.")}`}
                    target="_blank"
                    rel="noopener"
                    className="link-underline mt-2 inline-block font-display text-2xl"
                  >
                    Message on WhatsApp
                  </a>
                </div>
                <div>
                  <div className="text-[0.6rem] uppercase tracking-[0.26em] text-mist-2">Email</div>
                  <a href={`mailto:${settings.email}`} className="link-underline mt-2 inline-block font-display text-2xl">
                    {settings.email}
                  </a>
                </div>
                <div>
                  <div className="text-[0.6rem] uppercase tracking-[0.26em] text-mist-2">Offices</div>
                  <div className="mt-2 font-display text-2xl">{settings.address}</div>
                  <p className="mt-2 text-sm text-mist">Meetings by appointment in Marbella, Sotogrande, London and Milan.</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="card p-8 lg:p-12">
                <EnquiryForm sourcePage="/contact" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
