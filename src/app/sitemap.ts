import type { MetadataRoute } from "next";
import { CATEGORIES, getProperties, LOCATIONS } from "@/lib/content";
import { href } from "@/lib/i18n";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thomsoncalabria.com";
  const now = new Date();
  const props = await getProperties();

  const pages: { path: string; priority: number; freq: "weekly" | "monthly"; modified?: Date }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/hotels", priority: 0.95, freq: "weekly" },
    { path: "/restaurants", priority: 0.9, freq: "weekly" },
    { path: "/consultancy", priority: 0.9, freq: "monthly" },
    { path: `/${CATEGORIES.residential.slug}`, priority: 0.8, freq: "weekly" },
    { path: `/${CATEGORIES.rental.slug}`, priority: 0.8, freq: "weekly" },
    { path: "/about", priority: 0.6, freq: "monthly" },
    { path: "/contact", priority: 0.8, freq: "monthly" },
    { path: "/locations", priority: 0.6, freq: "monthly" },
    ...Object.keys(LOCATIONS).map((l) => ({ path: `/locations/${l}`, priority: 0.7, freq: "monthly" as const })),
    ...props.map((p) => ({ path: `/properties/${p.slug}`, priority: 0.7, freq: "weekly" as const, modified: new Date(p.updated_at) })),
  ];

  // One entry per language, each listing its translation so Google pairs them.
  return pages.flatMap(({ path, priority, freq, modified }) =>
    (["en", "es"] as const).map((lang) => ({
      url: `${site}${href(lang, path)}`.replace(/\/$/, "") || site,
      lastModified: modified ?? now,
      changeFrequency: freq,
      priority: lang === "en" ? priority : Math.max(0.5, priority - 0.05),
      alternates: {
        languages: {
          en: `${site}${href("en", path)}`.replace(/(.)\/$/, "$1"),
          es: `${site}${href("es", path)}`,
        },
      },
    }))
  );
}
