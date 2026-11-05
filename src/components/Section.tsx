import Image from "next/image";
import Link from "next/link";

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
  image: string;
}) {
  return (
    <section className="dark relative flex min-h-[460px] items-end overflow-hidden bg-navy-950 lg:min-h-[520px]">
      <Image src={image} alt="" fill priority sizes="100vw" className="slowzoom object-cover" />
      <div className="veil absolute inset-0" />
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

export function CtaBand({
  title = "Tell us what you are looking for.",
  body = "Every enquiry is read personally by Linda Thomson and answered within one working day, in complete confidence.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="dark bg-navy-900">
      <Container className="py-14 lg:py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="display-lg">{title}</h2>
            <p className="lede mt-3">{body}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <Link href="/contact" className="btn btn-solid">
              Start a conversation
            </Link>
            <Link href="/contact#call" className="btn btn-ghost">
              Request a call
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
