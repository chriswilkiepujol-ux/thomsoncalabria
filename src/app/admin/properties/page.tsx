import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CATEGORIES, locationLabel, type Property } from "@/lib/content";

export default async function PropertiesAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
  const rows = (data ?? []) as Property[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-medium">Properties</h1>
        <Link href="/admin/properties/new" className="abtn">+ Add property</Link>
      </div>
      <div className="acard !p-0">
        <table className="w-full text-sm">
          <thead className="text-left text-[0.65rem] uppercase tracking-wider text-[#8a93a6]">
            <tr className="border-b border-[#eeece5]">
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Location</th>
              <th className="px-5 py-3">Guide</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="border-b border-[#eeece5] last:border-0 hover:bg-[#faf9f6]">
                <td className="px-5 py-3">
                  <Link href={`/admin/properties/${p.id}`} className="font-medium underline-offset-2 hover:underline">{p.title}</Link>
                  {p.featured && <span className="ml-2 text-[0.6rem] font-bold uppercase text-[#c9a650]">Featured</span>}
                  {!p.published && <span className="ml-2 text-[0.6rem] font-bold uppercase text-[#8a93a6]">Hidden</span>}
                </td>
                <td className="px-5 py-3">{CATEGORIES[p.category].singular}</td>
                <td className="px-5 py-3">{locationLabel(p.location)}</td>
                <td className="px-5 py-3">{p.price_label ?? "—"}</td>
                <td className="px-5 py-3 capitalize">{p.status.replace("_", " ")}</td>
              </tr>
            ))}
            {!rows.length && (
              <tr><td className="px-5 py-8 text-center text-[#8a93a6]" colSpan={5}>No properties yet. Add your first opportunity.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
