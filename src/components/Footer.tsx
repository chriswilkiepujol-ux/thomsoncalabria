import Link from "next/link";
import { Mark, Wordmark } from "./Logo";
import type { SiteSettings } from "@/lib/content";

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  const linkCls = "hover:text-ivory transition-colors";
  return (
    <footer className="dark relative bg-navy-950">
      <div className="mx-auto max-w-[1280px] px-5 py-10 lg:px-8 lg:py-14">
        <div className="grid grid-cols-3 gap-x-4 gap-y-8 lg:grid-cols-12 lg:gap-x-10">
          {/* Brand: full width on mobile */}
          <div className="col-span-3 lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 text-accent" aria-label="Thomson Calabria home">
              <Mark className="h-10 w-10 lg:h-12 lg:w-12" />
              <Wordmark size="md" />
            </Link>
            <p className="mt-5 hidden max-w-md text-sm leading-relaxed text-mist sm:block">
              Luxury homes for sale and holiday rental in Marbella and Sotogrande, and discreet,
              off-market sales of hotels and restaurants in Spain and selected international
              destinations.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="kicker mb-3 lg:mb-5">Portfolio</div>
            <ul className="space-y-2 text-[0.84rem] text-ivory/80 lg:space-y-2.5 lg:text-sm">
              <li><Link className={linkCls} href="/hotels">Hotels</Link></li>
              <li><Link className={linkCls} href="/restaurants">Restaurants</Link></li>
              <li><Link className={linkCls} href="/residential">Residential</Link></li>
              <li><Link className={linkCls} href="/luxury-rentals">Rentals</Link></li>
              <li><Link className={linkCls} href="/consultancy">Consultancy</Link></li>
              <li><Link className={linkCls} href="/blog">Blog</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="kicker mb-3 lg:mb-5">Locations</div>
            <ul className="space-y-2 text-[0.84rem] text-ivory/80 lg:space-y-2.5 lg:text-sm">
              <li><Link className={linkCls} href="/locations/sotogrande">Sotogrande</Link></li>
              <li><Link className={linkCls} href="/locations/marbella">Marbella</Link></li>
              <li><Link className={linkCls} href="/locations/italy">Italy</Link></li>
              <li><Link className={linkCls} href="/locations/dubai">Dubai</Link></li>
              <li><Link className={linkCls} href="/about">About Linda</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="kicker mb-3 lg:mb-5">Contact</div>
            <ul className="space-y-2 text-[0.84rem] text-ivory/80 lg:space-y-2.5 lg:text-sm">
              <li>
                <a className={linkCls} href={`mailto:${settings.email}`}>
                  <span className="lg:hidden">Email</span>
                  <span className="hidden lg:inline">{settings.email}</span>
                </a>
              </li>
              <li>
                <a className={linkCls} href={`tel:${settings.phone}`}>
                  <span className="lg:hidden">Call</span>
                  <span className="hidden lg:inline">{settings.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a className={linkCls} href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener">
                  WhatsApp
                </a>
              </li>
              <li>
                <Link className="font-semibold text-accent-2 hover:text-ivory" href="/contact">
                  Enquire →
                </Link>
              </li>
              <li className="hidden text-mist lg:block">{settings.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-line pt-6 text-[0.74rem] text-mist-2 lg:mt-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>© {year} Thomson Calabria SL · Formerly LT Properties Marbella</div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link href="/privacy" className={linkCls}>Privacy</Link>
              <Link href="/terms" className={linkCls}>Terms</Link>
              <Link href="/admin" className={linkCls}>Admin</Link>
              <span>
                Powered by{" "}
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
