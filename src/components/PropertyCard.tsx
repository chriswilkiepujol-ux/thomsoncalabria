import Link from "next/link";
import Image from "next/image";
import { catText, countryLabel, locationLabel, type Property } from "@/lib/content";
import { dict, href, type Lang } from "@/lib/i18n";

export function PropertyCard({ p, lang, priority = false }: { p: Property; lang: Lang; priority?: boolean }) {
  const cat = catText(lang, p.category);
  const t = dict(lang).card;
  return (
    <Link
      href={href(lang, `/properties/${p.slug}`)}
      className="group card relative flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-accent/50"
    >
      <div className="dark relative aspect-[4/3] overflow-hidden bg-navy-800">
        {p.image_url ? (
          <Image
            src={p.image_url}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={priority}
            className="object-cover transition-transform duration-[1.4s] group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(26,48,89,0.9),rgba(5,11,26,1))]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
        <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2">
          <span className="border border-accent/60 bg-navy-950/60 px-2.5 py-1 text-[0.66rem] uppercase tracking-[0.12em] text-accent-2 backdrop-blur">
            {cat.singular}
          </span>
          {p.off_market && (
            <span className="bg-navy-950/70 px-2.5 py-1 text-[0.66rem] uppercase tracking-[0.12em] text-ivory backdrop-blur">
              {t.offMarket}
            </span>
          )}
          {p.status !== "available" && (
            <span className="bg-ivory/90 px-2.5 py-1 text-[0.66rem] uppercase tracking-[0.12em] text-navy-950">
              {t.status[p.status]}
            </span>
          )}
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <div className="text-[0.7rem] uppercase tracking-[0.12em] text-mist">
            {locationLabel(p.location, lang)} · {countryLabel(p.country, lang)}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl leading-tight text-ivory">{p.title}</h3>
        {p.headline && <p className="mt-3 text-sm leading-relaxed text-mist">{p.headline}</p>}
        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div>
            <div className="text-[0.66rem] uppercase tracking-[0.12em] text-mist-2">
              {p.category === "rental" ? t.rates : p.off_market ? t.guide : t.price}
            </div>
            <div className="mt-1 font-display text-xl text-accent-2">{p.price_label ?? t.onApplication}</div>
          </div>
          <span className="text-right text-[0.7rem] uppercase tracking-[0.12em] text-accent transition-transform duration-500 group-hover:translate-x-1">
            {p.off_market ? t.requestDetails : p.category === "rental" ? t.checkDates : t.viewProperty}
          </span>
        </div>
      </div>
    </Link>
  );
}
