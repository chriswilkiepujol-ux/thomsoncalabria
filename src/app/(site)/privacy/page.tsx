import type { Metadata } from "next";
import { Container } from "@/components/Section";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" }, robots: { index: false } };

export default function PrivacyPage() {
  return (
    <section className="pt-28 pb-12 lg:pt-32 lg:pb-16">
      <Container className="max-w-3xl">
        <div className="kicker">Legal</div>
        <h1 className="display-lg mt-3">Privacy Policy</h1>
        <div className="lede mt-10 space-y-6 text-base">
          <p>Thomson Calabria SL (&ldquo;we&rdquo;) is the data controller for personal data submitted through this website. We process your name, contact details and the information you give us about your property requirements solely to respond to your enquiry and, where you ask us to, to keep you informed of opportunities that match your brief.</p>
          <p>We never sell, rent or share your data with third parties for marketing. Your details may be shared with professional advisors (lawyers, notaries, financial institutions) only where necessary to progress a transaction you have asked us to assist with, and only with your knowledge.</p>
          <p>Data is stored on secure servers within the European Union. You may ask at any time to see, correct or delete the data we hold about you by writing to info@thomsoncalabria.com. We retain enquiry data for as long as needed to serve you and for a reasonable period thereafter to meet legal obligations.</p>
          <p>This website uses only strictly necessary cookies required to operate the site and, for administrators, to maintain a login session. No advertising or tracking cookies are set without consent.</p>
          <p>Under the GDPR and Spanish LOPDGDD you have the right to access, rectify, erase, restrict and port your data, and to object to processing. You may lodge a complaint with the Agencia Española de Protección de Datos (www.aepd.es).</p>
        </div>
      </Container>
    </section>
  );
}
