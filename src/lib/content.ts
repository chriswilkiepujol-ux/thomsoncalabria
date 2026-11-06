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
      "Sotogrande is where Europe's most discreet families keep a second home. We offer villas and apartments for sale and rent here, and handle the finest estates in Kings & Queens, La Reserva and the Marina privately.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80",
    seoTitle: "Luxury Property for Sale & Rent in Sotogrande | Thomson Calabria",
    seoDescription:
      "Luxury villas and apartments for sale and rent in Sotogrande, plus discreet off-market sales of estates, hotels and restaurants.",
    body: [
      "Sotogrande occupies the eastern tip of the Costa del Sol: 2,000 hectares of gated estates, two of Europe's top-ranked golf courses (Valderrama and Real Club de Golf Sotogrande), the Santa María Polo Club and a deep-water marina. It is forty minutes from Gibraltar airport and an hour from Málaga.",
      "The best properties here — the great plots of the Kings & Queens zone, the modern villas of La Reserva and the front-line marina penthouses — are often held by families who prefer not to advertise. Alongside our listed homes, we know who is open to a quiet conversation — and bring it to the right buyer.",
    ],
  },
  marbella: {
    name: "Marbella",
    country: "Spain",
    kicker: "Marbella · Golden Mile",
    title: "The Golden Mile, Puente Romano and the Marbella Club.",
    intro:
      "Our roots are on Marbella's Golden Mile. For over fifteen years we have sold and rented residences in Puente Romano and around the Marbella Club — and built a network of owners who prefer to sell quietly.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=2000&q=80",
    seoTitle: "Luxury Property in Marbella, Puente Romano & Marbella Club | Thomson Calabria",
    seoDescription:
      "Luxury villas and apartments for sale and holiday rental on Marbella's Golden Mile, Puente Romano and the Marbella Club, plus discreet hotel and restaurant sales.",
    body: [
      "Marbella's Golden Mile runs from the old town to Puerto Banús and is anchored by two institutions: the Marbella Club and Puente Romano. Residences inside these resorts are among the most sought-after in southern Europe, and our holiday rentals at the Marbella Club put guests right at its heart.",
      "Beyond the Mile, we work with owners in Sierra Blanca, La Zagaleta, Guadalmina Baja and Los Monteros, as well as hotel and restaurant proprietors across the municipality who are considering an exit but do not wish it known.",
    ],
  },
  italy: {
    name: "Italy",
    country: "Italy",
    kicker: "Italy · Capri, Amalfi & the Lakes",
    title: "Capri, the Amalfi Coast and the Italian lakes.",
    intro:
      "Through trusted relationships in Italy we reach a selective set of opportunities: boutique hotels, historic palazzi and clifftop villas in Capri, Positano, Lake Como and beyond — offered only on a confidential basis.",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2000&q=80",
    seoTitle: "Off-Market Property in Italy — Capri, Amalfi, Lake Como | Thomson Calabria",
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
    seoTitle: "Off-Market Property in Dubai | Thomson Calabria",
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
  heroKicker: "Marbella · Sotogrande · International",
  heroTitle: "Exceptional property, personally handled.",
  heroSubtitle:
    "Luxury homes for sale and holiday rental in Marbella and Sotogrande — and discreet, off-market sales of hotels and restaurants for buyers, investors and funds.",
  heroImage: "https://kfgzhurkaybmuxkuolxc.supabase.co/storage/v1/object/public/media/site/hero-villa-sharp.jpg",
  introKicker: "What we do",
  introTitle: "Listed when it suits. Private when it matters.",
  introBody:
    "We list villas, apartments and holiday rentals with the personal service Linda has been known for since 2009. Alongside them, owners of hotels, restaurants and the most exceptional homes come to us for a discreet sale to qualified buyers. Tell us what you are looking for and we will show you what is available — listed or not.",
  pillars: [
    {
      title: "Homes & rentals",
      body: "Villas and apartments for sale, and our own holiday rentals at the Marbella Club and beyond.",
    },
    {
      title: "Off-market hospitality",
      body: "Hotels and restaurants are rarely listed. We deal privately and directly with buyers, investors and funds.",
    },
    {
      title: "Personal service",
      body: "Linda handles every client herself, from the first call to the day the keys change hands.",
    },
  ],
  processTitle: "Four simple steps.",
  process: [
    {
      step: "01",
      title: "Share your brief",
      body: "Tell us the type of property, location, budget and timing — or the dates of your stay.",
    },
    {
      step: "02",
      title: "A personal shortlist",
      body: "Listed homes and, where right, private opportunities. Off-market details follow a short NDA.",
    },
    {
      step: "03",
      title: "Viewings",
      body: "We arrange viewings in person or by video, and show you the area if you are new to it.",
    },
    {
      step: "04",
      title: "Through to completion",
      body: "We negotiate and coordinate lawyers and notaries until the keys are yours.",
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
  photo: "https://kfgzhurkaybmuxkuolxc.supabase.co/storage/v1/object/public/media/site/linda-thomson.jpg",
  body: [
    "Linda Thomson founded LT Properties Marbella in 2009 and quickly became known for her professionalism in Marbella's luxury property market, with a particular focus on Puente Romano and the Marbella Club on the Golden Mile. Thomson Calabria is the next chapter: the same relationships and the same standards, with a wider international reach and a dedicated, discreet service for hotels, restaurants and the most exceptional homes.",
    "Linda works personally with every client. Her approach is tailored to the individual — their lifestyle, their timetable and the way they wish to hold an asset — and is underpinned by deep local knowledge, a long track record and a reputation for integrity and genuine customer care.",
    "For buyers, she guides the entire process of acquiring property in Spain and abroad, from the first conversation to the notary, and is happy to show newcomers the area: golf, dining, schools, beaches and the rhythm of life on the coast. For owners, she offers a confidential, no-obligation opinion of value and a plan to achieve the best outcome — on the open market or, if they prefer, entirely privately.",
  ],
  quote: "Every client deserves the same care, whether they are renting for a week or buying a hotel.",
};

export const DEFAULT_CATEGORY: Record<CategoryKey, CategoryContent> = {
  hotel: {
    notice:
      "Please note: we do not normally list hotels publicly. Most hotel opportunities are offered privately to qualified buyers, investors and funds. Register your brief below and we will contact you, in confidence, when something suitable becomes available.",
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
    kicker: "Residential",
    title: "Villas, penthouses and apartments for sale.",
    intro:
      "Homes on the Golden Mile, in Puente Romano, the Marbella Club and Sotogrande — plus a small number of exceptional residences we offer privately.",
    image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=2000&q=80",
    seoTitle: "Luxury Villas & Apartments for Sale — Marbella, Puente Romano, Sotogrande",
    seoDescription:
      "Luxury villas, penthouses and apartments for sale in Marbella, Puente Romano, the Marbella Club and Sotogrande — plus private, off-market residences.",
    highlights: [
      {
        title: "Resort residences",
        body: "Puente Romano, the Marbella Club and Sotogrande Marina — the addresses we know best."
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

export const DEFAULT_CONSULTANCY: ConsultancyContent = {
  kicker: "Consultancy",
  title: "Advice for owners, investors and operators.",
  intro:
    "Beyond buying and selling, we advise on how to acquire, hold, reposition or exit luxury and hospitality property in Spain and abroad — with the same discretion we bring to every off-market sale.",
  image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80",
  services: [
    { title: "Acquisition strategy", body: "Defining the brief, the locations and the structure before a search begins." },
    { title: "Valuation & pricing", body: "A confidential view of value and the right moment to sell — without going to market." },
    { title: "Hospitality advisory", body: "Hotel and restaurant acquisitions, operator introductions and repositioning." },
    { title: "Investment & structuring", body: "Working alongside lawyers, tax advisors and notaries in each jurisdiction." },
  ],
  body: [
    "Every engagement is tailored and confidential. Tell us what you are trying to achieve and we will tell you, candidly, how we can help.",
  ],
  author: "",
  seoTitle: "Luxury Property & Hospitality Consultancy — Marbella, Sotogrande | Thomson Calabria",
  seoDescription:
    "Discreet consultancy for investors, owners and operators: acquisition strategy, valuation, hotel and restaurant advisory and structuring in Marbella, Sotogrande and beyond.",
};

export const DEFAULT_BLOG: BlogContent = {
  kicker: "Blog",
  title: "Out and about, and what is happening in property.",
  intro: "Notes from Linda on forthcoming events, places worth knowing, and the luxury property market.",
  seoTitle: "Blog — Events in Marbella & Sotogrande and Luxury Property News | Thomson Calabria",
  seoDescription:
    "Linda Thomson's blog: forthcoming events and the best restaurants in Marbella, Sotogrande and London, plus news and insight on the luxury property market.",
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
  "location:italy": LocationContent;
  "location:dubai": LocationContent;
};

export function defaultFor<K extends keyof ContentMap>(key: K): ContentMap[K] {
  if (key === "settings") return DEFAULT_SETTINGS as ContentMap[K];
  if (key === "home") return DEFAULT_HOME as ContentMap[K];
  if (key === "about") return DEFAULT_ABOUT as ContentMap[K];
  if (key === "consultancy") return DEFAULT_CONSULTANCY as ContentMap[K];
  if (key === "blog") return DEFAULT_BLOG as ContentMap[K];
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
