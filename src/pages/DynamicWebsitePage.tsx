import {
  CreditCard,
  Database,
  FileUp,
  GraduationCap,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";
import { ServiceLanding } from "@/components/ServiceLanding";

const DynamicWebsitePage = () => (
  <ServiceLanding
    path="/services/dynamic-website-development"
    seoTitle="Dynamic Website & Web App Development — E-commerce, Education Portals & Custom Platforms"
    seoDescription="Custom dynamic website development: e-commerce stores, education platforms with video & PDF uploads, booking systems, customer portals, and SaaS products. User logins, payments, admin panels — fixed-price quotes, 3–8 week delivery."
    eyebrow="Dynamic Website & Web App Development"
    heading="Websites That"
    headingHighlight="Work Like Products"
    subheading="E-commerce stores, education platforms, booking systems, and customer portals — with logins, payments, uploads, and dashboards. Built to scale, priced fixed."
    serviceName="Dynamic Website & Web Application Development"
    bullets={[
      "E-commerce from $2,000 · education platforms from $2,500",
      "Video lessons, PDF libraries, courses & student logins",
      "Payments built-in: Stripe, Razorpay, PayPal",
      "Admin panel included — upload & manage content yourself",
    ]}
    sections={[
      {
        icon: GraduationCap,
        title: "Education platforms",
        description:
          "Course catalogs, batches, student logins, progress tracking, video lessons, and downloadable PDFs/notes — upload new content yourself from the admin panel.",
      },
      {
        icon: CreditCard,
        title: "E-commerce & payments",
        description:
          "Product catalogs, cart and checkout, Stripe/Razorpay/PayPal, order management, and inventory — a complete store you control.",
      },
      {
        icon: FileUp,
        title: "Video & file uploads",
        description:
          "Secure video hosting or embeds, PDF libraries, image galleries — with cloud storage that scales from 50 GB to terabytes as you grow.",
      },
      {
        icon: LayoutDashboard,
        title: "Dashboards & portals",
        description:
          "Customer portals, admin dashboards, internal tools, and reporting — the data your business runs on, in one place.",
      },
      {
        icon: ShieldCheck,
        title: "Accounts & roles",
        description:
          "Secure authentication with role-based access: admins, staff, students, customers — each sees exactly what they should.",
      },
      {
        icon: Database,
        title: "Built to scale",
        description:
          "PostgreSQL databases, cloud object storage, and AWS/GCP deployment with CI/CD — architecture that won't need a rebuild at 10x users.",
      },
    ]}
    steps={[
      {
        title: "Week 0 — Free scoping call & fixed quote",
        description:
          "We map features, users, and integrations, then quote a fixed price and timeline. Most builds run 3–6 weeks; complex platforms up to 8.",
      },
      {
        title: "Week 1 — Design & architecture",
        description:
          "User flows and screens designed, database and infrastructure planned. You approve everything before development.",
      },
      {
        title: "Weeks 2–5 — Build in the open",
        description:
          "Development on a live staging URL you can click every day. Payments, uploads, and integrations tested with real flows.",
      },
      {
        title: "Launch — Handover & support",
        description:
          "Production deployment, admin training (uploading videos, PDFs, products), full credential handover, and 30 days of free support.",
      },
    ]}
    faqs={[
      {
        question: "Can you build an education website where I upload videos and PDFs?",
        answer:
          "Yes — this is one of our most requested builds. You get an admin panel to upload video lessons (secure embeds or hosted video), PDFs and notes, organize them into courses and batches, and control student access with logins. Typical cost: $2,500–$8,000 depending on features, delivered in 3–5 weeks.",
      },
      {
        question: "How much does a basic e-commerce website cost?",
        answer:
          "A basic store — catalog, cart, checkout, payment gateway, and order management — typically runs $2,000–$7,000 fixed price, delivered in 3–6 weeks. Hosting after launch is $20–80/month depending on traffic and catalog size.",
      },
      {
        question: "What are the ongoing costs for a dynamic website?",
        answer:
          "Hosting and server: $20–100/month billed at provider cost in your own account (yearly billing saves 15–20%). Domain: ~$10–15/year, renewed by you. Maintenance is optional — content and product updates are free via your admin panel; care plans for code updates and monitoring start around $49/month.",
      },
      {
        question: "How much storage do I get for videos and files?",
        answer:
          "Base plans include 50–100 GB of cloud file storage, scalable to terabytes on S3/R2 as you grow. For video, we usually recommend secure embeds or dedicated video hosting — effectively unlimited and often cheaper than raw storage, with content protection options.",
      },
      {
        question: "Can I make changes myself after launch?",
        answer:
          "Yes — the admin panel lets you manage products, courses, videos, PDFs, images, and text without touching code. Code-level changes (new features, design changes) go through a care plan or per-request quotes. Either way, you own 100% of the code and all accounts.",
      },
      {
        question: "What technology do you build with?",
        answer:
          "React + TypeScript frontends, Node.js or Python (FastAPI) backends, PostgreSQL databases, and AWS/GCP hosting with CI/CD. Mainstream, maintainable technology — any competent developer can take over your codebase, which is exactly how vendor lock-in is avoided.",
      },
    ]}
    formSource="dynamic-landing"
    defaultService="Dynamic Website / Web App"
    crossSell={{
      text: "Just need a professional web presence that converts visitors into inquiries? A static website launches in 7 days at a fraction of the cost.",
      linkLabel: "Explore Static Website Development",
      href: "/services/static-website-development",
    }}
  />
);

export default DynamicWebsitePage;
