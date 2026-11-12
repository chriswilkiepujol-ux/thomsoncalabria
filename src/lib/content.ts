import { createPublicClient } from "./supabase/public";
import type { Lang } from "./i18n";
import {
  CATEGORY_TEXT_ES,
  DEFAULT_ABOUT_ES,
  DEFAULT_BLOG_ES,
  DEFAULT_CATEGORY_ES,
  DEFAULT_CONSULTANCY_ES,
  DEFAULT_HOME_ES,
  LOCATIONS_ES,
} from "./content-es";

export type Accent = "gold" | "silver";

export type SiteSettings = {
  accent: Accent;
  email: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  address: string;
  tagline: string;
};

export type HomeContent = {
  heroKicker: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  introKicker: string;
  introTitle: string;
  introBody: string;
  pillars: { title: string; body: string }[];
  processTitle: string;
  process: { step: string; title: string; body: string }[];
  testimonials: { quote: string; name: string; place: string }[];
};

export type ConsultancyContent = {
  kicker: string;
  title: string;
  intro: string;
  image: string;
  services: { title: string; body: string }[];
  body: string[];
  author: string;
  seoTitle: string;
  seoDescription: string;
};

export type BlogContent = {
  kicker: string;
  title: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
};

export type AboutContent = {
  kicker: string;
  title: string;
  photo: string;
  body: string[];
  quote: string;
};

export type CategoryContent = {
  notice?: string;
  kicker: string;
  title: string;
  intro: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
  highlights: { title: string; body: string }[];
};

export type LocationContent = {
  name: string;
  country: string;
  kicker: string;
  title: string;
  intro: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
  body: string[];
};

export type KeyFact = { label: string; value: string };

export type Property = {
  id: string;
  slug: string;
  title: string;
  category: "hotel" | "restaurant" | "residential" | "rental";
  location: string;
  country: string;
  headline: string | null;
  description: string | null;
  price_label: string | null;
  key_facts: KeyFact[];
  title_es: string | null;
  headline_es: string | null;
  description_es: string | null;
  price_label_es: string | null;
  key_facts_es: KeyFact[];
  image_url: string | null;
  gallery: string[];
  off_market: boolean;
  featured: boolean;
  published: boolean;
  status: "available" | "under_offer" | "sold" | "withdrawn";
  sort_order: number;
  created_at: string;
  updated_at: string;
};

/** Category slugs are shared by both languages; the English labels are used in the admin. */
export const CATEGORIES = {
  hotel: { slug: "hotels", label: "Hotels", singular: "Hotel", nounPlural: "hotels" },
  restaurant: { slug: "restaurants", label: "Restaurants", singular: "Restaurant", nounPlural: "restaurants & venues" },
  residential: { slug: "residential", label: "Residential", singular: "Residence", nounPlural: "villas & apartments" },
  rental: { slug: "luxury-rentals", label: "Luxury Rentals", singular: "Luxury Rental", nounPlural: "luxury rentals" },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;
export type CategoryText = { label: string; singular: string; nounPlural: string };

export function catText(lang: Lang, key: CategoryKey): CategoryText {
  return lang === "es" ? CATEGORY_TEXT_ES[key] : CATEGORIES[key];
}

export function categoryFromSlug(slug: string): CategoryKey | null {
  const entry = (Object.entries(CATEGORIES) as [CategoryKey, (typeof CATEGORIES)[CategoryKey]][]).find(
    ([, v]) => v.slug === slug
  );
  return entry ? entry[0] : null;
}

export const LOCATIONS: Record<string, LocationContent> = {
  sotogrande: {
    name: "Sotogrande",
    country: "Spain",
    kicker: "Sotogrande · Cádiz",
    title: "Quiet money, polo fields and the Mediterranean.",
    intro:
      "Sotogrande is where Europe's most discreet families keep a second home — and a growing market for boutique hospitality. We handle hotels, restaurants and the finest estates here privately, alongside a select number of homes for sale.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80",
    seoTitle: "Hotels, Restaurants & Luxury Property in Sotogrande | Thomson Calabria",
    seoDescription:
      "Off-market hotels, restaurants and luxury estates in Sotogrande, plus a select collection of villas and apartments for sale.",
    body: [
      "Sotogrande occupies the eastern tip of the Costa del Sol: 2,000 hectares of gated estates, two of Europe's top-ranked golf courses (Valderrama and Real Club de Golf Sotogrande), the Santa María Polo Club and a deep-water marina. It is forty minutes from Gibraltar airport and an hour from Málaga.",
      "The best assets here — marina restaurants, boutique hospitality and the great plots of Kings & Queens and La Reserva — are often held by owners who prefer not to advertise. We know who is open to a quiet conversation, and bring it to the right buyer.",
    ],
  },
  marbella: {
    name: "Marbella",
    country: "Spain",
    kicker: "Marbella · Golden Mile",
    title: "The Golden Mile, Puente Romano and the Marbella Club.",
    intro:
      "Our roots are on Marbella's Golden Mile. Over fifteen years we have built a network of hotel, restaurant and property owners who prefer to sell quietly — and we offer our own luxury rentals at the Marbella Club.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=2000&q=80",
    seoTitle: "Hotels, Restaurants & Luxury Property in Marbella | Thomson Calabria",
    seoDescription:
      "Off-market hotels and restaurants on Marbella's Golden Mile, hospitality consultancy, a select collection of villas and apartments, and luxury rentals at the Marbella Club.",
    body: [
      "Marbella's Golden Mile runs from the old town to Puerto Banús and is anchored by two institutions: the Marbella Club and Puente Romano. It is one of Europe's most active markets for luxury hospitality, and our holiday rentals at the Marbella Club put guests right at its heart.",
      "Beyond the Mile, we work with hotel and restaurant proprietors across the municipality who are considering an exit but do not wish it known, and with owners in Sierra Blanca, La Zagaleta, Guadalmina Baja and Los Monteros.",
    ],
  },
  international: {
    name: "International",
    country: "International",
    kicker: "International · Off-market",
    title: "A selection of off-market opportunities beyond Spain.",
    intro:
      "Beyond Marbella and Sotogrande, we present a small selection of off-market hotels and properties internationally — through owners and partners we have known for years, and only ever in confidence.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=80",
    seoTitle: "International Off-Market Hotels & Property for Sale | Thomson Calabria",
    seoDescription:
      "A confidential selection of off-market hotels and properties for sale internationally. Direct with owners, with full details shared under NDA.",
    body: [
      "Some of the finest hotels and residences change hands without ever being advertised. Through long-standing relationships we are able to present a selection of these opportunities to qualified buyers, investors and funds.",
      "Details are shared privately, under NDA. Tell us what you are looking for and where, and we will tell you candidly what we can bring to the table.",
    ],
  },
};

export const DEFAULT_SETTINGS: SiteSettings = {
  accent: "gold",
  email: "info@thomsoncalabria.com",
  phone: "+34667252525",
  phoneDisplay: "+34 667 252 525",
  whatsapp: "34667252525",
  address: "Marbella & Sotogrande, Spain",
  tagline: "International Realty / Consultancy",
};

export const DEFAULT_HOME: HomeContent = {
  heroKicker: "Hotels · Restaurants · Consultancy · Residences",
  heroTitle: "Hospitality and luxury property, discreetly handled.",
  heroSubtitle:
    "Off-market sales of hotels and restaurants, hospitality consultancy and branding — plus a select collection of villas and apartments, and luxury private residences within the Marbella Club.",
  heroImage: "https://kfgzhurkaybmuxkuolxc.supabase.co/storage/v1/object/public/media/site/hero-villa-sharp.jpg",
  introKicker: "What we do",
  introTitle: "Off-market hotels and restaurants. Expert hospitality advice.",
  introBody:
    "Thomson Calabria brings together buyers, investors and funds with owners of hotels and restaurants who prefer to sell privately. Alongside each transaction we advise on hospitality strategy — from valuation and repositioning to securing an international hotel brand. We also offer a small collection of villas and apartments for sale, and luxury private residences to rent within the Marbella Club.",
  pillars: [
    {
      title: "Off-market hotels & restaurants",
      body: "Most of what we handle is never listed. We deal privately and directly with buyers, investors and funds.",
    },
    {
      title: "Hospitality consultancy",
      body: "Valuation, repositioning, operator introductions and hotel branding — advice from people who know the sector.",
    },
    {
      title: "Residences & rentals",
      body: "A select collection of villas and apartments, and luxury private residences to rent within the Marbella Club.",
    },
  ],
  processTitle: "Four simple steps.",
  process: [
    { step: "01", title: "Share your brief", body: "Tell us what you are looking for — the asset, location, budget and timing." },
    { step: "02", title: "Confidentiality", body: "For off-market opportunities we confirm you are a principal and sign a short NDA." },
    { step: "03", title: "Full details", body: "We share the dossier — location, photography, financials — and arrange viewings." },
    { step: "04", title: "Through to completion", body: "We negotiate and coordinate lawyers, notaries and advisors until the deal is done." },
  ],
  testimonials: [
    {
      quote:
        "Linda was central to our purchase of a penthouse in Puente Romano. Discreet, direct and completely on our side from start to finish.",
      name: "D. Speakman",
      place: "Monaco",
    },
    {
      quote:
        "I would not hesitate to recommend Linda. She found us an apartment in Puente Romano that was never on the market, and handled everything.",
      name: "D. Falzoni",
      place: "Geneva",
    },
    {
      quote:
        "Villa Magna was perfect and the personal attention throughout our stay was exceptional. We have returned every year since.",
      name: "N. Parry",
      place: "Prague",
    },
  ],
};

export const DEFAULT_ABOUT: AboutContent = {
  kicker: "Linda Thomson · Founder",
  title: "Fifteen years on the Golden Mile.",
  photo: "https://kfgzhurkaybmuxkuolxc.supabase.co/storage/v1/object/public/media/site/linda-thomson.jpg",
  body: [
    "Linda Thomson founded LT Properties Marbella in 2009 and quickly became known for her professionalism in Marbella's luxury property market, with a particular focus on Puente Romano and the Marbella Club on the Golden Mile. Thomson Calabria is the next chapter: Linda, now with her team, brings the same relationships and standards to the off-market sale of hotels and restaurants and to hospitality consultancy, including hotel branding.",
    "Every client is looked after personally. Our approach is tailored to the individual — their objectives, their timetable and the way they wish to hold an asset — and is underpinned by deep local knowledge, a long track record and a reputation for integrity and discretion.",
    "Alongside our hospitality work we continue to offer a select collection of villas and apartments for sale, and our own luxury private residences to rent within the Marbella Club.",
  ],
  quote: "Every client deserves the same care, whether they are renting for a week or buying a hotel.",
};

export const DEFAULT_CATEGORY: Record<CategoryKey, CategoryContent> = {
  hotel: {
    notice:
      "Please note: we do not normally list hotels publicly. Most hotel opportunities are offered privately to qualified buyers, investors and funds. Register your brief below and we will contact you, in confidence, when something suitable becomes available.",
    kicker: "Hotels",
    title: "Hotels for sale, handled in confidence.",
    intro:
      "A selection of off-market hotels in Marbella, Sotogrande and internationally. Owners come to us when they want a serious buyer, not a public sale process — and investors come to us for hotels they will not find on the market.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=80",
    seoTitle: "Off-Market Hotels for Sale — Marbella, Sotogrande & International",
    seoDescription:
      "Confidential access to a selection of off-market hotels in Marbella, Sotogrande and internationally. Full financials under NDA and LOI, for investors, funds and operators.",
    highlights: [
      { title: "Operating hotels", body: "Trading hotels from 20 to 300+ keys, with full financials shared under NDA and LOI (letter of intent)." },
      { title: "Conversion & development", body: "Licensed plots suitable for hospitality." },
      { title: "Branding & management", body: "We advise on securing the right brand or operator — before or after acquisition." },
    ],
  },
  restaurant: {
    kicker: "Restaurants & Venues",
    title: "The address, the licence, the terrace.",
    intro:
      "Beach clubs, fine-dining restaurants and hospitality venues in prime locations. Sold discreetly.",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=2000&q=80",
    seoTitle: "Off-Market Restaurants & Beach Clubs for Sale — Marbella & Sotogrande",
    seoDescription:
      "Discreet sale of restaurants, beach clubs and hospitality venues in prime locations in Marbella, Sotogrande and internationally. Direct with owners.",
    highlights: [
      { title: "Going concerns", body: "Established restaurants and beach clubs with trading history, licences and teams in place." },
      { title: "Freehold premises", body: "Front-line premises in prime locations, where the real estate is the prize." },
      { title: "Concepts seeking a home", body: "We also advise operators and groups looking for the right site for an expansion." },
    ],
  },
  residential: {
    kicker: "Residential",
    title: "A select collection of villas and apartments.",
    intro:
      "A small, carefully chosen selection of homes in Marbella — on the Golden Mile, in Puente Romano, the Marbella Club and La Zagaleta — and in Sotogrande, including Kings & Queens. Some listed, some offered privately.",
    image: "/images/residential-la-zagaleta.jpg",
    seoTitle: "Luxury Villas & Apartments for Sale — Marbella, Golden Mile, La Zagaleta, Sotogrande",
    seoDescription:
      "A select collection of luxury villas, penthouses and apartments for sale in Marbella, the Golden Mile, Puente Romano, the Marbella Club, La Zagaleta and Sotogrande.",
    highlights: [
      { title: "Resort residences", body: "The Golden Mile, Puente Romano, the Marbella Club and Sotogrande — the addresses we know best." },
      { title: "Estates & plots", body: "Plots in La Zagaleta, Kings & Queens and La Reserva for those who wish to build." },
      { title: "Tell us your brief", body: "If what you want is not shown, ask us — many homes are sold before they are ever listed." },
    ],
  },
  rental: {
    kicker: "Luxury Rentals",
    title: "Your luxury private residence at the Marbella Club Hotel Resort.",
    intro:
      "Our own collection of private luxury residences to rent within the grounds of the Marbella Club Hotel. Available for weekly or seasonal stays — personally looked after, with the resort's beach, spa and restaurants on your doorstep.",
    image: "/images/rental-casa-tanya.jpg",
    seoTitle: "Luxury Rentals within the Marbella Club — Villas & Apartments | Thomson Calabria",
    seoDescription:
      "Luxury holiday rentals at the Marbella Club on Marbella's Golden Mile. Personally managed villas and apartments for weekly or seasonal stays.",
    highlights: [
      { title: "Within the Marbella Club Hotel grounds", body: "Private residences within the resort, with access to its beach club, spa and restaurants." },
      { title: "Personally looked after", body: "Housekeeping, maid service and a personal chef can all be arranged on request." },
      { title: "Try before you buy", body: "Many of our buyers first rented with us. Should you require a rental while looking to buy, we can find you suitable accommodation in the area." },
    ],
  },
};

export const DEFAULT_CONSULTANCY: ConsultancyContent = {
  kicker: "Consultancy",
  title: "Hospitality consultancy and hotel branding.",
  intro:
    "Advice for hotel and restaurant owners, investors and operators — from valuation and repositioning to securing an international hotel brand — with the same discretion we bring to every off-market sale.",
  image: "/images/consultancy-la-villa.jpg",
  services: [
    { title: "Hotel branding", body: "Securing the right international brand, soft-brand collection or management agreement for your hotel." },
    { title: "Acquisition & disposal", body: "Strategy, pricing and a confidential process — whether you are buying or selling." },
    { title: "Valuation & repositioning", body: "A clear view of value and how to grow it: concept, positioning and capital works." },
    { title: "Operators & partners", body: "Introductions to operators, lenders, lawyers and advisors in each jurisdiction." },
  ],
  body: [
    "Every engagement is tailored and confidential. Tell us what you are trying to achieve and we will tell you, candidly, how we can help.",
  ],
  author: "",
  seoTitle: "Hospitality Consultancy & Hotel Branding — Marbella, Sotogrande | Thomson Calabria",
  seoDescription:
    "Hospitality consultancy for hotel and restaurant owners and investors: hotel branding, valuation, repositioning, acquisitions and disposals in Marbella, Sotogrande and beyond.",
};

export const DEFAULT_BLOG: BlogContent = {
  kicker: "Blog",
  title: "Out and about, and what is happening in property.",
  intro: "Notes on forthcoming events, places worth knowing, and the luxury property market.",
  seoTitle: "Blog — Events in Marbella & Sotogrande and Luxury Property News | Thomson Calabria",
  seoDescription:
    "Forthcoming events and the best restaurants in Marbella, Sotogrande and London, plus news and insight on the luxury property market.",
};

type ContentMap = {
  settings: SiteSettings;
  consultancy: ConsultancyContent;
  blog: BlogContent;
  home: HomeContent;
  about: AboutContent;
  "category:hotel": CategoryContent;
  "category:restaurant": CategoryContent;
  "category:residential": CategoryContent;
  "category:rental": CategoryContent;
  "location:sotogrande": LocationContent;
  "location:marbella": LocationContent;
  "location:international": LocationContent;
};

export type ContentKey = keyof ContentMap;

export function defaultFor<K extends ContentKey>(key: K, lang: Lang = "en"): ContentMap[K] {
  const es = lang === "es";
  if (key === "settings") return DEFAULT_SETTINGS as ContentMap[K];
  if (key === "home") return (es ? DEFAULT_HOME_ES : DEFAULT_HOME) as ContentMap[K];
  if (key === "about") return (es ? DEFAULT_ABOUT_ES : DEFAULT_ABOUT) as ContentMap[K];
  if (key === "consultancy") return (es ? DEFAULT_CONSULTANCY_ES : DEFAULT_CONSULTANCY) as ContentMap[K];
  if (key === "blog") return (es ? DEFAULT_BLOG_ES : DEFAULT_BLOG) as ContentMap[K];
  if (key.startsWith("category:")) {
    const k = key.slice(9) as CategoryKey;
    return (es ? DEFAULT_CATEGORY_ES[k] : DEFAULT_CATEGORY[k]) as ContentMap[K];
  }
  if (key.startsWith("location:")) {
    const k = key.slice(9);
    return (es ? LOCATIONS_ES[k] : LOCATIONS[k]) as ContentMap[K];
  }
  throw new Error(`Unknown content key ${key}`);
}

/** Database key for a content block in a language. Settings are shared by both languages. */
export function storageKey(key: ContentKey, lang: Lang) {
  return lang === "es" && key !== "settings" ? `${key}:es` : key;
}

const IMAGE_FIELDS = ["heroImage", "image", "photo"];

export async function getContent<K extends ContentKey>(key: K, lang: Lang = "en"): Promise<ContentMap[K]> {
  const supabase = createPublicClient();
  const keys = lang === "es" && key !== "settings" ? [key, `${key}:es`] : [key];
  const { data } = await supabase.from("site_content").select("key,value").in("key", keys);
  const rows = Object.fromEntries((data ?? []).map((r) => [r.key, r.value as Record<string, unknown>]));
  const defaults = defaultFor(key, lang);
  if (lang === "en" || key === "settings") return { ...defaults, ...(rows[key] ?? {}) } as ContentMap[K];

  // Spanish: Spanish defaults, then any images changed in English (photos are shared), then Spanish edits.
  const en = rows[key] ?? {};
  const sharedImages = Object.fromEntries(Object.entries(en).filter(([k]) => IMAGE_FIELDS.includes(k)));
  return { ...defaults, ...sharedImages, ...(rows[`${key}:es`] ?? {}) } as ContentMap[K];
}

/** Returns a property with its text in the requested language (Spanish falls back to English). */
export function localize(p: Property, lang: Lang): Property {
  if (lang === "en") return p;
  return {
    ...p,
    title: p.title_es || p.title,
    headline: p.headline_es || p.headline,
    description: p.description_es || p.description,
    price_label: p.price_label_es || p.price_label,
    key_facts: p.key_facts_es?.length ? p.key_facts_es : p.key_facts,
  };
}

export async function getProperties(
  opts: { category?: CategoryKey; location?: string; featured?: boolean; limit?: number; lang?: Lang } = {}
): Promise<Property[]> {
  const supabase = createPublicClient();
  let q = supabase
    .from("properties")
    .select("*")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (opts.category) q = q.eq("category", opts.category);
  if (opts.location) q = q.eq("location", opts.location);
  if (opts.featured) q = q.eq("featured", true);
  if (opts.limit) q = q.limit(opts.limit);
  const { data } = await q;
  return ((data ?? []) as Property[]).map((p) => localize(p, opts.lang ?? "en"));
}

export async function getProperty(slug: string, lang: Lang = "en"): Promise<Property | null> {
  const supabase = createPublicClient();
  const { data } = await supabase.from("properties").select("*").eq("slug", slug).eq("published", true).maybeSingle();
  return data ? localize(data as Property, lang) : null;
}

export function locationLabel(key: string, lang: Lang = "en") {
  const src = lang === "es" ? LOCATIONS_ES : LOCATIONS;
  return src[key]?.name ?? key.charAt(0).toUpperCase() + key.slice(1);
}

export function countryLabel(country: string, lang: Lang) {
  if (lang === "en") return country;
  const map: Record<string, string> = { Spain: "España", International: "Internacional" };
  return map[country] ?? country;
}
