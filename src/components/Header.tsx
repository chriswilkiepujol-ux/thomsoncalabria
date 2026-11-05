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
  { href: "/locations", label: "Locations" },
  { href: "/about", label: "Linda Thomson" },
];

export function Header({ phoneDisplay, phone }: { phoneDisplay: string; phone: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-navy-950/85 backdrop-blur-md border-b border-line"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-4 text-accent" aria-label="Thomson & Calabria home">
          <Mark className={`transition-all duration-500 ${scrolled ? "h-9 w-9" : "h-11 w-11"}`} />
          <Wordmark size="sm" />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`link-underline text-[0.7rem] uppercase tracking-[0.24em] transition-colors ${
                pathname.startsWith(n.href) ? "text-accent" : "text-ivory/80 hover:text-ivory"
              }`}
            >
              {n.label}
            </Link>
          ))}
          <Link href="/contact" className="btn text-[0.66rem] !py-3 !px-6">
            <span>Private Enquiry</span>
          </Link>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 p-2 lg:hidden"
          aria-label="Menu"
          aria-expanded={open}
        >
          <span className={`h-px w-7 bg-ivory transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-px w-7 bg-ivory transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-7 bg-ivory transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-navy-950/95 px-6 pb-10 pt-6 lg:hidden">
          <nav className="flex flex-col gap-6">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="font-display text-3xl font-light text-ivory">
                {n.label}
              </Link>
            ))}
            <Link href="/contact" className="btn btn-solid mt-4 justify-center">
              <span>Private Enquiry</span>
            </Link>
            <a href={`tel:${phone}`} className="text-center text-sm tracking-widest text-mist">
              {phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
