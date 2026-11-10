import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Section";
import { alternates, isLang, type Lang } from "@/lib/i18n";

const TEXT: Record<Lang, { title: string; paras: string[] }> = {
  en: {
    title: "Privacy Policy",
    paras: [
      "Thomson Calabria SL (“we”) is the data controller for personal data submitted through this website. We process your name, contact details and the information you give us about your requirements solely to respond to your enquiry and, where you ask us to, to keep you informed of opportunities that match your brief.",
      "We never sell, rent or share your data with third parties for marketing. Your details may be shared with professional advisors (lawyers, notaries, financial institutions) only where necessary to progress a transaction you have asked us to assist with, and only with your knowledge.",
      "Data is stored on secure servers within the European Union. You may ask at any time to see, correct or delete the data we hold about you by writing to info@thomsoncalabria.com. We retain enquiry data for as long as needed to serve you and for a reasonable period thereafter to meet legal obligations.",
      "This website uses only strictly necessary cookies required to operate the site and, for administrators, to maintain a login session. No advertising or tracking cookies are set without consent.",
      "Under the GDPR and Spanish LOPDGDD you have the right to access, rectify, erase, restrict and port your data, and to object to processing. You may lodge a complaint with the Agencia Española de Protección de Datos (www.aepd.es).",
    ],
  },
  es: {
    title: "Política de privacidad",
    paras: [
      "Thomson Calabria SL («nosotros») es la responsable del tratamiento de los datos personales enviados a través de este sitio web. Tratamos su nombre, sus datos de contacto y la información que nos facilita sobre lo que busca únicamente para responder a su consulta y, si así nos lo pide, para informarle de oportunidades que encajen con su búsqueda.",
      "Nunca vendemos, alquilamos ni cedemos sus datos a terceros con fines comerciales. Sus datos solo podrán compartirse con asesores profesionales (abogados, notarios, entidades financieras) cuando sea necesario para avanzar en una operación en la que nos haya pedido ayuda, y siempre con su conocimiento.",
      "Los datos se almacenan en servidores seguros dentro de la Unión Europea. Puede solicitar en cualquier momento el acceso, la rectificación o la supresión de sus datos escribiendo a info@thomsoncalabria.com. Conservamos los datos de las consultas el tiempo necesario para atenderle y, después, durante un periodo razonable para cumplir nuestras obligaciones legales.",
      "Este sitio web solo utiliza cookies estrictamente necesarias para su funcionamiento y, en el caso de los administradores, para mantener la sesión iniciada. No se instalan cookies publicitarias ni de seguimiento sin su consentimiento.",
      "Conforme al RGPD y a la LOPDGDD, tiene derecho a acceder, rectificar, suprimir, limitar y portar sus datos, así como a oponerse a su tratamiento. Puede presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).",
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: l } = await params;
  const lang: Lang = isLang(l) ? l : "en";
  return { title: TEXT[lang].title, alternates: alternates(lang, "/privacy"), robots: { index: false } };
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
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
