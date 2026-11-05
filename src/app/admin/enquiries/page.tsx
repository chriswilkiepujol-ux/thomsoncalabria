import { createClient } from "@/lib/supabase/server";
import { deleteEnquiry, markEnquiry } from "../actions";

export default async function EnquiriesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(200);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-medium">Enquiries</h1>
      {!data?.length && <p className="text-sm text-[#8a93a6]">No enquiries yet.</p>}
      <div className="space-y-4">
        {(data ?? []).map((e) => (
          <div key={e.id} className={`acard ${e.read ? "" : "border-[#c9a650]"}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold">
                  {e.name}
                  {!e.read && <span className="ml-2 rounded-full bg-[#c9a650] px-2 py-0.5 align-middle text-[0.6rem] font-bold uppercase text-white">New</span>}
                </div>
                <div className="text-sm text-[#6a7490]">
                  <a className="underline" href={`mailto:${e.email}`}>{e.email}</a>
                  {e.phone && <> · <a className="underline" href={`tel:${e.phone}`}>{e.phone}</a></>}
                </div>
              </div>
              <div className="text-xs text-[#8a93a6]">{new Date(e.created_at).toLocaleString("en-GB")}</div>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm md:grid-cols-4">
              {[
                ["I am", e.buyer_type],
                ["Asset", e.interest],
                ["Locations", e.location],
                ["Budget", e.budget],
                ["Timeframe", e.timeframe],
                ["Property", e.property_ref],
                ["From page", e.source_page],
              ]
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k as string}>
                    <dt className="text-[0.65rem] uppercase tracking-wider text-[#8a93a6]">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
            </dl>
            {e.message && <p className="mt-4 whitespace-pre-line rounded-lg bg-[#f6f5f1] p-4 text-sm">{e.message}</p>}
            <div className="mt-4 flex gap-2">
              <a className="abtn !py-1.5 text-xs" href={`mailto:${e.email}?subject=${encodeURIComponent("Thomson & Calabria — your enquiry")}`}>Reply by email</a>
              <form action={markEnquiry.bind(null, e.id, !e.read)}>
                <button className="abtn abtn-secondary !py-1.5 text-xs">{e.read ? "Mark unread" : "Mark read"}</button>
              </form>
              <form action={deleteEnquiry.bind(null, e.id)}>
                <button className="abtn abtn-danger !py-1.5 text-xs">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
