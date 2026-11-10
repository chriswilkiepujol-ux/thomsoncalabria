"use client";

import { useActionState, useState } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/actions/enquiry";
import { DICTS, type Lang } from "@/lib/i18n";

const EN = DICTS.en.form;

export function EnquiryForm({
  lang,
  propertyRef,
  sourcePage,
  defaultInterest,
  compact = false,
  messagePlaceholder,
  submitLabel,
}: {
  lang: Lang;
  propertyRef?: string;
  sourcePage?: string;
  defaultInterest?: string;
  compact?: boolean;
  messagePlaceholder?: string;
  submitLabel?: string;
}) {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, null);
  const [buyerType, setBuyerType] = useState("");
  const t = DICTS[lang].form;

  if (state?.ok) {
    return (
      <div className="card p-10 text-center">
        <div className="kicker">{t.received}</div>
        <h3 className="display-md mt-4">{t.thanksTitle}</h3>
        <p className="lede mt-4">{t.thanksBody}</p>
      </div>
    );
  }

  // Values are always stored in English so the admin list stays consistent; labels follow the page language.
  const options = (values: readonly string[], labels: readonly string[]) =>
    values.map((v, i) => (
      <option key={v} value={v}>
        {labels[i]}
      </option>
    ));

  return (
    <form action={action} className="space-y-8">
      <input type="text" name="company_website" className="hidden" tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="property_ref" value={propertyRef ?? ""} />
      <input type="hidden" name="source_page" value={sourcePage ?? ""} />
      <input type="hidden" name="lang" value={lang} />

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label className="flabel" htmlFor="name">{t.name}</label>
          <input id="name" name="name" required className="field" placeholder={t.namePh} />
        </div>
        <div>
          <label className="flabel" htmlFor="email">{t.email}</label>
          <input id="email" name="email" type="email" required className="field" placeholder="name@domain.com" />
        </div>
        <div>
          <label className="flabel" htmlFor="phone">{t.phone}</label>
          <input id="phone" name="phone" className="field" placeholder="+34 …" />
        </div>
        <div>
          <label className="flabel" htmlFor="buyer_type">{t.iAm}</label>
          <select id="buyer_type" name="buyer_type" className="field" value={buyerType} onChange={(e) => setBuyerType(e.target.value)}>
            <option value="">{t.select}</option>
            {options(EN.buyerTypes, t.buyerTypes)}
          </select>
          {buyerType === EN.buyerTypes[6] && <p className="mt-2 text-xs leading-relaxed text-accent-2/80">{t.agentNote}</p>}
        </div>
      </div>

      {!compact && (
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <label className="flabel" htmlFor="interest">{t.assetType}</label>
            <select id="interest" name="interest" className="field" defaultValue={defaultInterest ?? ""}>
              <option value="">{t.select}</option>
              {(Object.keys(t.assets) as (keyof typeof t.assets)[]).map((k) => (
                <option key={k} value={k}>
                  {t.assets[k]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="flabel" htmlFor="budget">{t.budget}</label>
            <select id="budget" name="budget" className="field" defaultValue="">
              <option value="">{t.select}</option>
              {options(EN.budgets, t.budgets)}
            </select>
          </div>
          <div>
            <label className="flabel" htmlFor="timeframe">{t.timeframe}</label>
            <select id="timeframe" name="timeframe" className="field" defaultValue="">
              <option value="">{t.select}</option>
              {options(EN.timeframes, t.timeframes)}
            </select>
          </div>
        </div>
      )}

      {!compact && (
        <div>
          <div className="flabel">{t.locations}</div>
          <div className="mt-3 flex flex-wrap gap-3">
            {EN.locationOptions.map((v, i) => (
              <label
                key={v}
                className="cursor-pointer border border-line px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] text-ivory/80 transition has-[:checked]:border-accent has-[:checked]:bg-accent-soft has-[:checked]:text-accent-2"
              >
                <input type="checkbox" name="locations" value={v} className="sr-only" />
                {t.locationOptions[i]}
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="flabel" htmlFor="message">{t.message}</label>
        <textarea id="message" name="message" rows={compact ? 3 : 5} className="field resize-none" placeholder={messagePlaceholder ?? t.messagePh} />
      </div>

      {state?.error && <p className="text-sm text-red-700">{state.error}</p>}

      <div className={`flex flex-col gap-5 ${compact ? "" : "md:flex-row md:items-center md:justify-between"}`}>
        <p className="max-w-md text-xs leading-relaxed text-mist-2">{t.privacy}</p>
        <button type="submit" disabled={pending} className={`btn btn-solid disabled:opacity-60 ${compact ? "justify-center" : ""}`}>
          <span>{pending ? t.sending : submitLabel ?? t.send}</span>
        </button>
      </div>
    </form>
  );
}
