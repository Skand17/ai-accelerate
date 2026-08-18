import { Gauge, Lock, PenLine, Search, Server, Smartphone } from "lucide-react";
import { ServiceLanding } from "@/components/ServiceLanding";

const StaticWebsitePage = () => (
  <ServiceLanding
    path="/services/static-website-development"
    seoTitle="Static Website Development — Fast, Secure Business Websites in 7 Days"
    seoDescription="Professional static website development: custom-designed business websites and landing pages that load instantly, cost $0–5/month to host, and rank on Google. Live in 5–7 days with CMS access to edit content yourself."
    eyebrow="Static Website Development"
    heading="A Professional Website,"
    headingHighlight="Live in 7 Days"
    subheading="Custom-designed, blazing-fast websites for businesses that need to be found, trusted, and contacted — without paying for complexity they don't need."
    serviceName="Static Website Development"
    bullets={[
      "Live in 5–7 days, from $600 with a fixed quote",
      "Hosting costs $0–5/month — often completely free",
      "Edit photos, text & blog yourself with CMS access",
      "SEO-ready from day one: sitemap, structured data, llms.txt",
    ]}
    sections={[
      {
        icon: Gauge,
        title: "Loads in milliseconds",
        description:
          "Pages are pre-built and served from a global CDN. Speed is the #1 ranking and conversion factor — static wins it by design.",
      },
      {
        icon: Lock,
        title: "Nearly impossible to hack",
        description:
          "No database, no server-side code, no plugins to exploit. Static sites remove the entire attack surface WordPress sites struggle with.",
      },
      {
        icon: Server,
        title: "Near-zero hosting cost",
        description:
          "Hosted on Vercel, Netlify, or Cloudflare in an account you own. Typical bill: $0. You pay only for your domain (~$10–15/year).",
      },
      {
        icon: Search,
        title: "SEO-first build",
        description:
          "Per-page meta tags, structured data, XML sitemap, llms.txt, and Core Web Vitals in the green — visible to Google and AI assistants alike.",
      },
      {
        icon: PenLine,
        title: "You edit your own content",
        description:
          "CMS access included: change photos, text, and blog posts yourself, free, forever. We train you at handover.",
      },
      {
        icon: Smartphone,
        title: "Flawless on every device",
        description:
          "Designed mobile-first — most of your visitors are on phones, and the design treats them that way.",
      },
    ]}
    steps={[
      {
        title: "Day 1 — Free scoping call",
        description:
          "We map your pages, goals, and content. You get a fixed quote the same day.",
      },
      {
        title: "Days 2–3 — Design",
        description:
          "Custom design for your brand — no generic templates. You approve before we build.",
      },
      {
        title: "Days 4–6 — Build & SEO",
        description:
          "Development, content, forms, analytics, and full SEO setup on a live preview URL you can watch.",
      },
      {
        title: "Day 7 — Launch & handover",
        description:
          "Your domain goes live. You get CMS training, all account credentials, and 30 days of free support.",
      },
    ]}
    faqs={[
      {
        question: "How much does a static website cost?",
        answer:
          "Business/informative websites typically run $600–$1,500 as a one-time fixed price, depending on page count and design complexity. Hosting after launch is $0–5/month, and your domain (~$10–15/year) is registered in your own account.",
      },
      {
        question: "Can I update the website myself after launch?",
        answer:
          "Yes. Every static site we build includes CMS access so you can change text, photos, and blog posts yourself — free, forever. We include a training session at handover. Design or feature changes can be handled via a care plan or per-request quotes.",
      },
      {
        question: "How fast can you deliver?",
        answer:
          "A standard business website launches in 5–7 days. If you already have a site (so content and branding exist), a redesign is typically 30–50% faster.",
      },
      {
        question: "Is a static website good for SEO?",
        answer:
          "It's the best foundation possible: sub-second load times, clean semantic HTML, per-page meta tags, structured data, and a sitemap — exactly what Google's ranking systems and AI assistants reward. We build all of it in by default.",
      },
      {
        question: "What if I need logins, payments, or bookings later?",
        answer:
          "You upgrade, not rebuild. We architect static sites so dynamic features — portals, payments, booking flows — can be added as a second phase when your business is ready. See our dynamic website development service.",
      },
    ]}
    formSource="static-landing"
    defaultService="Static Website"
    crossSell={{
      text: "Need user accounts, payments, course uploads, or an online store? A static site might not be enough — see what a dynamic build includes.",
      linkLabel: "Explore Dynamic Websites & Web Apps",
      href: "/services/dynamic-website-development",
    }}
  />
);

export default StaticWebsitePage;
