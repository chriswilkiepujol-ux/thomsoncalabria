# Thomson & Calabria — thomsoncalabria.com

International realty / consultancy site. Next.js 16 (App Router) + Tailwind v4 + Supabase (content, properties, enquiries, admin auth, media storage). Deployed on Vercel.

## Structure
- `src/app/(site)` — public pages: home, `/hotels`, `/restaurants`, `/residential`, `/luxury-rentals`, `/locations/*`, `/properties/[slug]`, `/about`, `/contact`
- `src/app/admin` — Linda's admin (Supabase Auth): properties, page copy, enquiries
- `src/lib/content.ts` — default copy for every page (used until edited in the admin) + data access
- `src/lib/contentSchemas.ts` — the fields the admin editor shows for each page
- `next.config.ts` — 301 redirects from the old ltpropertiesmarbella.com URL structure

## Environment variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=https://thomsoncalabria.com
# optional — email notification of enquiries via Resend
RESEND_API_KEY=
ENQUIRY_TO=info@thomsoncalabria.com
ENQUIRY_FROM="Thomson & Calabria <enquiries@thomsoncalabria.com>"
```

## Palette preview
Append `?accent=silver` or `?accent=gold` to any page to preview the alternative accent. The permanent choice is set in Admin → Pages & copy → Contact details & look.

## Migrating ltpropertiesmarbella.com
Add `ltpropertiesmarbella.com` (and `www`) as additional domains on the Vercel project and point its DNS at Vercel. The redirect map in `next.config.ts` then sends every old URL to its new equivalent with a 301, carrying the SEO equity over.
