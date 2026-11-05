import { createPublicClient } from "./supabase/public";

export const BLOG_CATEGORIES = {
  "out-and-about": {
    label: "Out and About",
    blurb: "Forthcoming events, restaurants and places worth knowing — from Sotogrande to Marbella, and London.",
  },
  property: {
    label: "Property News",
    blurb: "Linda's view on what is happening in the market, and what it means for buyers and owners.",
  },
} as const;

export type BlogCategory = keyof typeof BLOG_CATEGORIES;

export type Post = {
  id: string;
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string | null;
  body: string | null;
  image_url: string | null;
  event_date: string | null;
  event_location: string | null;
  published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
};

export async function getPosts(opts: { category?: BlogCategory; limit?: number } = {}): Promise<Post[]> {
  const supabase = createPublicClient();
  let q = supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });
  if (opts.category) q = q.eq("category", opts.category);
  if (opts.limit) q = q.limit(opts.limit);
  const { data } = await q;
  return (data ?? []) as Post[];
}

export async function getPost(slug: string): Promise<Post | null> {
  const supabase = createPublicClient();
  const { data } = await supabase.from("posts").select("*").eq("slug", slug).eq("published", true).maybeSingle();
  return (data as Post) ?? null;
}

export function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/** Very small markdown subset: blank-line paragraphs, "## " headings, "- " bullet lists, **bold**. */
export type Block = { type: "h"; text: string } | { type: "p"; text: string } | { type: "ul"; items: string[] };

export function parseBody(body: string | null): Block[] {
  if (!body) return [];
  return body
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk): Block => {
      if (chunk.startsWith("## ")) return { type: "h", text: chunk.slice(3).trim() };
      const lines = chunk.split("\n");
      if (lines.every((l) => /^[-•]\s+/.test(l))) return { type: "ul", items: lines.map((l) => l.replace(/^[-•]\s+/, "")) };
      return { type: "p", text: lines.join(" ") };
    });
}
