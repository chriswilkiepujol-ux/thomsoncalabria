import Link from "next/link";
import { notFound } from "next/navigation";
import { SECTIONS } from "@/lib/contentSchemas";
import { getContent, storageKey, type ContentKey } from "@/lib/content";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { href } from "@/lib/i18n";

const PUBLIC_PATH: Record<string, string> = {
  home: "/",
  about: "/about",
  consultancy: "/consultancy",
  "category:hotel": "/hotels",
  "category:restaurant": "/restaurants",
  "category:residential": "/residential",
  "category:rental": "/luxury-rentals",
};

export default async function EditContent({
  params,
  searchParams,
}: {
  params: Promise<{ key: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { key: raw } = await params;
  const { lang: rawLang } = await searchParams;
  const key = decodeURIComponent(raw) as ContentKey;
  const section = SECTIONS.find((s) => s.key === key);
  if (!section) notFound();
  const translatable = key !== "settings";
  const lang = translatable && rawLang === "es" ? "es" : "en";
  const initial = (await getContent(key, lang)) as unknown as Record<string, unknown>;
  const base = `/admin/content/${encodeURIComponent(key)}`;
  const publicPath = PUBLIC_PATH[key] ?? (key.startsWith("location:") ? `/locations/${key.slice(9)}` : null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-medium">{section.title}</h1>
        <div className="flex gap-2">
          {publicPath && (
            <Link href={href(lang, publicPath)} target="_blank" className="abtn abtn-secondary">
              View page ↗
            </Link>
          )}
          <Link href="/admin/content" className="abtn abtn-secondary">Back</Link>
        </div>
      </div>

      {translatable && (
        <div className="flex items-center gap-2">
          <Link
            href={base}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${lang === "en" ? "bg-[#0a1730] text-white" : "border border-[#d9d6cc] bg-white"}`}
          >
            🇬🇧 English
          </Link>
          <Link
            href={`${base}?lang=es`}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${lang === "es" ? "bg-[#0a1730] text-white" : "border border-[#d9d6cc] bg-white"}`}
          >
            🇪🇸 Español
          </Link>
          <span className="ml-2 text-xs text-[#6a7490]">
            {lang === "es"
              ? "You are editing the Spanish version (/es). Photos changed in English also appear here unless you change them in this tab."
              : "You are editing the English version."}
          </span>
        </div>
      )}

      <div className="acard">
        <ContentEditor key={lang} section={section} saveKey={storageKey(key, lang)} initial={initial} />
      </div>
    </div>
  );
}
