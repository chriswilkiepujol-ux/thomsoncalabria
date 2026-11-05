import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PostForm } from "@/components/admin/PostForm";
import type { Post } from "@/lib/blog";

export default async function EditPost({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const { saved } = await searchParams;
  let post: Post | null = null;
  if (id !== "new") {
    const supabase = await createClient();
    const { data } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    post = data as Post;
  }
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-medium">{post ? "Edit post" : "New post"}</h1>
      {saved && <div className="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-800">Saved. Live on the site within a minute.</div>}
      <PostForm post={post} />
    </div>
  );
}
