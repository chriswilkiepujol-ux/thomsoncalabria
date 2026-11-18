import Image from "next/image";
import Link from "next/link";
import { dict, href, type Lang } from "@/lib/i18n";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-[1280px] px-5 lg:px-8 ${className}`}>{children}</div>;
}

export function PageHero({
  kicker,
  title,
  intro,
  image,
}: {
  kicker: string;
  title: string;
  intro?: string;
  image?: string;
}) {
  return (
    <section className="dark relative flex min-h-[460px] items-end overflow-hidden bg-navy-950 lg:min-h-[520px]">
      {image ? (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className="slowzoom object-cover" />
          <div className="veil absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-navy-950/25 to-transparent" />
        </>
      ) : (
        <BlueBackdrop />
      )}
      <Container className="hero-text relative z-10 pb-12 pt-32 lg:pb-14">
        <div className="max-w-2xl">
          <div className="kicker rise">{kicker}</div>
          <h1 className="display-xl rise rise-2 mt-4">{title}</h1>
          {intro && <p className="lede rise rise-3 mt-5">{intro}</p>}
        </div>
      </Container>
    </section>
  );
}

/** Photo-free hero: deep navy, a soft light from the right, a fine arch pattern and the logo mark in fine gold line. */
function BlueBackdrop() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_85%_20%,var(--navy-700)_0%,var(--navy-900)_45%,var(--navy-950)_100%)]" />
      <div className="arch-pattern absolute inset-0 opacity-40 [mask-image:linear-gradient(to_left,black_10%,transparent_70%)]" />
      <svg
        viewBox="0 0 64 80"
        fill="none"
        stroke="var(--accent)"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute right-[8%] top-1/2 hidden h-[420px] w-[336px] -translate-y-[44%] opacity-70 lg:block"
      >
        <g strokeWidth="1.1" vectorEffect="non-scaling-stroke">
          <path vectorEffect="non-scaling-stroke" d="M8 72V34C8 19.6 18.7 8 32 8s24 11.6 24 26v38" />
          <path vectorEffect="non-scaling-stroke" d="M4 76V34C4 17.4 16.5 4 32 4s28 13.4 28 30v42" strokeOpacity="0.45" />
          <path vectorEffect="non-scaling-stroke" d="M2 76h60" />
          <path vectorEffect="non-scaling-stroke" d="M8 72h48" />
          <path vectorEffect="non-scaling-stroke" d="M20 72V42l6-4v34" />
          <path vectorEffect="non-scaling-stroke" d="M26 72V30l6-6v48" />
          <path vectorEffect="non-scaling-stroke" d="M32 24l6 6v42" />
          <path vectorEffect="non-scaling-stroke" d="M38 72V38l6 4v30" />
          <path vectorEffect="non-scaling-stroke" d="M14 72V52l6 4" />
          <path vectorEffect="non-scaling-stroke" d="M50 72V52l-6 4" />
          <path vectorEffect="non-scaling-stroke" d="M32 24V14" />
          <circle vectorEffect="non-scaling-stroke" cx="32" cy="60" r="4" />
          <path vectorEffect="non-scaling-stroke" d="M32 56v8M28 60h8" />
        </g>
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
    </div>
  );
}

export function SectionHead({
  kicker,
  title,
  body,
  align = "left",
}: {
  kicker: string;
  title: string;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <div className="kicker">{kicker}</div>
      <h2 className="display-lg mt-3">{title}</h2>
      {body && <p className="lede mt-4">{body}</p>}
    </div>
  );
}

export function CtaBand({ lang, title, body }: { lang: Lang; title?: string; body?: string }) {
  const t = dict(lang).cta;
  return (
    <section className="dark bg-navy-900">
      <Container className="py-14 lg:py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="display-lg">{title ?? t.title}</h2>
            <p className="lede mt-3">{body ?? t.body}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <Link href={href(lang, "/contact")} className="btn btn-solid">
              {t.start}
            </Link>
            <Link href={`${href(lang, "/contact")}#call`} className="btn btn-ghost">
              {t.call}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
