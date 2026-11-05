import type { Metadata } from "next";
import { Container } from "@/components/Section";

export const metadata: Metadata = { title: "Terms & Conditions", alternates: { canonical: "/terms" }, robots: { index: false } };

export default function TermsPage() {
  return (
    <section className="pt-40 pb-24 lg:pt-52">
      <Container className="max-w-3xl">
        <div className="kicker">Legal</div>
        <h1 className="display-lg mt-5">Terms &amp; Conditions</h1>
        <div className="lede mt-10 space-y-6 text-base">
          <p>This website is operated by Thomson &amp; Calabria SL. Information published here describes opportunities in general terms only; it does not constitute an offer, a valuation or professional advice, and no reliance should be placed on it without independent verification.</p>
          <p>Details of off-market properties are released solely at our discretion, to parties we are satisfied are principals or their mandated advisors, and subject to a confidentiality agreement. Any information so released remains confidential and may not be shared without our written consent.</p>
          <p>Guide prices are indicative, may be expressed in different currencies and are subject to change or withdrawal without notice. All measurements, areas and financial figures are approximate until verified in a formal process.</p>
          <p>Our engagement terms, including fees, are agreed in writing before any transaction. We do not pay or receive referral fees from unauthorised intermediaries.</p>
          <p>Content on this site is the property of Thomson &amp; Calabria SL or its licensors and may not be reproduced without permission. These terms are governed by Spanish law and the courts of Marbella.</p>
        </div>
      </Container>
    </section>
  );
}
