import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, CtaBand, JsonLd } from "@/components/Section";
import { PostCard } from "@/components/PostCard";
import { BLOG_CATEGORIES, formatDate, getPost, getPosts, parseBody } from "@/lib/blog";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt ?? undefined,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.excerpt ?? undefined, images: p.image_url ? [{ url: p.image_url }] : undefined },
  };
}

function Bold({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : <span key={i}>{part}</span>
      )}
    </>
  );
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) notFound();
  const cat = BLOG_CATEGORIES[p.category];
  const more = (await getPosts({ limit: 4 })).filter((x) => x.id !== p.id).slice(0, 3);
  const site = process.env.NEXT_PUBLIC_SITE_URL;

  return (
    <>
      <JsonLd
        data={
          p.event_date
            ? {
                "@context": "https://schema.org",
                "@type": "Event",
                name: p.title,
                description: p.excerpt,
                startDate: p.event_date,
                image: p.image_url,
                location: { "@type": "Place", name: p.event_location ?? "Marbella", address: p.event_location ?? "Marbella, Spain" },
                organizer: { "@type": "Organization", name: "Thomson Calabria", url: site },
              }
            : {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: p.title,
                description: p.excerpt,
                image: p.image_url,
                datePublished: p.published_at,
                dateModified: p.updated_at,
                author: { "@type": "Person", name: "Linda Thomson" },
                publisher: { "@type": "Organization", name: "Thomson Calabria" },
                mainEntityOfPage: `${site}/blog/${p.slug}`,
              }
        }
      />
      <article className="pt-28 pb-12 lg:pt-32 lg:pb-16">
        <Container className="max-w-[820px]">
          <div className="flex flex-wrap items-center gap-2 text-[0.8rem] font-medium text-mist">
            <Link href="/blog" className="hover:text-accent">Blog</Link>
            <span className="text-accent">/</span>
            <Link href={`/blog?c=${p.category}`} className="hover:text-accent">{cat.label}</Link>
          </div>
          <h1 className="display-xl mt-3">{p.title}</h1>
          <div className="mt-3 text-[0.9rem] text-mist">
            {p.event_date ? (
              <>
                <strong className="text-ivory">{formatDate(p.event_date)}</strong>
                {p.event_location ? ` · ${p.event_location}` : ""}
              </>
            ) : (
              <>By Linda Thomson · {formatDate(p.published_at)}</>
            )}
          </div>
          {p.image_url && (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden">
              <Image src={p.image_url} alt={p.title} fill priority sizes="820px" className="object-cover" />
            </div>
          )}
          <div className="mt-8 space-y-5 text-[1.06rem] leading-[1.8] text-mist">
            {parseBody(p.body).map((b, i) =>
              b.type === "h" ? (
                <h2 key={i} className="pt-3 font-display text-2xl text-ivory">{b.text}</h2>
              ) : b.type === "ul" ? (
                <ul key={i} className="list-disc space-y-1 pl-5">
                  {b.items.map((it, j) => <li key={j}><Bold text={it} /></li>)}
                </ul>
              ) : (
                <p key={i}><Bold text={b.text} /></p>
              )
            )}
          </div>
          <div className="mt-10 border-t border-line pt-6 text-[0.94rem] text-mist">
            Questions about anything here, or looking for something in particular?{" "}
            <Link href="/contact" className="font-semibold text-accent underline-offset-4 hover:underline">Write to Linda</Link>.
          </div>
        </Container>
      </article>

      {more.length > 0 && (
        <section className="light-alt py-12 lg:py-16">
          <Container>
            <h2 className="display-md">More from the blog</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {more.map((x) => <PostCard key={x.id} p={x} />)}
            </div>
          </Container>
        </section>
      )}
      <CtaBand />
    </>
  );
}
