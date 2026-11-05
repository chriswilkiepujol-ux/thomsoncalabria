"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { saveProperty, deleteProperty } from "@/app/admin/actions";
import { CATEGORIES, LOCATIONS, type KeyFact, type Property } from "@/lib/content";
import { ImageField } from "./ImageField";

export function PropertyForm({ property }: { property: Property | null }) {
  const [facts, setFacts] = useState<KeyFact[]>(property?.key_facts ?? [{ label: "", value: "" }]);
  const [offMarket, setOffMarket] = useState<boolean>(property?.off_market ?? false);
  const [gallery, setGallery] = useState<string[]>(property?.gallery ?? []);
  const [error, setError] = useState("");
  const [pending, start] = useTransition();

  return (
    <form
      action={(fd) =>
        start(async () => {
          setError("");
          const res = await saveProperty(property?.id ?? null, fd);
          if (res && "error" in res && res.error) setError(res.error);
        })
      }
      className="space-y-6"
    >
      <div className="acard space-y-5">
        <h2 className="font-semibold">The essentials</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="alabel">Title (for off-market: keep it anonymous — no address)</label>
            <input name="title" className="afield" required defaultValue={property?.title} placeholder="Front-line penthouse, Puente Romano" />
          </div>
          <div>
            <label className="alabel">Type</label>
            <select name="category" className="afield" defaultValue={property?.category ?? "residential"}>
              {Object.entries(CATEGORIES).map(([k, c]) => <option key={k} value={k}>{c.singular}</option>)}
            </select>
          </div>
          <div>
            <label className="alabel">Location</label>
            <select name="location" className="afield" defaultValue={property?.location ?? "marbella"}>
              {Object.entries(LOCATIONS).map(([k, l]) => <option key={k} value={k}>{l.name}</option>)}
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="alabel">Country</label>
            <input name="country" className="afield" defaultValue={property?.country ?? "Spain"} />
          </div>
          <div>
            <label className="alabel">Guide price (as text)</label>
            <input name="price_label" className="afield" defaultValue={property?.price_label ?? ""} placeholder="€12.5 million · On application · From €9,000/week" />
          </div>
          <div className="md:col-span-2">
            <label className="alabel">One-line teaser (shown on cards and in Google)</label>
            <input name="headline" className="afield" defaultValue={property?.headline ?? ""} placeholder="Four bedrooms, direct beach access, never before offered." />
          </div>
          <div className="md:col-span-2">
            <label className="alabel">Description (blank line between paragraphs)</label>
            <textarea name="description" rows={8} className="afield" defaultValue={property?.description ?? ""} />
          </div>
        </div>
      </div>

      <div className="acard space-y-4">
        <h2 className="font-semibold">Key facts</h2>
        <p className="text-xs text-[#6a7490]">Short label / value pairs, e.g. Bedrooms – 5, Plot – 2,400 m², Keys – 68, Covers – 120.</p>
        {facts.map((f, i) => (
          <div key={i} className="flex gap-3">
            <input className="afield" placeholder="Label" value={f.label} onChange={(e) => setFacts(facts.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))} />
            <input className="afield" placeholder="Value" value={f.value} onChange={(e) => setFacts(facts.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))} />
            <button type="button" className="abtn abtn-secondary" onClick={() => setFacts(facts.filter((_, j) => j !== i))}>×</button>
          </div>
        ))}
        <button type="button" className="abtn abtn-secondary" onClick={() => setFacts([...facts, { label: "", value: "" }])}>+ Add fact</button>
        <input type="hidden" name="key_facts" value={JSON.stringify(facts.filter((f) => f.label && f.value))} />
      </div>

      <div className="acard space-y-5">
        <h2 className="font-semibold">Photos &amp; visibility</h2>
        <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 ${offMarket ? "border-[#c9a650] bg-[#faf5e8]" : "border-[#d9d6cc]"}`}>
          <input type="checkbox" name="off_market" checked={offMarket} onChange={(e) => setOffMarket(e.target.checked)} className="mt-1" />
          <span className="text-sm">
            <b>Off-market (private)</b>
            <span className="block text-[#6a7490]">
              Tick for hotels, restaurants or private sales. The photo is shown blurred, there is no gallery, and visitors are asked to
              request details under NDA. Leave unticked for normal listings and rentals.
            </span>
          </span>
        </label>
        <ImageField
          name="image_url"
          label={offMarket ? "Mood image (a generic view — never the real property)" : "Main photo"}
          defaultValue={property?.image_url ?? ""}
        />
        {!offMarket && (
          <div className="space-y-3">
            <label className="alabel">Gallery (more photos)</label>
            {gallery.map((g, i) => (
              <div key={`${i}-${g}`} className="flex items-start gap-3">
                <div className="flex-1">
                  <ImageField label={`Photo ${i + 2}`} defaultValue={g} onChange={(u) => setGallery(gallery.map((x, j) => (j === i ? u : x)))} />
                </div>
                <button type="button" className="abtn abtn-secondary mt-6" onClick={() => setGallery(gallery.filter((_, j) => j !== i))}>×</button>
              </div>
            ))}
            <button type="button" className="abtn abtn-secondary" onClick={() => setGallery([...gallery, ""])}>+ Add photo</button>
          </div>
        )}
        <input type="hidden" name="gallery" value={JSON.stringify(gallery.filter(Boolean))} />
        <div className="grid gap-5 md:grid-cols-4">
          <div>
            <label className="alabel">Status</label>
            <select name="status" className="afield" defaultValue={property?.status ?? "available"}>
              <option value="available">Available</option>
              <option value="under_offer">Under offer</option>
              <option value="sold">Sold</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
          </div>
          <div>
            <label className="alabel">Order (lower first)</label>
            <input name="sort_order" type="number" className="afield" defaultValue={property?.sort_order ?? 0} />
          </div>
          <label className="flex items-center gap-2 pt-6 text-sm"><input type="checkbox" name="featured" defaultChecked={property?.featured} /> Featured on home</label>
          <label className="flex items-center gap-2 pt-6 text-sm"><input type="checkbox" name="published" defaultChecked={property?.published ?? true} /> Published</label>
          <div className="md:col-span-4">
            <label className="alabel">Web address (slug) — leave blank to generate from title</label>
            <input name="slug" className="afield" defaultValue={property?.slug ?? ""} />
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-700">{error}</p>}
      <div className="flex flex-wrap items-center gap-3">
        <button className="abtn" disabled={pending}>{pending ? "Saving…" : "Save property"}</button>
        <Link href="/admin/properties" className="abtn abtn-secondary">Back</Link>
        {property && (
          <>
            <Link href={`/properties/${property.slug}`} target="_blank" className="abtn abtn-secondary">View on site ↗</Link>
            <button
              type="button"
              className="abtn abtn-danger ml-auto"
              onClick={() => confirm("Delete this property? This cannot be undone.") && start(() => deleteProperty(property.id))}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </form>
  );
}
