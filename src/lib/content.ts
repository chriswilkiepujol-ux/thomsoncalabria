import { createPublicClient } from "./supabase/public";

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

export type AboutContent = {
  kicker: string;
  title: string;
  photo: string;
  body: string[];
  quote: string;
};

export type CategoryContent = {
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
  image_url: string | null;
  featured: boolean;
  published: boolean;
  status: "available" | "under_offer" | "sold" | "withdrawn";
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export const CATEGORIES = {
  hotel: {
    slug: "hotels",
    label: "Hotels",
    singular: "Hotel",
    nounPlural: "hotels & resorts",
  },
  restaurant: {
    slug: "restaurants",
    label: "Restaurants",
    singular: "Restaurant",
    nounPlural: "restaurants & hospitality venues",
  },
  residential: {
    slug: "residential",
    label: "Residential",
    singular: "Residence",
    nounPlural: "villas, penthouses & estates",
  },
  rental: {
    slug: "luxury-rentals",
    label: "Luxury Rentals",
    singular: "Luxury Rental",
    nounPlural: "luxury short-term rentals",
  },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

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
      "Sotogrande is where Europe's most discreet families keep a second home. Off-market villas in the Kings & Queens, La Reserva and Marina estates rarely reach the open market; they move through introductions.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80",
    seoTitle: "Off-Market Property in Sotogrande | Thomson & Calabria",
    seoDescription:
      "Private access to off-market villas, estates, hotels and restaurants in Sotogrande, Spain. Direct dealings with principals, no agent chains.",
    body: [
      "Sotogrande occupies the eastern tip of the Costa del Sol: 2,000 hectares of gated estates, two of Europe's top-ranked golf courses (Valderrama and Real Club de Golf Sotogrande), the Santa María Polo Club and a deep-water marina. It is forty minutes from Gibraltar airport and an hour from Málaga.",
      "The best properties here — the great plots of the Kings & Queens zone, the modern villas of La Reserva and the front-line marina penthouses — are held by families who do not advertise. Our mandate is to know who is open to a conversation, and to bring that conversation to the right principal.",
    ],
  },
  marbella: {
    name: "Marbella",
    country: "Spain",
    kicker: "Marbella · Golden Mile",
    title: "The Golden Mile, Puente Romano and the Marbella Club.",
    intro:
      "Our roots are on Marbella's Golden Mile. Fifteen years of handling residences in Puente Romano and around the Marbella Club have given us a private network of owners who sell quietly, and buyers who prefer it that way.",
    image: "/images/villa-pool-day.jpg",
    seoTitle: "Off-Market Property in Marbella & Puente Romano | Thomson & Calabria",
    seoDescription:
      "Discreet access to off-market villas, penthouses, hotels and restaurants on Marbella's Golden Mile, Puente Romano and the Marbella Club.",
    body: [
      "Marbella's Golden Mile runs from the old town to Puerto Banús and is anchored by two institutions: the Marbella Club and Puente Romano. Residences inside these resorts are among the most sought-after in southern Europe and trade almost exclusively by private treaty.",
      "Beyond the Mile, we work with owners in Sierra Blanca, La Zagaleta, Guadalmina Baja and Los Monteros, as well as hotel and restaurant proprietors across the municipality who are considering an exit but do not wish it known.",
    ],
  },
  italy: {
    name: "Italy",
    country: "Italy",
    kicker: "Italy · Capri, Amalfi & the Lakes",
    title: "Capri, the Amalfi Coast and the Italian lakes.",
    intro:
      "Through our Calabria partnership we reach a selective set of Italian opportunities: boutique hotels, historic palazzi and clifftop villas in Capri, Positano, Lake Como and beyond — offered only on a confidential basis.",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2000&q=80",
    seoTitle: "Off-Market Property in Italy — Capri, Amalfi, Lake Como | Thomson & Calabria",
    seoDescription:
      "Confidential access to off-market hotels, palazzi and villas in Capri, the Amalfi Coast and the Italian Lakes. Principal-to-principal.",
    body: [
      "Italy's most desirable addresses change hands within families and between acquaintances. Public listings represent a small fraction of what is actually for sale. Our Italian relationships give us sight of boutique hotels, restaurants with history and residences in locations where new construction is simply not permitted.",
      "We assist with the particular complexities of Italian acquisitions — heritage restrictions, pre-emption rights and the structuring of hospitality assets — alongside trusted local notaries and advisors.",
    ],
  },
  dubai: {
    name: "Dubai",
    country: "United Arab Emirates",
    kicker: "Dubai · Palm Jumeirah & Emirates Hills",
    title: "Trophy assets in the Gulf's capital of capital.",
    intro:
      "For investors and family offices looking to the Gulf, we source signature villas, branded residences and hospitality assets in Dubai through principals we have worked with for years.",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=2000&q=80",
    seoTitle: "Off-Market Property in Dubai | Thomson & Calabria",
    seoDescription:
      "Private access to off-market villas, branded residences and hotel assets in Dubai — Palm Jumeirah, Emirates Hills, Jumeirah Bay. Direct with principals.",
    body: [
      "Dubai's prime market moves fast and much of it moves privately. Palm Jumeirah frontage, Emirates Hills estates and Jumeirah Bay plots are frequently traded between principals before any portal is involved.",
      "We work with established Dubai partners to present qualified opportunities to our clients and to introduce international buyers to sellers who value discretion.",
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
  heroKicker: "Off-market · By introduction only",
  heroTitle: "The properties you will never see advertised.",
  heroSubtitle:
    "Hotels, restaurants and private residences in Sotogrande, Marbella and a handful of the world's finest addresses — offered discreetly, principal to principal.",
  heroImage: "/images/hero-villa.jpg",
  introKicker: "A different kind of realty",
  introTitle: "We do not list. We introduce.",
  introBody:
    "Thomson & Calabria is an international realty and consultancy practice built on one idea: the most valuable properties are sold quietly. We work directly with owners who prefer not to advertise and with buyers, investors and family offices who prefer not to be marketed to. There are no portals, no agent chains and no photographs of other people's homes on the internet. There is a conversation, and then there is a key.",
  pillars: [
    {
      title: "Genuinely off-market",
      body: "Every opportunity we handle comes from a direct relationship with the owner. Nothing we present is available through a portal or another agency.",
    },
    {
      title: "Principal to principal",
      body: "We deal with the buyer, the investor or the fund — not with intermediaries. Fewer people in the room means better terms and complete confidentiality.",
    },
    {
      title: "Three asset classes, one standard",
      body: "Hotels, restaurants and residences. Different assets, the same discretion, the same due diligence and the same personal attention from the first call to completion.",
    },
  ],
  processTitle: "How a conversation becomes a key",
  process: [
    {
      step: "01",
      title: "A brief, not a browse",
      body: "Tell us what you are looking for — asset type, locations, budget and timing. The more we understand, the more precisely we can match you to an owner.",
    },
    {
      step: "02",
      title: "Qualification & NDA",
      body: "We verify that we are speaking with a principal or their mandated advisor. A short confidentiality agreement protects the owner's privacy and yours.",
    },
    {
      step: "03",
      title: "Private disclosure",
      body: "Only then do we share the full dossier: address, photography, financials and the owner's position. Viewings are arranged personally.",
    },
    {
      step: "04",
      title: "Negotiation to completion",
      body: "We lead negotiations, coordinate lawyers, notaries and structuring advice in each jurisdiction, and stay with you until the keys change hands.",
    },
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
  photo: "/images/linda-thomson.jpg",
  body: [
    "Linda Thomson founded LT Properties Marbella in 2009 and quickly became known for her professionalism in Marbella's luxury property market, with a particular focus on Puente Romano and the Marbella Club on the Golden Mile. Thomson & Calabria is the next chapter: the same relationships and the same standards, applied internationally and exclusively to off-market opportunities.",
    "Linda works personally with every client. Her approach is tailored to the individual — their lifestyle, their timetable and the way they wish to hold an asset — and is underpinned by deep local knowledge, a long track record and a reputation for integrity and genuine customer care.",
    "For buyers, she guides the entire process of acquiring property in Spain and abroad, from the first conversation to the notary, and is happy to show newcomers the area: golf, dining, schools, beaches and the rhythm of life on the coast. For owners, she offers a confidential, no-obligation opinion of value and a plan to achieve the best outcome without ever exposing the property publicly.",
  ],
  quote: "The best properties are never advertised. They are introduced.",
};

export const DEFAULT_CATEGORY: Record<CategoryKey, CategoryContent> = {
  hotel: {
    kicker: "Hotels & Resorts",
    title: "Hospitality assets, acquired in silence.",
    intro:
      "Boutique hotels on the Golden Mile, resort assets in Sotogrande, historic properties in Italy. Owners come to us when they want a serious buyer, not a public sale process.",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=80",
    seoTitle: "Off-Market Hotels for Sale — Marbella, Sotogrande, Italy, Dubai",
    seoDescription:
      "Confidential access to off-market hotels and resort assets in Marbella, Sotogrande, Italy and Dubai. For investors, funds and operators dealing directly with principals.",
    highlights: [
      {
        title: "Operating hotels & resorts",
        body: "Trading assets from 20 to 300+ keys, with full financials disclosed under NDA.",
      },
      {
        title: "Conversion & development",
        body: "Palaces, fincas and licensed plots suitable for boutique hospitality.",
      },
      {
        title: "Branded & managed",
        body: "Opportunities with existing management agreements or brand partnerships in place.",
      },
    ],
  },
  restaurant: {
    kicker: "Restaurants & Venues",
    title: "The address, the licence, the terrace.",
    intro:
      "Beach clubs, fine-dining restaurants and hospitality venues in locations where new licences are near impossible to obtain. Sold quietly, so that staff, suppliers and regulars never read about it first.",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=2000&q=80",
    seoTitle: "Off-Market Restaurants & Beach Clubs for Sale — Marbella, Sotogrande, Italy",
    seoDescription:
      "Discreet sale of restaurants, beach clubs and hospitality venues in Marbella, Sotogrande, Italy and Dubai. Freeholds, leaseholds and going concerns — direct with owners.",
    highlights: [
      {
        title: "Going concerns",
        body: "Established restaurants and beach clubs with trading history, licences and teams in place.",
      },
      {
        title: "Freehold premises",
        body: "Front-line and marina premises where the real estate is the prize.",
      },
      {
        title: "Concepts seeking a home",
        body: "We also advise operators and groups looking for the right site for an expansion.",
      },
    ],
  },
  residential: {
    kicker: "Private Residences",
    title: "Villas, penthouses and estates that were never for sale.",
    intro:
      "Front-line Puente Romano penthouses, Sotogrande estates, Capri villas. The owners we work with would rather have one serious conversation than a hundred viewings.",
    image: "/images/villa-stair.jpg",
    seoTitle: "Off-Market Luxury Villas & Penthouses — Marbella, Sotogrande, Capri, Dubai",
    seoDescription:
      "Private access to off-market villas, penthouses and estates in Marbella, Puente Romano, Sotogrande, Capri and Dubai. For buyers who value discretion.",
    highlights: [
      {
        title: "Resort residences",
        body: "Puente Romano, Marbella Club and Sotogrande Marina — the addresses that rarely trade publicly.",
      },
      {
        title: "Estates & plots",
        body: "Large plots in La Zagaleta, Kings & Queens and La Reserva for those who wish to build.",
      },
      {
        title: "International",
        body: "A curated set of residences in Capri, the Amalfi Coast, Lake Como and Dubai.",
      },
    ],
  },
  rental: {
    kicker: "Luxury Short-Term Rentals",
    title: "A private home on the Golden Mile, for a week or a season.",
    intro:
      "A hand-picked collection of villas and residences in Puente Romano, the Marbella Club and Sotogrande, available for short stays — with the personal attention our purchasing clients enjoy.",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2000&q=80",
    seoTitle: "Luxury Villa Rentals — Puente Romano, Marbella Club & Sotogrande",
    seoDescription:
      "Luxury short-term villa and apartment rentals in Puente Romano, the Marbella Club and Sotogrande. Personally managed, privately offered.",
    highlights: [
      {
        title: "Puente Romano & Marbella Club",
        body: "Residences inside the two resorts, with access to their restaurants, spas and beach clubs.",
      },
      {
        title: "Villas with staff",
        body: "Private villas with housekeeping, chef and concierge arranged on request.",
      },
      {
        title: "Try before you buy",
        body: "Many of our buyers first rented with us. We are glad to arrange a stay in the area you are considering.",
      },
    ],
  },
};

type ContentMap = {
  settings: SiteSettings;
  home: HomeContent;
  about: AboutContent;
  "category:hotel": CategoryContent;
  "category:restaurant": CategoryContent;
  "category:residential": CategoryContent;
  "category:rental": CategoryContent;
  "location:sotogrande": LocationContent;
  "location:marbella": LocationContent;
  "location:italy": LocationContent;
  "location:dubai": LocationContent;
};

export function defaultFor<K extends keyof ContentMap>(key: K): ContentMap[K] {
  if (key === "settings") return DEFAULT_SETTINGS as ContentMap[K];
  if (key === "home") return DEFAULT_HOME as ContentMap[K];
  if (key === "about") return DEFAULT_ABOUT as ContentMap[K];
  if (key.startsWith("category:")) {
    return DEFAULT_CATEGORY[key.slice(9) as CategoryKey] as ContentMap[K];
  }
  if (key.startsWith("location:")) {
    return LOCATIONS[key.slice(9)] as ContentMap[K];
  }
  throw new Error(`Unknown content key ${key}`);
}

export async function getContent<K extends keyof ContentMap>(key: K): Promise<ContentMap[K]> {
  const supabase = createPublicClient();
  const { data } = await supabase.from("site_content").select("value").eq("key", key).maybeSingle();
  const defaults = defaultFor(key);
  if (!data?.value) return defaults;
  return { ...defaults, ...(data.value as object) } as ContentMap[K];
}

export async function getProperties(opts: {
  category?: CategoryKey;
  location?: string;
  featured?: boolean;
  limit?: number;
} = {}): Promise<Property[]> {
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
  return (data ?? []) as Property[];
}

export async function getProperty(slug: string): Promise<Property | null> {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return (data as Property) ?? null;
}

export function locationLabel(key: string) {
  return LOCATIONS[key]?.name ?? key.charAt(0).toUpperCase() + key.slice(1);
}
