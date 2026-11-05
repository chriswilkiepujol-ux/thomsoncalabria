import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { BLOG_CATEGORIES, formatDate, type Post } from "@/lib/blog";

export default async function BlogAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.from("posts").select("*").order("published_at", { ascending: false });
  const rows = (data ?? []) as Post[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium">Blog</h1>
          <p className="mt-1 text-sm text-[#6a7490]">Two features: Out and About (events, restaurants, places) and Property News.</p>
        </div>
        <Link href="/admin/blog/new" className="abtn">+ New post</Link>
      </div>
      <div className="acard !p-0">
        <table className="w-full text-sm">
          <thead className="text-left text-[0.65rem] uppercase tracking-wider text-[#8a93a6]">
            <tr className="border-b border-[#eeece5]">
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Feature</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="border-b border-[#eeece5] last:border-0 hover:bg-[#faf9f6]">
                <td className="px-5 py-3">
                  <Link href={`/admin/blog/${p.id}`} className="font-medium hover:underline">{p.title}</Link>
                </td>
                <td className="px-5 py-3">{BLOG_CATEGORIES[p.category].label}</td>
                <td className="px-5 py-3">{p.event_date ? `Event: ${formatDate(p.event_date)}` : formatDate(p.published_at)}</td>
                <td className="px-5 py-3">
                  {!p.published ? (
                    <span className="text-[#8a93a6]">Draft</span>
                  ) : new Date(p.published_at) > new Date() ? (
                    <span className="text-[#9a7a2c]">Scheduled</span>
                  ) : (
                    <span className="text-green-700">Live</span>
                  )}
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr><td className="px-5 py-8 text-center text-[#8a93a6]" colSpan={4}>No posts yet. Write your first one.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
