import Link from "next/link";
import Image from "next/image";
import { CATEGORIES, locationLabel, type Property } from "@/lib/content";

const STATUS: Record<Property["status"], string> = {
  available: "Available",
  under_offer: "Under offer",
  sold: "Sold",
  withdrawn: "Withdrawn",
};

export function PropertyCard({ p, priority = false }: { p: Property; priority?: boolean }) {
  const cat = CATEGORIES[p.category];
  return (
    <Link
      href={`/properties/${p.slug}`}
      className="group card relative flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-accent/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-navy-800">
        {p.image_url ? (
          <Image
            src={p.image_url}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={priority}
            className="object-cover opacity-80 transition-transform duration-[1.4s] group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(26,48,89,0.9),rgba(5,11,26,1))]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
        <div className="absolute left-5 top-5 flex items-center gap-2">
          <span className="border border-accent/60 bg-navy-950/60 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.26em] text-accent-2 backdrop-blur">
            {cat.singular}
          </span>
          {p.status !== "available" && (
            <span className="bg-ivory/90 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.26em] text-navy-950">
              {STATUS[p.status]}
            </span>
          )}
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <div className="text-[0.62rem] uppercase tracking-[0.28em] text-mist">
            {locationLabel(p.location)} · {p.country}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-light leading-tight text-ivory">{p.title}</h3>
        {p.headline && <p className="mt-3 text-sm leading-relaxed text-mist">{p.headline}</p>}
        <div className="mt-auto flex items-end justify-between pt-6">
          <div>
            <div className="text-[0.58rem] uppercase tracking-[0.26em] text-mist-2">Guide</div>
            <div className="mt-1 font-display text-xl text-accent-2">
              {p.price_label ?? "On application"}
            </div>
          </div>
          <span className="text-[0.62rem] uppercase tracking-[0.26em] text-accent transition-transform duration-500 group-hover:translate-x-1">
            Request dossier →
          </span>
        </div>
      </div>
    </Link>
  );
}
