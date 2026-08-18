/**
 * Central site configuration — single source of truth for
 * branding, contact details and URLs used across pages, SEO tags
 * and structured data.
 */
export const site = {
  name: "Synaptro.AI",
  legalName: "Synaptro.AI",
  tagline: "Engineering Smarter Decisions",
  url: "https://synaptro.in",
  email: "Abhishekmis0201@gmail.com",
  /** Optional scheduling link (Calendly/Cal.com). Leave empty to hide "book a call" buttons that need it. */
  bookingUrl: "",
  location: "India · Serving clients worldwide",
  defaultOgImage: "/og-image.png",
} as const;

export const absoluteUrl = (path: string) =>
  `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
