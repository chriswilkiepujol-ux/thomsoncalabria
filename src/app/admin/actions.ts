"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return supabase;
}

function revalidateAll() {
  revalidatePath("/", "layout");
}

export async function signIn(_prev: { error?: string } | null, formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Incorrect email or password." };
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function saveContent(key: string, value: unknown) {
  const supabase = await requireUser();
  const { error } = await supabase.from("site_content").upsert({ key, value });
  if (error) return { error: error.message };
  revalidateAll();
  return { ok: true };
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export async function saveProperty(id: string | null, formData: FormData) {
  const supabase = await requireUser();
  const get = (k: string) => formData.get(k)?.toString().trim() ?? "";

  let key_facts: { label: string; value: string }[] = [];
  try {
    key_facts = JSON.parse(get("key_facts") || "[]");
  } catch {
    key_facts = [];
  }

  const row = {
    title: get("title"),
    slug: get("slug") ? slugify(get("slug")) : slugify(get("title")),
    category: get("category"),
    location: get("location"),
    country: get("country") || "Spain",
    headline: get("headline") || null,
    description: get("description") || null,
    price_label: get("price_label") || null,
    key_facts,
    title_es: get("title_es") || null,
    headline_es: get("headline_es") || null,
    description_es: get("description_es") || null,
    price_label_es: get("price_label_es") || null,
    key_facts_es: (() => {
      try {
        return JSON.parse(get("key_facts_es") || "[]") as { label: string; value: string }[];
      } catch {
        return [];
      }
    })(),
    image_url: get("image_url") || null,
    gallery: (() => {
      try {
        return (JSON.parse(get("gallery") || "[]") as string[]).filter(Boolean);
      } catch {
        return [];
      }
    })(),
    off_market: formData.get("off_market") === "on",
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    status: get("status") || "available",
    sort_order: Number(get("sort_order") || 0),
  };

  if (!row.title) return { error: "Title is required." };

  const q = id
    ? supabase.from("properties").update(row).eq("id", id).select("id").single()
    : supabase.from("properties").insert(row).select("id").single();
  const { data, error } = await q;
  if (error) return { error: error.message };
  revalidateAll();
  redirect(`/admin/properties/${data.id}?saved=1`);
}

export async function deleteProperty(id: string) {
  const supabase = await requireUser();
  await supabase.from("properties").delete().eq("id", id);
  revalidateAll();
  redirect("/admin/properties");
}

export async function markEnquiry(id: string, read: boolean) {
  const supabase = await requireUser();
  await supabase.from("enquiries").update({ read }).eq("id", id);
  revalidatePath("/admin/enquiries");
}

export async function deleteEnquiry(id: string) {
  const supabase = await requireUser();
  await supabase.from("enquiries").delete().eq("id", id);
  revalidatePath("/admin/enquiries");
}

export async function savePost(id: string | null, formData: FormData) {
  const supabase = await requireUser();
  const get = (k: string) => formData.get(k)?.toString().trim() ?? "";
  const title = get("title");
  if (!title) return { error: "Please add a title." };
  const row = {
    title,
    slug: get("slug") ? slugify(get("slug")) : slugify(title),
    category: get("category") || "out-and-about",
    excerpt: get("excerpt") || null,
    body: formData.get("body")?.toString() ?? null,
    image_url: get("image_url") || null,
    event_date: get("event_date") || null,
    event_location: get("event_location") || null,
    published: formData.get("published") === "on",
    published_at: get("published_at") ? new Date(get("published_at")).toISOString() : new Date().toISOString(),
  };
  const q = id
    ? supabase.from("posts").update(row).eq("id", id).select("id").single()
    : supabase.from("posts").insert(row).select("id").single();
  const { data, error } = await q;
  if (error) return { error: error.message.includes("duplicate") ? "Another post already uses that web address." : error.message };
  revalidateAll();
  redirect(`/admin/blog/${data.id}?saved=1`);
}

export async function deletePost(id: string) {
  const supabase = await requireUser();
  await supabase.from("posts").delete().eq("id", id);
  revalidateAll();
  redirect("/admin/blog");
}
