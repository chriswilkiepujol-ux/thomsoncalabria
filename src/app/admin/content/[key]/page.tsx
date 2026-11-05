import Link from "next/link";
import { notFound } from "next/navigation";
import { SECTIONS } from "@/lib/contentSchemas";
import { getContent } from "@/lib/content";
import { ContentEditor } from "@/components/admin/ContentEditor";

export default async function EditContent({ params }: { params: Promise<{ key: string }> }) {
  const { key: raw } = await params;
  const key = decodeURIComponent(raw);
  const section = SECTIONS.find((s) => s.key === key);
  if (!section) notFound();
  const initial = (await getContent(key as "home")) as unknown as Record<string, unknown>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-medium">{section.title}</h1>
        <Link href="/admin/content" className="abtn abtn-secondary">Back</Link>
      </div>
      <div className="acard">
        <ContentEditor section={section} initial={initial} />
      </div>
    </div>
  );
}
