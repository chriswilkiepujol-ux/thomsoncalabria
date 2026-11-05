"use client";

import { useActionState, useState } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/actions/enquiry";

const LOCS = ["Sotogrande", "Marbella", "Italy / Capri", "Dubai", "Elsewhere"];

export function EnquiryForm({
  propertyRef,
  sourcePage,
  defaultInterest,
  compact = false,
}: {
  propertyRef?: string;
  sourcePage?: string;
  defaultInterest?: string;
  compact?: boolean;
}) {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, null);
  const [buyerType, setBuyerType] = useState("");

  if (state?.ok) {
    return (
      <div className="card p-10 text-center">
        <div className="kicker">Received</div>
        <h3 className="display-md mt-4">Thank you. We will be in touch shortly.</h3>
        <p className="lede mt-4">
          Linda reads every enquiry personally and replies within one working day. If your
          matter is urgent, please call us directly.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-8">
      <input type="text" name="company_website" className="hidden" tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="property_ref" value={propertyRef ?? ""} />
      <input type="hidden" name="source_page" value={sourcePage ?? ""} />

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label className="flabel" htmlFor="name">Name</label>
          <input id="name" name="name" required className="field" placeholder="Your full name" />
        </div>
        <div>
          <label className="flabel" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className="field" placeholder="name@domain.com" />
        </div>
        <div>
          <label className="flabel" htmlFor="phone">Telephone (with country code)</label>
          <input id="phone" name="phone" className="field" placeholder="+44 …" />
        </div>
        <div>
          <label className="flabel" htmlFor="buyer_type">I am</label>
          <select
            id="buyer_type"
            name="buyer_type"
            className="field"
            value={buyerType}
            onChange={(e) => setBuyerType(e.target.value)}
          >
            <option value="">Select…</option>
            <option>A private buyer</option>
            <option>An investor</option>
            <option>A family office or fund</option>
            <option>A hotel or restaurant operator</option>
            <option>An owner considering a discreet sale</option>
            <option>Looking for a luxury rental</option>
            <option>An agent or intermediary</option>
          </select>
          {buyerType === "An agent or intermediary" && (
            <p className="mt-2 text-xs leading-relaxed text-accent-2/80">
              We work directly with principals. If you are mandated by a buyer, please tell us who
              you represent and we will be glad to speak.
            </p>
          )}
        </div>
      </div>

      {!compact && (
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <label className="flabel" htmlFor="interest">Asset type</label>
            <select id="interest" name="interest" className="field" defaultValue={defaultInterest ?? ""}>
              <option value="">Select…</option>
              <option value="hotel">Hotel or resort</option>
              <option value="restaurant">Restaurant or venue</option>
              <option value="residential">Villa, penthouse or estate</option>
              <option value="rental">Luxury short-term rental</option>
              <option value="consultancy">Consultancy / advice</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="flabel" htmlFor="budget">Budget</label>
            <select id="budget" name="budget" className="field" defaultValue="">
              <option value="">Select…</option>
              <option>Under €2 million</option>
              <option>€2 – 5 million</option>
              <option>€5 – 10 million</option>
              <option>€10 – 25 million</option>
              <option>€25 – 50 million</option>
              <option>Over €50 million</option>
              <option>Rental budget (per week)</option>
            </select>
          </div>
          <div>
            <label className="flabel" htmlFor="timeframe">Timeframe</label>
            <select id="timeframe" name="timeframe" className="field" defaultValue="">
              <option value="">Select…</option>
              <option>Immediately</option>
              <option>Within 3 months</option>
              <option>Within 12 months</option>
              <option>Exploring options</option>
            </select>
          </div>
        </div>
      )}

      {!compact && (
        <div>
          <div className="flabel">Locations of interest</div>
          <div className="mt-3 flex flex-wrap gap-3">
            {LOCS.map((l) => (
              <label
                key={l}
                className="cursor-pointer border border-line px-4 py-2 text-xs tracking-[0.18em] uppercase text-ivory/80 transition has-[:checked]:border-accent has-[:checked]:bg-accent-soft has-[:checked]:text-accent-2"
              >
                <input type="checkbox" name="locations" value={l} className="sr-only" />
                {l}
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="flabel" htmlFor="message">
          Tell us about what you are looking for
        </label>
        <textarea
          id="message"
          name="message"
          rows={compact ? 3 : 5}
          className="field resize-none"
          placeholder="Asset type, must-haves, how you intend to hold it, anything that helps us match you to the right owner."
        />
      </div>

      {state?.error && <p className="text-sm text-red-300">{state.error}</p>}

      <div className={`flex flex-col gap-5 ${compact ? "" : "md:flex-row md:items-center md:justify-between"}`}>
        <p className="max-w-md text-xs leading-relaxed text-mist-2">
          Strictly confidential. Your details are never shared with third parties or added to a
          marketing list. By sending, you agree to our privacy policy.
        </p>
        <button type="submit" disabled={pending} className={`btn btn-solid disabled:opacity-60 ${compact ? "justify-center" : ""}`}>
          <span>{pending ? "Sending…" : "Send private enquiry"}</span>
        </button>
      </div>
    </form>
  );
}
