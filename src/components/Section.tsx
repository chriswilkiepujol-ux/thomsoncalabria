import Image from "next/image";
import Link from "next/link";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-[1400px] px-6 lg:px-10 ${className}`}>{children}</div>;
}

export function PageHero({
  kicker,
  title,
  intro,
  image,
  tall = false,
}: {
  kicker: string;
  title: string;
  intro?: string;
  image: string;
  tall?: boolean;
}) {
  return (
    <section className={`dark relative flex items-end overflow-hidden bg-navy-950 ${tall ? "min-h-[92vh]" : "min-h-[70vh]"}`}>
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="slowzoom object-cover"
      />
      <div className="veil absolute inset-0" />
      <Container className="relative z-10 pb-20 pt-48">
        <div className="max-w-3xl">
          <div className="kicker rise">{kicker}</div>
          <h1 className="display-lg rise rise-2 mt-6 text-ivory">{title}</h1>
          {intro && <p className="lede rise rise-3 mt-7 max-w-2xl">{intro}</p>}
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
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <div className="kicker">{kicker}</div>
      <h2 className="display-lg mt-5 text-ivory">{title}</h2>
      {body && <p className="lede mt-6">{body}</p>}
    </div>
  );
}

export function CtaBand({
  title = "Tell us what you are looking for.",
  body = "Every enquiry is read personally by Linda Thomson and answered within one working day. Nothing you share is ever passed to a third party.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="dark relative overflow-hidden bg-navy-900">
      <div className="grain absolute inset-0" />
      <Container className="relative py-24">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="kicker">Private enquiry</div>
            <h2 className="display-lg mt-5">{title}</h2>
            <p className="lede mt-6 max-w-2xl">{body}</p>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-4 lg:items-end">
            <Link href="/contact" className="btn btn-solid">
              <span>Start a conversation</span>
            </Link>
            <Link href="/contact#call" className="btn btn-ghost">
              <span>Request a call</span>
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
