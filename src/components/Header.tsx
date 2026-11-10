"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Mark, Wordmark } from "./Logo";
import { dict, href, type Lang } from "@/lib/i18n";

// Pages that open with a full-bleed photo can start with a transparent header.
const HERO_PAGES = ["/hotels", "/restaurants", "/residential", "/luxury-rentals", "/consultancy", "/locations", "/properties/"];

/** Path without the /es prefix. */
function basePath(pathname: string) {
  if (pathname === "/es") return "/";
  if (pathname.startsWith("/es/")) return pathname.slice(3);
  return pathname;
}

export function Header({ lang, phoneDisplay, phone }: { lang: Lang; phoneDisplay: string; phone: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = dict(lang).nav;
  const path = basePath(pathname);
  const other: Lang = lang === "en" ? "es" : "en";

  const NAV = [
    { path: "/hotels", label: t.hotels },
    { path: "/restaurants", label: t.restaurants },
    { path: "/consultancy", label: t.consultancy },
    { path: "/residential", label: t.residential },
    { path: "/luxury-rentals", label: t.rentals },
    { path: "/about", label: t.about },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const overHero = path === "/" || HERO_PAGES.some((p) => path.startsWith(p));
  const solid = scrolled || open || !overHero;

  const langSwitch = (
    <Link
      href={href(other, path)}
      hrefLang={other}
      aria-label={t.switchLabel}
      className="flex items-center gap-1.5 text-[0.82rem] font-semibold tracking-[0.06em]"
    >
      <span className={lang === "en" ? "text-accent-2" : "text-ivory/60 hover:text-ivory"}>EN</span>
      <span className="text-ivory/30">|</span>
      <span className={lang === "es" ? "text-accent-2" : "text-ivory/60 hover:text-ivory"}>ES</span>
    </Link>
  );

  return (
    <header
      className={`dark fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-navy-950 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.6)]" : "bg-gradient-to-b from-navy-950/75 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between gap-3 px-4 sm:h-[84px] sm:gap-6 sm:px-5 lg:h-[92px] lg:px-8">
        <Link href={href(lang, "/")} className="flex min-w-0 shrink items-center gap-2.5 text-accent sm:gap-3.5" aria-label="Thomson Calabria">
          <Mark className="h-9 w-9 shrink-0 sm:h-12 sm:w-12 lg:h-14 lg:w-14" />
          <Wordmark size="nav" />
        </Link>

        <nav className="hidden items-center gap-8 xl:flex" aria-label="Main">
          {NAV.map((n) => {
            const active = path.startsWith(n.path);
            return (
              <Link
                key={n.path}
                href={href(lang, n.path)}
                className={`relative py-2 text-[0.98rem] font-medium transition-colors ${
                  active ? "text-accent-2" : "text-ivory/90 hover:text-ivory"
                }`}
              >
                {n.label}
                {active && <span className="absolute inset-x-0 -bottom-0.5 h-px bg-accent" />}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-6 xl:flex">
          {langSwitch}
          <Link href={href(lang, "/contact")} className="btn btn-solid btn-sm">
            {t.enquire}
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4 xl:hidden">
          {langSwitch}
          <button
            onClick={() => setOpen((v) => !v)}
            className="-mr-1.5 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            aria-label={t.menu}
            aria-expanded={open}
          >
            <span className={`h-px w-6 bg-ivory transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-ivory transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-6 bg-ivory transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-navy-950 px-5 pb-8 pt-2 xl:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {NAV.map((n) => (
              <Link key={n.path} href={href(lang, n.path)} className="border-b border-line py-3.5 font-display text-2xl text-ivory">
                {n.label}
              </Link>
            ))}
            <Link href={href(lang, "/contact")} className="btn btn-solid mt-6 w-full">
              {t.privateEnquiry}
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
