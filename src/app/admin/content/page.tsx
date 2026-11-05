import Link from "next/link";
import { SECTIONS } from "@/lib/contentSchemas";

export default function ContentIndex() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-medium">Pages &amp; copy</h1>
      <p className="text-sm text-[#6a7490]">Choose a page to edit its headlines, paragraphs and images.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {SECTIONS.map((s) => (
          <Link key={s.key} href={`/admin/content/${encodeURIComponent(s.key)}`} className="acard hover:border-[#c9a650]">
            <div className="font-semibold">{s.title}</div>
            {s.description && <div className="mt-1 text-xs text-[#6a7490]">{s.description}</div>}
          </Link>
        ))}
      </div>
    </div>
  );
}
