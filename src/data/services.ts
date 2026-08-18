import {
  Brain,
  Rocket,
  Cloud,
  Search,
  TrendingUp,
  Cog,
  Globe,
  AppWindow,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  outcomes: string[];
  /** Dedicated landing page, if one exists (otherwise anchors on /services). */
  href?: string;
  startingAt?: string;
  timeline?: string;
}

export const services: Service[] = [
  {
    id: "ai-consulting",
    icon: Brain,
    title: "AI Consulting & Strategy",
    shortDescription:
      "Find where AI actually pays off in your business — with a prioritized roadmap, not a slide deck.",
    longDescription:
      "We audit your workflows, data, and tooling to identify the AI opportunities with the highest ROI. You get a concrete, prioritized implementation roadmap — what to build, what to buy, what to skip — plus hands-on guidance through execution.",
    features: [
      "AI opportunity audit across your operations",
      "Build-vs-buy analysis and vendor selection",
      "Data readiness and architecture assessment",
      "ROI modeling and prioritized roadmap",
      "Hands-on implementation guidance",
    ],
    outcomes: ["Clear 90-day AI roadmap", "Costed business case per initiative", "Reduced risk of failed AI projects"],
    timeline: "2–4 weeks",
  },
  {
    id: "mvp-development",
    icon: Rocket,
    title: "MVP Development in 15 Days",
    shortDescription:
      "From idea to a launched, testable product in 15 days — built with modern stacks and AI-accelerated development.",
    longDescription:
      "Our flagship offer. We take your idea through scoping, design, development, and deployment in a fixed 15-day sprint. You get a production-grade MVP your first users can actually use — not a throwaway prototype.",
    features: [
      "Fixed 15-day timeline, fixed scope, fixed price",
      "Modern stack: React, Node/Python, Postgres, cloud-native",
      "AI features built-in where they add value",
      "Deployment, analytics, and error monitoring included",
      "30 days of post-launch support",
    ],
    outcomes: ["Launched product in 15 days", "Validated idea before heavy investment", "Investor-ready demo"],
    timeline: "15 days",
  },
  {
    id: "static-websites",
    icon: Globe,
    title: "Static Website Development",
    shortDescription:
      "Blazing-fast, secure marketing sites and landing pages that load instantly and rank on Google.",
    longDescription:
      "Perfect for businesses that need a professional web presence: company sites, landing pages, portfolios, and campaign pages. Static sites load in milliseconds, are nearly impossible to hack, cost almost nothing to host, and are built SEO-first from day one.",
    features: [
      "Custom design — no generic templates",
      "Sub-second load times (Core Web Vitals in the green)",
      "SEO-first build: structured data, sitemaps, meta optimization",
      "Contact forms, analytics, and CMS-editable content",
      "Free hosting setup (Vercel/Netlify/Cloudflare)",
    ],
    outcomes: ["Launch in as little as 7 days", "Near-zero hosting costs", "Fast, secure, Google-friendly site"],
    href: "/services/static-website-development",
    timeline: "1–2 weeks",
  },
  {
    id: "dynamic-websites",
    icon: AppWindow,
    title: "Dynamic Website & Web App Development",
    shortDescription:
      "Full-featured web applications with user accounts, dashboards, payments, and databases — built to scale.",
    longDescription:
      "When your business needs more than a brochure: customer portals, booking systems, e-commerce, SaaS products, internal tools, and admin dashboards. We build dynamic, database-driven applications with authentication, payments, and real-time features.",
    features: [
      "User authentication and role-based access",
      "Custom dashboards and admin panels",
      "Payment integration (Stripe, Razorpay, PayPal)",
      "Database design, APIs, and third-party integrations",
      "Scalable cloud deployment with CI/CD",
    ],
    outcomes: ["A product, not just a website", "Automated workflows replacing manual work", "Scales with your users"],
    href: "/services/dynamic-website-development",
    timeline: "3–8 weeks",
  },
  {
    id: "cloud-devops",
    icon: Cloud,
    title: "Cloud & DevOps",
    shortDescription:
      "Scalable, cost-optimized infrastructure on AWS, GCP, or Azure — with CI/CD and monitoring done right.",
    longDescription:
      "We design, migrate, and manage cloud infrastructure that grows with you. From cutting your cloud bill to setting up bulletproof CI/CD pipelines and monitoring, we make your infrastructure a competitive advantage instead of a cost center.",
    features: [
      "Cloud architecture design and migration",
      "Cost optimization audits (typical savings: 20–40%)",
      "CI/CD pipelines and infrastructure-as-code",
      "Monitoring, alerting, and incident response",
      "Security hardening and compliance",
    ],
    outcomes: ["Lower cloud bills", "Faster, safer deployments", "99.9%+ uptime"],
    timeline: "Ongoing or project-based",
  },
  {
    id: "ai-seo",
    icon: Search,
    title: "AI-Powered SEO & LLM Visibility",
    shortDescription:
      "Rank on Google and get cited by ChatGPT, Claude, and Perplexity — search has changed, your SEO should too.",
    longDescription:
      "Traditional SEO plus the new frontier: answer-engine optimization. We optimize your site to rank in classic search and to be discovered, cited, and recommended by AI assistants — where a growing share of buying decisions now start.",
    features: [
      "Technical SEO audit and fixes",
      "Keyword and topic strategy backed by data",
      "Content optimized for both Google and LLMs",
      "Structured data, llms.txt, and entity optimization",
      "Monthly reporting with real business metrics",
    ],
    outcomes: ["Compounding organic traffic", "Visibility in AI answers", "Lower customer acquisition cost"],
    timeline: "3–6 months to compound",
  },
  {
    id: "digital-marketing",
    icon: TrendingUp,
    title: "Digital Marketing & Growth",
    shortDescription:
      "AI-first campaigns across paid, email, and content — measured on pipeline, not impressions.",
    longDescription:
      "We run growth like engineers: hypothesis, experiment, measure, scale. Paid acquisition, email automation, landing page optimization, and content — all instrumented so you know exactly what each channel returns.",
    features: [
      "Paid campaigns (Google, Meta, LinkedIn)",
      "Conversion rate optimization and A/B testing",
      "Email automation and lead nurturing",
      "Analytics setup and attribution",
      "AI-assisted content production at scale",
    ],
    outcomes: ["Predictable lead flow", "Clear channel-level ROI", "Higher conversion rates"],
    timeline: "Ongoing",
  },
  {
    id: "automation",
    icon: Cog,
    title: "Automation & AI Agents",
    shortDescription:
      "Custom AI agents and workflow automation that eliminate repetitive work across your operations.",
    longDescription:
      "From document processing and customer support to internal reporting and data entry — we build AI agents and automations that take repetitive work off your team's plate, integrated with the tools you already use.",
    features: [
      "Custom AI agents for support, sales, and ops",
      "Workflow automation (Zapier/Make/n8n or custom)",
      "Document and email processing pipelines",
      "CRM and ERP integrations",
      "Human-in-the-loop review where it matters",
    ],
    outcomes: ["Hours saved weekly per employee", "Faster response times", "Fewer manual errors"],
    timeline: "2–6 weeks per workflow",
  },
];

export const getService = (id: string) => services.find((s) => s.id === id);
