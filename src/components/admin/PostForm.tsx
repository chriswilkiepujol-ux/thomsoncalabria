"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { savePost, deletePost } from "@/app/admin/actions";
import { BLOG_CATEGORIES, type Post } from "@/lib/blog";
import { ImageField } from "./ImageField";

function toLocalInput(iso?: string) {
  const d = iso ? new Date(iso) : new Date();
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 16);
}

export function PostForm({ post }: { post: Post | null }) {
  const [category, setCategory] = useState(post?.category ?? "out-and-about");
  const [error, setError] = useState("");
  const [pending, start] = useTransition();

  return (
    <form
      action={(fd) =>
        start(async () => {
          setError("");
          const res = await savePost(post?.id ?? null, fd);
          if (res && "error" in res && res.error) setError(res.error);
        })
      }
      className="space-y-6"
    >
      <div className="acard space-y-5">
        <div>
          <label className="alabel">Feature</label>
          <div className="flex gap-3">
            {Object.entries(BLOG_CATEGORIES).map(([k, c]) => (
              <label
                key={k}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium ${
                  category === k ? "border-[#c9a650] bg-[#faf5e8]" : "border-[#d9d6cc] bg-white"
                }`}
              >
                <input type="radio" name="category" value={k} checked={category === k} onChange={() => setCategory(k as Post["category"])} />
                {c.label}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="alabel">Title</label>
          <input name="title" className="afield" required defaultValue={post?.title} placeholder="Christmas at Puente Romano" />
        </div>
        <div>
          <label className="alabel">Short summary (shown on the blog page and in Google)</label>
          <textarea name="excerpt" rows={2} className="afield" defaultValue={post?.excerpt ?? ""} />
        </div>

        {category === "out-and-about" && (
          <div className="grid gap-5 rounded-lg bg-[#faf9f6] p-4 md:grid-cols-2">
            <div>
              <label className="alabel">Event date (optional)</label>
              <input type="date" name="event_date" className="afield" defaultValue={post?.event_date ?? ""} />
            </div>
            <div>
              <label className="alabel">Where (optional)</label>
              <input name="event_location" className="afield" defaultValue={post?.event_location ?? ""} placeholder="Santa María Polo Club, Sotogrande" />
            </div>
            <p className="text-xs text-[#6a7490] md:col-span-2">Add a date if this is about a forthcoming event — it shows as a date badge and Google can list it as an event.</p>
          </div>
        )}

        <div>
          <label className="alabel">Text</label>
          <textarea name="body" rows={16} className="afield font-[inherit] leading-relaxed" defaultValue={post?.body ?? ""} />
          <p className="mt-1.5 text-xs text-[#6a7490]">
            Leave a blank line between paragraphs. Start a line with <b>##</b> for a subheading, <b>-</b> for a bullet point, and wrap words in <b>**double stars**</b> for bold.
          </p>
        </div>
      </div>

      <div className="acard space-y-5">
        <ImageField name="image_url" label="Main photo" defaultValue={post?.image_url ?? ""} />
        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label className="alabel">Publish date</label>
            <input type="datetime-local" name="published_at" className="afield" defaultValue={toLocalInput(post?.published_at)} />
            <p className="mt-1 text-xs text-[#6a7490]">Set a future date to schedule it.</p>
          </div>
          <label className="flex items-center gap-2 pt-7 text-sm">
            <input type="checkbox" name="published" defaultChecked={post?.published ?? true} /> Published (untick to save as a draft)
          </label>
          <div>
            <label className="alabel">Web address (optional)</label>
            <input name="slug" className="afield" defaultValue={post?.slug ?? ""} placeholder="made from the title" />
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-700">{error}</p>}
      <div className="flex flex-wrap items-center gap-3">
        <button className="abtn" disabled={pending}>{pending ? "Saving…" : "Save post"}</button>
        <Link href="/admin/blog" className="abtn abtn-secondary">Back</Link>
        {post && (
          <>
            <Link href={`/blog/${post.slug}`} target="_blank" className="abtn abtn-secondary">View on site ↗</Link>
            <button
              type="button"
              className="abtn abtn-danger ml-auto"
              onClick={() => confirm("Delete this post? This cannot be undone.") && start(() => deletePost(post.id))}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </form>
  );
}
