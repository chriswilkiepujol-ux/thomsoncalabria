// Field schemas that drive the "Pages & copy" editor in the admin.
export type Field =
  | { key: string; label: string; type: "text" | "textarea" | "image"; hint?: string }
  | { key: string; label: string; type: "select"; options: { value: string; label: string }[]; hint?: string }
  | { key: string; label: string; type: "paragraphs"; hint?: string }
  | { key: string; label: string; type: "list"; hint?: string; fields: { key: string; label: string; type: "text" | "textarea" }[] };

export type Section = { key: string; title: string; description: string; fields: Field[] };

const categoryFields: Field[] = [
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

export const SECTIONS: Section[] = [
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
    title: "About Linda",
    description: "Your photo, bio and the quote.",
    fields: [
      { key: "kicker", label: "Small heading", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "photo", label: "Photo", type: "image" },
      { key: "body", label: "Bio paragraphs", type: "paragraphs" },
      { key: "quote", label: "Quote", type: "text" },
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
