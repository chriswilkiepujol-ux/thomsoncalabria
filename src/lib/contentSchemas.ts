// Field schemas that drive the "Pages & copy" editor in the admin.
export type Field =
  | { key: string; label: string; type: "text" | "textarea" | "image"; hint?: string }
  | { key: string; label: string; type: "select"; options: { value: string; label: string }[]; hint?: string }
  | { key: string; label: string; type: "paragraphs"; hint?: string }
  | { key: string; label: string; type: "list"; hint?: string; fields: { key: string; label: string; type: "text" | "textarea" }[] };

export type Section = { key: string; title: string; description: string; fields: Field[] };

const categoryFields: Field[] = [
  { key: "notice", label: "Notice box (optional, e.g. 'we do not normally list hotels')", type: "textarea" },
  { key: "kicker", label: "Small heading above the title", type: "text" },
  { key: "title", label: "Page title", type: "text" },
  { key: "intro", label: "Intro paragraph", type: "textarea" },
  { key: "image", label: "Hero image", type: "image" },
  { key: "highlights", label: "Three highlights", type: "list", fields: [{ key: "title", label: "Title", type: "text" }, { key: "body", label: "Text", type: "textarea" }] },
  { key: "seoTitle", label: "Google title (SEO)", type: "text", hint: "Under 60 characters, lead with the keyword." },
  { key: "seoDescription", label: "Google description (SEO)", type: "textarea", hint: "Under 155 characters." },
];

const locationFields: Field[] = [
  { key: "kicker", label: "Small heading above the title", type: "text" },
  { key: "title", label: "Page title", type: "text" },
  { key: "intro", label: "Intro paragraph", type: "textarea" },
  { key: "image", label: "Hero image", type: "image" },
  { key: "body", label: "Body paragraphs", type: "paragraphs" },
  { key: "seoTitle", label: "Google title (SEO)", type: "text" },
  { key: "seoDescription", label: "Google description (SEO)", type: "textarea" },
];

const ALL_SECTIONS: Section[] = [
  {
    key: "settings",
    title: "Contact details & look",
    description: "Phone, email and the metal accent used across the site.",
    fields: [
      { key: "accent", label: "Accent colour", type: "select", options: [{ value: "gold", label: "Gold" }, { value: "silver", label: "Silver" }] },
      { key: "email", label: "Email", type: "text" },
      { key: "phone", label: "Phone (digits only, with +)", type: "text", hint: "Used for click-to-call, e.g. +34667252525" },
      { key: "phoneDisplay", label: "Phone as displayed", type: "text" },
      { key: "whatsapp", label: "WhatsApp number (digits only, no +)", type: "text" },
      { key: "address", label: "Office line", type: "text" },
    ],
  },
  {
    key: "home",
    title: "Home page",
    description: "The hero, introduction, process steps and testimonials.",
    fields: [
      { key: "heroKicker", label: "Hero small heading", type: "text" },
      { key: "heroTitle", label: "Hero title", type: "text" },
      { key: "heroSubtitle", label: "Hero subtitle", type: "textarea" },
      { key: "heroImage", label: "Hero image", type: "image" },
      { key: "introKicker", label: "Intro small heading", type: "text" },
      { key: "introTitle", label: "Intro title", type: "text" },
      { key: "introBody", label: "Intro paragraph", type: "textarea" },
      { key: "pillars", label: "Three pillars", type: "list", fields: [{ key: "title", label: "Title", type: "text" }, { key: "body", label: "Text", type: "textarea" }] },
      { key: "processTitle", label: "Process section title", type: "text" },
      { key: "process", label: "Process steps", type: "list", fields: [{ key: "step", label: "Number", type: "text" }, { key: "title", label: "Title", type: "text" }, { key: "body", label: "Text", type: "textarea" }] },
      { key: "testimonials", label: "Testimonials", type: "list", fields: [{ key: "quote", label: "Quote", type: "textarea" }, { key: "name", label: "Name", type: "text" }, { key: "place", label: "Place", type: "text" }] },
    ],
  },
  {
    key: "about",
    title: "About page",
    description: "Your photo, bio and the quote.",
    fields: [
      { key: "kicker", label: "Small heading", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "photo", label: "Photo", type: "image" },
      { key: "body", label: "Bio paragraphs", type: "paragraphs" },
      { key: "quote", label: "Quote", type: "text" },
    ],
  },
  {
    key: "consultancy",
    title: "Consultancy page",
    description: "The services list and text on the Consultancy page.",
    fields: [
      { key: "kicker", label: "Small heading", type: "text" },
      { key: "title", label: "Page title", type: "text" },
      { key: "intro", label: "Intro paragraph", type: "textarea" },
      { key: "image", label: "Hero image", type: "image" },
      { key: "services", label: "Services", type: "list", fields: [{ key: "title", label: "Service", type: "text" }, { key: "body", label: "Short description", type: "textarea" }] },
      { key: "body", label: "Further paragraphs", type: "paragraphs" },
      { key: "author", label: "Signed by (optional, e.g. John …)", type: "text" },
      { key: "seoTitle", label: "Google title (SEO)", type: "text" },
      { key: "seoDescription", label: "Google description (SEO)", type: "textarea" },
    ],
  },
  { key: "category:hotel", title: "Hotels page", description: "", fields: categoryFields },
  { key: "category:restaurant", title: "Restaurants page", description: "", fields: categoryFields },
  { key: "category:residential", title: "Residential page", description: "", fields: categoryFields },
  { key: "category:rental", title: "Luxury Rentals page", description: "", fields: categoryFields },
  { key: "location:sotogrande", title: "Sotogrande page", description: "", fields: locationFields },
  { key: "location:marbella", title: "Marbella page", description: "", fields: locationFields },
  { key: "location:italy", title: "Italy page", description: "", fields: locationFields },
  { key: "location:dubai", title: "Dubai page", description: "", fields: locationFields },
];

// Same order as the website menu.
const ORDER = [
  "home",
  "category:hotel",
  "category:restaurant",
  "consultancy",
  "category:residential",
  "category:rental",
  "about",
  "settings",
  "location:marbella",
  "location:sotogrande",
  "location:italy",
  "location:dubai",
];
export const SECTIONS: Section[] = ORDER.map((k) => ALL_SECTIONS.find((s) => s.key === k)).filter((s): s is Section => !!s);
