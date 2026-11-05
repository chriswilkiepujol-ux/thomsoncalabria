import Image from "next/image";
import Link from "next/link";
import { BLOG_CATEGORIES, formatDate, type Post } from "@/lib/blog";

export function PostCard({ p }: { p: Post }) {
  const cat = BLOG_CATEGORIES[p.category];
  const upcoming = p.event_date && new Date(p.event_date) >= new Date(new Date().toDateString());
  return (
    <Link href={`/blog/${p.slug}`} className="group card flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-0.5">
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-800">
        {p.image_url && (
          <Image
            src={p.image_url}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        {p.event_date && (
          <div className="absolute left-4 top-4 bg-white px-3 py-1.5 text-center text-navy-950 shadow">
            <div className="text-[0.66rem] font-semibold uppercase tracking-[0.08em]">
              {new Date(p.event_date).toLocaleDateString("en-GB", { month: "short" })}
            </div>
            <div className="font-display text-xl leading-none">{new Date(p.event_date).getDate()}</div>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-[0.74rem] font-semibold uppercase tracking-[0.08em] text-accent">
          {cat.label}
          {upcoming && <span className="rounded-sm bg-accent-soft px-1.5 py-0.5 text-[0.66rem]">Upcoming</span>}
        </div>
        <h3 className="mt-2 font-display text-xl leading-snug">{p.title}</h3>
        {p.excerpt && <p className="mt-2 text-[0.94rem] leading-relaxed text-mist">{p.excerpt}</p>}
        <div className="mt-auto pt-4 text-[0.8rem] text-mist-2">
          {p.event_date ? `${formatDate(p.event_date)}${p.event_location ? ` · ${p.event_location}` : ""}` : formatDate(p.published_at)}
        </div>
      </div>
    </Link>
  );
}
