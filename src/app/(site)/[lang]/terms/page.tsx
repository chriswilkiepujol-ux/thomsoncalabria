import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Section";
import { alternates, isLang, type Lang } from "@/lib/i18n";

const TEXT: Record<Lang, { title: string; paras: string[] }> = {
  en: {
    title: "Terms & Conditions",
    paras: [
      "This website is operated by Thomson Calabria SL. Information published here describes opportunities in general terms only; it does not constitute an offer, a valuation or professional advice, and no reliance should be placed on it without independent verification.",
      "Details of off-market properties are released solely at our discretion, to parties we are satisfied are principals or their mandated advisors, and subject to a confidentiality agreement. Any information so released remains confidential and may not be shared without our written consent.",
      "Prices are indicative, may be expressed in different currencies and are subject to change or withdrawal without notice. All measurements, areas and financial figures are approximate until verified in a formal process.",
      "Our engagement terms, including fees, are agreed in writing before any transaction. We do not pay or receive referral fees from unauthorised intermediaries.",
      "Content on this site is the property of Thomson Calabria SL or its licensors and may not be reproduced without permission. These terms are governed by Spanish law and the courts of Marbella.",
    ],
  },
  es: {
    title: "Términos y condiciones",
    paras: [
      "Este sitio web es propiedad de Thomson Calabria SL. La información publicada describe las oportunidades de forma general; no constituye una oferta, una valoración ni asesoramiento profesional, y no debe tomarse como base sin una verificación independiente.",
      "Los detalles de las propiedades off-market se facilitan únicamente a nuestra discreción, a partes que consideremos interesadas directas o asesores con mandato, y sujetos a un acuerdo de confidencialidad. Dicha información es confidencial y no puede compartirse sin nuestro consentimiento por escrito.",
      "Los precios son orientativos, pueden expresarse en distintas divisas y pueden cambiar o retirarse sin previo aviso. Todas las medidas, superficies y cifras financieras son aproximadas hasta su verificación formal.",
      "Nuestras condiciones de colaboración, incluidos los honorarios, se acuerdan por escrito antes de cualquier operación. No pagamos ni recibimos comisiones de intermediarios no autorizados.",
      "Los contenidos de este sitio son propiedad de Thomson Calabria SL o de sus licenciantes y no pueden reproducirse sin permiso. Estas condiciones se rigen por la legislación española y los tribunales de Marbella.",
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: l } = await params;
  const lang: Lang = isLang(l) ? l : "en";
  return { title: TEXT[lang].title, alternates: alternates(lang, "/terms"), robots: { index: false } };
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  if (!isLang(l)) notFound();
  const t = TEXT[l];
  return (
    <section className="pt-32 pb-12 lg:pt-36 lg:pb-16">
      <Container className="max-w-3xl">
        <div className="kicker">Legal</div>
        <h1 className="display-lg mt-3">{t.title}</h1>
        <div className="lede mt-10 space-y-6 text-base">
          {t.paras.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}
