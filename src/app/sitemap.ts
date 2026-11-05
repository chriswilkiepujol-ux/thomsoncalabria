import type { MetadataRoute } from "next";
import { CATEGORIES, getProperties, LOCATIONS } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thomsoncalabria.com";
  const now = new Date();
  const props = await getProperties();
  return [
    { url: site, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...Object.values(CATEGORIES).map((c) => ({ url: `${site}/${c.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 })),
    { url: `${site}/locations`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...Object.keys(LOCATIONS).map((l) => ({ url: `${site}/locations/${l}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 })),
    { url: `${site}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...props.map((p) => ({ url: `${site}/properties/${p.slug}`, lastModified: new Date(p.updated_at), changeFrequency: "weekly" as const, priority: 0.7 })),
  ];
}
