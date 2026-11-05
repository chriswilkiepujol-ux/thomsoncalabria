import Link from "next/link";
import { Mark, Wordmark } from "./Logo";
import type { SiteSettings } from "@/lib/content";

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line bg-navy-950">
      <div className="mx-auto max-w-[1280px] px-5 py-14 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 text-accent">
              <Mark className="h-12 w-12" />
              <Wordmark size="md" />
            </div>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-mist">
              Off-market hotels, restaurants and private residences in Sotogrande, Marbella and
              selected international destinations. We deal directly with buyers, investors and
              family offices. By introduction only.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="kicker mb-6">Portfolio</div>
            <ul className="space-y-3 text-sm text-ivory/80">
              <li><Link className="link-underline" href="/hotels">Hotels</Link></li>
              <li><Link className="link-underline" href="/restaurants">Restaurants</Link></li>
              <li><Link className="link-underline" href="/residential">Residential</Link></li>
              <li><Link className="link-underline" href="/luxury-rentals">Luxury Rentals</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="kicker mb-6">Locations</div>
            <ul className="space-y-3 text-sm text-ivory/80">
              <li><Link className="link-underline" href="/locations/sotogrande">Sotogrande</Link></li>
              <li><Link className="link-underline" href="/locations/marbella">Marbella</Link></li>
              <li><Link className="link-underline" href="/locations/italy">Italy · Capri</Link></li>
              <li><Link className="link-underline" href="/locations/dubai">Dubai</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="kicker mb-6">Private enquiries</div>
            <ul className="space-y-3 text-sm text-ivory/80">
              <li>
                <a className="link-underline" href={`mailto:${settings.email}`}>{settings.email}</a>
              </li>
              <li>
                <a className="link-underline" href={`tel:${settings.phone}`}>{settings.phoneDisplay}</a>
              </li>
              <li className="text-mist">{settings.address}</li>
              <li className="pt-3">
                <Link href="/contact" className="btn text-[0.7rem] !px-5 !py-2.5">
                  <span>Start a conversation</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-10" />

        <div className="mt-8 flex flex-col gap-4 text-[0.68rem] uppercase tracking-[0.12em] text-mist-2 md:flex-row md:items-center md:justify-between">
          <div>© {year} Thomson Calabria SL. All rights reserved.</div>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy" className="hover:text-ivory">Privacy</Link>
            <Link href="/terms" className="hover:text-ivory">Terms</Link>
            <Link href="/about" className="hover:text-ivory">Formerly LT Properties Marbella</Link>
            <Link href="/admin" className="hover:text-ivory">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
