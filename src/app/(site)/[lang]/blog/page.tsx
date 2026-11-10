import type { Metadata } from "next";
import Link from "next/link";
import { Container, CtaBand, JsonLd } from "@/components/Section";
import { PostCard } from "@/components/PostCard";
import { BLOG_CATEGORIES, getPosts, type BlogCategory } from "@/lib/blog";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent("blog");
  return {
    title: { absolute: c.seoTitle },
    description: c.seoDescription,
    alternates: { canonical: "/blog" },
    robots: { index: false, follow: true },
  };
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  const { c: raw } = await searchParams;
  const active = raw && raw in BLOG_CATEGORIES ? (raw as BlogCategory) : undefined;
  const [content, posts] = await Promise.all([getContent("blog"), getPosts({ category: active })]);
  const site = process.env.NEXT_PUBLIC_SITE_URL;

  const tabs: { key?: BlogCategory; label: string }[] = [
    { label: "All" },
    ...(Object.entries(BLOG_CATEGORIES) as [BlogCategory, { label: string }][]).map(([key, v]) => ({ key, label: v.label })),
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Thomson Calabria Blog",
          url: `${site}/blog`,
          author: { "@type": "Person", name: "Linda Thomson" },
        }}
      />
      <section className="pt-28 pb-12 lg:pt-32 lg:pb-16">
        <Container>
          <div className="max-w-2xl">
            <div className="kicker">{content.kicker}</div>
            <h1 className="display-xl mt-3">{content.title}</h1>
            <p className="lede mt-4">{content.intro}</p>
          </div>

          <nav className="mt-8 flex flex-wrap gap-2" aria-label="Blog categories">
            {tabs.map((t) => {
              const on = t.key === active;
              return (
                <Link
                  key={t.label}
                  href={t.key ? `/blog?c=${t.key}` : "/blog"}
                  className={`border px-4 py-2 text-[0.84rem] font-medium transition-colors ${
                    on ? "border-accent bg-accent text-white" : "border-line text-ivory hover:border-accent"
                  }`}
                >
                  {t.label}
                </Link>
              );
            })}
          </nav>
          {active && <p className="mt-4 max-w-2xl text-[0.94rem] text-mist">{BLOG_CATEGORIES[active].blurb}</p>}

          {posts.length ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.id} p={p} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-mist">New posts are on their way. Please check back soon.</p>
          )}
        </Container>
      </section>
      <CtaBand lang="en" />
    </>
  );
}
