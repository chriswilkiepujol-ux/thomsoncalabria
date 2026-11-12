import Link from "next/link";
import { Mark, Wordmark } from "./Logo";
import type { SiteSettings } from "@/lib/content";
import { locationLabel } from "@/lib/content";
import { dict, href, type Lang } from "@/lib/i18n";

export function Footer({ settings, lang }: { settings: SiteSettings; lang: Lang }) {
  const year = new Date().getFullYear();
  const d = dict(lang);
  const t = d.footer;
  const linkCls = "hover:text-ivory transition-colors";
  const L = (p: string) => href(lang, p);
  return (
    <footer className="dark relative bg-navy-950">
      <div className="mx-auto max-w-[1320px] px-5 py-10 lg:px-8 lg:py-14">
        <div className="grid grid-cols-3 gap-x-4 gap-y-8 lg:grid-cols-12 lg:gap-x-10">
          <div className="col-span-3 lg:col-span-5">
            <Link href={L("/")} className="inline-flex items-center gap-3 text-accent" aria-label="Thomson Calabria">
              <Mark className="h-10 w-10 lg:h-12 lg:w-12" />
              <Wordmark size="md" />
            </Link>
            <p className="mt-5 hidden max-w-md text-sm leading-relaxed text-mist sm:block">{t.blurb}</p>
          </div>

          <div className="lg:col-span-2">
            <div className="kicker mb-3 lg:mb-5">{t.portfolio}</div>
            <ul className="space-y-2 text-[0.84rem] text-ivory/80 lg:space-y-2.5 lg:text-sm">
              <li><Link className={linkCls} href={L("/hotels")}>{d.nav.hotels}</Link></li>
              <li><Link className={linkCls} href={L("/restaurants")}>{d.nav.restaurants}</Link></li>
              <li><Link className={linkCls} href={L("/consultancy")}>{d.nav.consultancy}</Link></li>
              <li><Link className={linkCls} href={L("/residential")}>{d.nav.residential}</Link></li>
              <li><Link className={linkCls} href={L("/luxury-rentals")}>{d.nav.rentals}</Link></li>
              <li><Link className={linkCls} href={L("/about")}>{t.aboutLinda}</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="kicker mb-3 lg:mb-5">{t.locations}</div>
            <ul className="space-y-2 text-[0.84rem] text-ivory/80 lg:space-y-2.5 lg:text-sm">
              {["sotogrande", "marbella", "international"].map((l) => (
                <li key={l}><Link className={linkCls} href={L(`/locations/${l}`)}>{locationLabel(l, lang)}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="kicker mb-3 lg:mb-5">{t.contact}</div>
            <ul className="space-y-2 text-[0.84rem] text-ivory/80 lg:space-y-2.5 lg:text-sm">
              <li>
                <a className={linkCls} href={`mailto:${settings.email}`}>
                  <span className="lg:hidden">{t.email}</span>
                  <span className="hidden lg:inline">{settings.email}</span>
                </a>
              </li>
              <li>
                <a className={linkCls} href={`tel:${settings.phone}`}>
                  <span className="lg:hidden">{t.call}</span>
                  <span className="hidden lg:inline">{settings.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a className={linkCls} href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener">
                  WhatsApp
                </a>
              </li>
              <li>
                <Link className="font-semibold text-accent-2 hover:text-ivory" href={L("/contact")}>
                  {t.enquire}
                </Link>
              </li>
              <li className="hidden text-mist lg:block">{settings.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-line pt-6 text-[0.74rem] text-mist-2 lg:mt-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>© {year} Thomson Calabria SL · {t.rights}</div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link href={L("/privacy")} className={linkCls}>{t.privacy}</Link>
              <Link href={L("/terms")} className={linkCls}>{t.terms}</Link>
              <Link href="/admin" className={linkCls}>Admin</Link>
              <span>
                {t.poweredBy}{" "}
                <a href="https://impulsomedia.es" target="_blank" rel="noopener" className="font-semibold text-ivory/80 hover:text-accent-2">
                  impulsomedia.es
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
