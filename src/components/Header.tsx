"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Mark, Wordmark } from "./Logo";

const NAV = [
  { href: "/hotels", label: "Hotels" },
  { href: "/restaurants", label: "Restaurants" },
  { href: "/residential", label: "Residential" },
  { href: "/luxury-rentals", label: "Rentals" },
  { href: "/consultancy", label: "Consultancy" },
  { href: "/locations", label: "Locations" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

// Pages that open with a full-bleed photo can start with a transparent header.
const HERO_PAGES = ["/hotels", "/restaurants", "/residential", "/luxury-rentals", "/consultancy", "/locations", "/properties/"];

export function Header({ phoneDisplay, phone }: { phoneDisplay: string; phone: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const overHero = pathname === "/" || HERO_PAGES.some((p) => pathname.startsWith(p));
  const solid = scrolled || open || !overHero;

  return (
    <header
      className={`dark fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-navy-950 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.6)]" : "bg-gradient-to-b from-navy-950/70 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-6 px-5 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3 text-accent" aria-label="Thomson Calabria home">
          <Mark className="h-9 w-9" />
          <Wordmark size="sm" />
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Main">
          {NAV.map((n) => {
            const active = pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`relative py-2 text-[0.82rem] font-medium transition-colors ${
                  active ? "text-accent-2" : "text-ivory/85 hover:text-ivory"
                }`}
              >
                {n.label}
                {active && <span className="absolute inset-x-0 -bottom-0.5 h-px bg-accent" />}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 xl:flex">
          <a href={`tel:${phone}`} className="hidden text-[0.82rem] font-medium text-ivory/85 hover:text-ivory 2xl:inline">
            {phoneDisplay}
          </a>
          <Link href="/contact" className="btn btn-solid btn-sm">
            Enquire
          </Link>
        </div>

        <div className="flex items-center gap-3 xl:hidden">
          <Link href="/contact" className="btn btn-solid btn-sm hidden sm:inline-flex">
            Enquire
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className={`h-px w-6 bg-ivory transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-ivory transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-6 bg-ivory transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-navy-950 px-5 pb-8 pt-4 xl:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="border-b border-line py-3.5 font-display text-2xl text-ivory"
              >
                {n.label}
              </Link>
            ))}
            <Link href="/contact" className="btn btn-solid mt-6 w-full">
              Private enquiry
            </Link>
            <a href={`tel:${phone}`} className="mt-4 text-center text-sm font-medium text-mist">
              {phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
