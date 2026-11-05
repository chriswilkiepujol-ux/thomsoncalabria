import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminHome() {
  const supabase = await createClient();
  const [{ count: props }, { count: unread }, { data: recent }] = await Promise.all([
    supabase.from("properties").select("*", { count: "exact", head: true }),
    supabase.from("enquiries").select("*", { count: "exact", head: true }).eq("read", false),
    supabase.from("enquiries").select("id,name,email,interest,budget,created_at,read").order("created_at", { ascending: false }).limit(6),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-medium">Welcome back, Linda</h1>
        <p className="mt-1 text-sm text-[#6a7490]">Here is what is happening on thomsoncalabria.com.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Link href="/admin/enquiries" className="acard">
          <div className="text-xs uppercase tracking-wider text-[#8a93a6]">Unread enquiries</div>
          <div className="mt-2 font-display text-4xl">{unread ?? 0}</div>
        </Link>
        <Link href="/admin/properties" className="acard">
          <div className="text-xs uppercase tracking-wider text-[#8a93a6]">Properties</div>
          <div className="mt-2 font-display text-4xl">{props ?? 0}</div>
        </Link>
        <Link href="/admin/content" className="acard">
          <div className="text-xs uppercase tracking-wider text-[#8a93a6]">Pages &amp; copy</div>
          <div className="mt-2 text-sm font-medium text-[#0a1730]">Edit the home page, your bio, contact details and the colour accent →</div>
        </Link>
      </div>

      <div className="acard">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Latest enquiries</h2>
          <Link href="/admin/enquiries" className="text-sm text-[#0a1730] underline">View all</Link>
        </div>
        <div className="mt-4 divide-y divide-[#eeece5]">
          {(recent ?? []).map((e) => (
            <div key={e.id} className="flex items-center justify-between py-3 text-sm">
              <div>
                <div className="font-medium">{e.name} {!e.read && <span className="ml-2 rounded-full bg-[#c9a650] px-2 py-0.5 text-[0.6rem] font-bold uppercase text-white">New</span>}</div>
                <div className="text-[#6a7490]">{e.email} · {e.interest ?? "—"} · {e.budget ?? "—"}</div>
              </div>
              <div className="text-xs text-[#8a93a6]">{new Date(e.created_at).toLocaleDateString("en-GB")}</div>
            </div>
          ))}
          {!recent?.length && <p className="py-4 text-sm text-[#8a93a6]">No enquiries yet.</p>}
        </div>
      </div>

      <div className="acard text-sm text-[#4a5670]">
        <h2 className="font-semibold text-[#0a1730]">Quick guide</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li><b>Properties</b> — add homes and rentals with photos and a gallery as normal. For hotels, restaurants or private sales tick “Off-market”: the photo is blurred and details are only shared after an NDA.</li>
          <li><b>Pages &amp; copy</b> — change any headline or paragraph on the home page, your bio, the four category pages and the location pages.</li>
          <li><b>Blog</b> — write an Out and About or Property News post. Add an event date for forthcoming events. Untick “Published” to keep a draft.</li>
          <li><b>Enquiries</b> — every form submission lands here, with everything the person told us. Reply from your own email.</li>
          <li>Changes are live within a minute.</li>
        </ul>
      </div>
    </div>
  );
}
