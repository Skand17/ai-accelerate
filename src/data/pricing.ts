/*
 * All commercial numbers live here in ONE place so they're easy to adjust.
 * Figures are indicative ranges in USD — tune them per market/currency
 * before running paid campaigns.
 */

export interface Package {
  id: string;
  name: string;
  audience: string;
  priceRange: string;
  timeline: string;
  hostingCost: string;
  popular?: boolean;
  includes: string[];
}

export const packages: Package[] = [
  {
    id: "informative",
    name: "Business / Informative Website",
    audience: "Clinics, consultants, agencies, restaurants, local businesses, portfolios",
    priceRange: "$600 – $1,500",
    timeline: "5–7 days",
    hostingCost: "$0–5 / month",
    includes: [
      "Up to 10 custom-designed pages",
      "Static architecture — instant loads, near-zero hosting",
      "Contact form + WhatsApp/call buttons",
      "Full SEO setup: meta, sitemap, structured data, llms.txt",
      "CMS access — edit text, photos & blog yourself",
      "Analytics + Google Business Profile guidance",
    ],
  },
  {
    id: "education",
    name: "Education / Course Platform",
    audience: "Coaching institutes, trainers, schools, course creators",
    priceRange: "$2,500 – $8,000",
    timeline: "3–5 weeks",
    hostingCost: "$20–60 / month",
    popular: true,
    includes: [
      "Student login & role-based access",
      "Video lessons (secure embeds or hosted video)",
      "PDF / notes upload & download library",
      "Course catalog, batches & progress tracking",
      "Payment gateway for course sales",
      "Admin panel — upload videos & PDFs yourself",
    ],
  },
  {
    id: "ecommerce",
    name: "E-commerce Store",
    audience: "D2C brands, retailers, wholesalers moving online",
    priceRange: "$2,000 – $7,000",
    timeline: "3–6 weeks",
    hostingCost: "$20–80 / month",
    includes: [
      "Product catalog with search & filters",
      "Cart, checkout & payment gateway (Stripe/Razorpay/PayPal)",
      "Order management & customer accounts",
      "Inventory admin panel — manage products yourself",
      "Shipping & tax configuration",
      "Sales analytics dashboard",
    ],
  },
  {
    id: "custom-app",
    name: "Custom Web App / MVP",
    audience: "Startups & businesses building a product or portal",
    priceRange: "Fixed quote after free scoping call",
    timeline: "15 days (MVP sprint) — complex builds 4–8 weeks",
    hostingCost: "$20–100 / month",
    includes: [
      "Fixed 15-day MVP sprint for startup products",
      "Custom dashboards, portals & AI features",
      "Authentication, payments & integrations",
      "Scalable cloud architecture (AWS/GCP)",
      "30 days post-launch support included",
      "You own 100% of the code & accounts",
    ],
  },
];

export const paymentSchedule = [
  {
    item: "Website / app development",
    when: "One-time, fixed price",
    detail:
      "Quoted before we start — typically 50% to begin, 50% at launch. No hourly billing, no surprise invoices.",
  },
  {
    item: "Domain name",
    when: "Yearly · paid by you",
    detail:
      "Registered and renewed in YOUR own account (~$10–15/year), so you always own your name — even if we part ways.",
  },
  {
    item: "Hosting & server",
    when: "Monthly or yearly · at provider cost",
    detail:
      "Billed directly by the provider at actual cost — $0–5/mo for static sites, $20–100/mo for dynamic platforms. Yearly billing usually saves 15–20%. We set it up; you own the account.",
  },
  {
    item: "Maintenance (optional)",
    when: "Monthly or yearly plan",
    detail:
      "Content edits via your CMS are free forever — you do them yourself. Optional care plans cover code updates, backups, monitoring, and dev hours.",
  },
];

export const hostingMatrix = [
  {
    type: "Informative / static website",
    hosting: "$0–5 / month",
    storage: "Generous free tiers — ~100 GB bandwidth/month, ample for images & pages",
    notes: "Vercel / Netlify / Cloudflare. Often completely free for typical traffic.",
  },
  {
    type: "Education platform",
    hosting: "$20–60 / month",
    storage: "50–100 GB file storage included; videos via secure embeds (unlimited) or cloud video hosting",
    notes: "Scales to terabytes on S3/R2 cloud storage as your library grows.",
  },
  {
    type: "E-commerce store",
    hosting: "$20–80 / month",
    storage: "50+ GB for product images & assets, CDN-delivered worldwide",
    notes: "Cost grows with traffic and catalog size — we optimize before we upsize.",
  },
  {
    type: "Custom web app / MVP",
    hosting: "$20–100 / month",
    storage: "Sized to your data — database + object storage, scalable on demand",
    notes: "AWS / GCP with cost monitoring so bills never surprise you.",
  },
];

export const maintenancePlans = [
  {
    name: "Self-Serve",
    price: "Free",
    description:
      "Every build includes CMS/admin access and a handover session. Change photos, text, products, videos, and blog posts yourself — no developer needed.",
    features: ["CMS / admin panel access", "Handover training session", "Documentation", "You own all code & accounts"],
  },
  {
    name: "Care Plan",
    price: "$49–99 / month",
    description:
      "We keep the site healthy: updates, backups, monitoring — plus a monthly bucket of change requests handled for you.",
    features: [
      "Security updates & backups",
      "Uptime & performance monitoring",
      "Up to 2 hours of changes / month",
      "Priority email support",
    ],
  },
  {
    name: "Growth Plan",
    price: "$199+ / month",
    description:
      "Care Plan plus ongoing SEO, content, and conversion optimization — for sites that are a sales channel, not a brochure.",
    features: [
      "Everything in Care Plan",
      "Monthly SEO work & reporting",
      "Landing pages & A/B tests",
      "Quarterly strategy call",
    ],
  },
];

export const techStack = [
  {
    layer: "Frontend",
    tech: "React + TypeScript + Tailwind CSS",
    why: "Fast, modern, maintainable UIs — the same stack this site is built with (React 18 + Vite).",
  },
  {
    layer: "Backend",
    tech: "Node.js or Python (FastAPI)",
    why: "Battle-tested, huge talent pool, first-class AI/ML ecosystem for intelligent features.",
  },
  {
    layer: "Database",
    tech: "PostgreSQL + object storage (S3/R2)",
    why: "Reliable relational data plus cheap, infinitely scalable file/video/PDF storage.",
  },
  {
    layer: "Hosting & servers",
    tech: "Vercel / Netlify / Cloudflare (static) · AWS / GCP (dynamic)",
    why: "Static sites on global CDNs at near-zero cost; dynamic platforms on scalable cloud with CI/CD.",
  },
  {
    layer: "CMS / Admin",
    tech: "Headless CMS or custom admin panel",
    why: "So you can edit content, upload media, and manage products without touching code.",
  },
];
