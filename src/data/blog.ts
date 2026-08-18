export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string; // ISO
  readTime: string;
  author: string;
  keywords: string[];
  blocks: BlogBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "static-vs-dynamic-website",
    title: "Static vs Dynamic Websites: Which One Does Your Business Actually Need?",
    description:
      "A plain-English guide to choosing between a static website and a dynamic web application — with costs, timelines, and real examples for each.",
    category: "Web Development",
    date: "2026-07-02",
    readTime: "7 min read",
    author: "Synaptro.AI Team",
    keywords: ["static website", "dynamic website", "web development", "website cost"],
    blocks: [
      {
        type: "p",
        text: "One of the first questions we ask every new client is deceptively simple: does your website need to do things, or does it need to say things? The answer determines whether you need a static website or a dynamic web application — and getting it wrong means either overpaying for complexity you don't need, or outgrowing your site in six months.",
      },
      { type: "h2", text: "What is a static website?" },
      {
        type: "p",
        text: "A static website serves the same pre-built pages to every visitor. Think company websites, landing pages, portfolios, restaurant sites, and marketing pages. The content changes only when you (or your developer, or a CMS) update it — not in response to each visitor.",
      },
      {
        type: "ul",
        items: [
          "Loads in milliseconds — pages are pre-built, nothing is computed per visit",
          "Extremely secure — there is no database or server logic to hack",
          "Nearly free to host — typically $0–5/month on Vercel, Netlify, or Cloudflare",
          "Great for SEO — fast load times and clean HTML are exactly what Google rewards",
          "Built and launched in 1–2 weeks",
        ],
      },
      { type: "h2", text: "What is a dynamic website?" },
      {
        type: "p",
        text: "A dynamic website generates content per user and per request. Users log in, see personalized dashboards, submit data, make payments, and interact with a database. Think booking systems, customer portals, e-commerce stores, SaaS products, and internal tools.",
      },
      {
        type: "ul",
        items: [
          "User accounts, roles, and personalized experiences",
          "Databases, search, filtering, and real-time data",
          "Payments, subscriptions, and order management",
          "Integrations with CRMs, ERPs, and third-party APIs",
          "Typically 3–8+ weeks to build, with ongoing hosting and maintenance",
        ],
      },
      { type: "h2", text: "The decision framework we use with clients" },
      {
        type: "p",
        text: "Ask three questions. First: do visitors need accounts? If yes, you need dynamic. Second: does content change per visitor or in real time? If yes, dynamic. Third: is the site's job to inform and convert (get calls, form fills, bookings via a simple embed)? If that's all, static wins on every dimension — speed, cost, security, and SEO.",
      },
      {
        type: "quote",
        text: "The most expensive website is the one built at the wrong level of complexity. Start static, add dynamic features when real usage demands them.",
      },
      { type: "h2", text: "Costs at a glance" },
      {
        type: "p",
        text: "A professionally built static site typically runs a fraction of the cost of a web application, launches in days instead of months, and costs almost nothing to run. A dynamic application is an investment in a product — it should be justified by revenue or operational savings it generates, not by 'it would be nice to have a login page.'",
      },
      { type: "h2", text: "The hybrid path most businesses should take" },
      {
        type: "p",
        text: "In practice, the best route for most growing businesses is hybrid: launch a fast static marketing site now to start capturing leads and ranking on Google, then add dynamic capability — a portal, a booking flow, a dashboard — as a separate build once the core business case is proven. That's exactly how we structure engagements at Synaptro.AI: a static site in week one, and a roadmap for the dynamic layer when you're ready.",
      },
      {
        type: "p",
        text: "Not sure which side of the line your project falls on? Send us a two-line description of what you need and we'll tell you honestly — including when the cheaper option is the right one.",
      },
    ],
  },
  {
    slug: "launch-mvp-in-15-days",
    title: "How to Launch an MVP in 15 Days (Our Exact Process)",
    description:
      "The step-by-step process we use to take startups from idea to launched product in 15 days — scoping, stack choices, AI-accelerated development, and launch.",
    category: "Product",
    date: "2026-06-10",
    readTime: "8 min read",
    author: "Synaptro.AI Team",
    keywords: ["MVP development", "launch startup fast", "MVP in 15 days", "rapid prototyping"],
    blocks: [
      {
        type: "p",
        text: "Most MVPs fail before they launch — not because the idea was bad, but because 'minimum' quietly became 'everything.' After shipping dozens of MVPs, we've compressed the process into a repeatable 15-day sprint. Here's exactly how it works, whether you build with us or on your own.",
      },
      { type: "h2", text: "Days 1–2: Ruthless scoping" },
      {
        type: "p",
        text: "We start with one question: what is the single action a user must complete for this product to prove its value? Everything that doesn't serve that action gets cut. The output is a one-page spec: one core flow, three or fewer supporting features, and an explicit 'not building' list — which is usually longer than the build list.",
      },
      { type: "h2", text: "Days 3–4: Design just enough" },
      {
        type: "p",
        text: "We don't produce 40-screen Figma files. We design the core flow at high fidelity and everything else with a component library. A consistent design system (we use shadcn/ui and Tailwind) makes 'good enough everywhere' fast, and 'excellent' where it counts.",
      },
      { type: "h2", text: "Days 5–12: Build with an AI-accelerated pipeline" },
      {
        type: "ul",
        items: [
          "Boring, proven stack: React + TypeScript frontend, managed Postgres, serverless or containerized backend",
          "Auth, payments, and email via managed services — never hand-rolled",
          "AI coding assistants for scaffolding and tests; senior engineers for architecture and review",
          "Deploy to production on day 5 — every day after that ships to a real URL",
          "Analytics and error tracking wired in from the first deploy, not after launch",
        ],
      },
      { type: "h2", text: "Days 13–14: Harden and instrument" },
      {
        type: "p",
        text: "Two full days for edge cases, mobile testing, load-time optimization, and analytics validation. This is the difference between an MVP that impresses early users and one that quietly loses them to bugs nobody logged.",
      },
      { type: "h2", text: "Day 15: Launch — for real" },
      {
        type: "p",
        text: "Launch means live domain, working payments, monitored errors, and a feedback channel. We also set up a simple metrics dashboard: activation rate, retention proxy, and the one metric the founder committed to in scoping.",
      },
      {
        type: "quote",
        text: "An MVP's job is to generate evidence, not revenue. Revenue is what you build on the evidence.",
      },
      { type: "h2", text: "Why 15 days beats 6 months" },
      {
        type: "p",
        text: "The obvious benefit is cost. The real benefit is learning speed: every week your product isn't in front of users is a week of guessing. Teams that launch in 15 days iterate on real feedback while their competitors are still debating feature lists. If you want the 15-day treatment for your idea, we run a free scoping call — you'll leave with a one-page spec either way.",
      },
    ],
  },
  {
    slug: "ai-seo-llm-visibility-2026",
    title: "AI SEO in 2026: How to Rank on Google AND Get Cited by ChatGPT",
    description:
      "Search behavior has split between Google and AI assistants. Here's how to optimize for both — technical SEO, llms.txt, structured data, and answer-engine optimization.",
    category: "SEO & Growth",
    date: "2026-07-18",
    readTime: "9 min read",
    author: "Synaptro.AI Team",
    keywords: ["AI SEO", "LLM optimization", "llms.txt", "answer engine optimization", "GEO"],
    blocks: [
      {
        type: "p",
        text: "A meaningful share of buying research now happens inside ChatGPT, Claude, Perplexity, and Google's AI Overviews instead of classic search results. If your business isn't being found and cited by these systems, you're invisible to a growing slice of your market. The good news: the fundamentals overlap heavily with classic SEO — but there are new moves too.",
      },
      { type: "h2", text: "The foundation hasn't changed: technical SEO" },
      {
        type: "ul",
        items: [
          "Fast load times and clean Core Web Vitals — AI crawlers give up on slow sites just like users do",
          "Semantic HTML with a clear heading hierarchy — LLMs parse structure, not pixels",
          "A complete XML sitemap and a robots.txt that allows the crawlers you want",
          "Canonical URLs and per-page meta descriptions — one generic title across your whole site kills discoverability",
        ],
      },
      { type: "h2", text: "New move #1: allow AI crawlers deliberately" },
      {
        type: "p",
        text: "GPTBot (OpenAI), ClaudeBot (Anthropic), PerplexityBot, and Google-Extended each have their own user agents. Blocking them means your content can never be cited in those assistants' answers. For most businesses, being cited is free distribution — allow them explicitly in robots.txt.",
      },
      { type: "h2", text: "New move #2: publish an llms.txt file" },
      {
        type: "p",
        text: "llms.txt is an emerging convention — a markdown file at your site root that gives AI systems a curated summary of who you are, what you offer, and where your key pages live. It costs twenty minutes and puts your best-foot description directly in front of any AI system that looks. We ship one with every site we build.",
      },
      { type: "h2", text: "New move #3: structured data everywhere" },
      {
        type: "p",
        text: "Schema.org markup (Organization, Service, FAQPage, Article, BreadcrumbList) is machine-readable ground truth about your business. It has always helped Google rich results; now it also feeds the knowledge extraction that decides whether an AI assistant recommends you or your competitor.",
      },
      { type: "h2", text: "New move #4: write for extraction" },
      {
        type: "ul",
        items: [
          "Answer questions directly in the first sentence of a section, then elaborate",
          "Use specific numbers, timelines, and prices — LLMs prefer citing concrete claims",
          "One clear topic per page; ambiguous pages get skipped",
          "FAQ sections map one-to-one onto the questions users ask assistants",
        ],
      },
      {
        type: "quote",
        text: "Classic SEO asks 'will Google rank this page?' AI SEO adds 'would an assistant quote this page to answer a real question?'",
      },
      { type: "h2", text: "How to measure it" },
      {
        type: "p",
        text: "Track referral traffic from chatgpt.com, perplexity.ai, and AI Overview clicks in your analytics, and periodically ask the major assistants the questions your customers ask ('best X agency for Y') to see if you appear. It's early and imperfect — which is exactly why moving now is an advantage. This is a core part of our AI-Powered SEO service; the sites we optimize are built to be legible to both kinds of search.",
      },
    ],
  },
  {
    slug: "business-processes-to-automate-with-ai",
    title: "10 Business Processes You Should Automate with AI (Ranked by ROI)",
    description:
      "The ten highest-ROI automation opportunities we see across client businesses — from document processing to customer support — with realistic effort estimates.",
    category: "AI & Automation",
    date: "2026-08-01",
    readTime: "6 min read",
    author: "Synaptro.AI Team",
    keywords: ["AI automation", "business process automation", "AI agents", "workflow automation"],
    blocks: [
      {
        type: "p",
        text: "After building automation for dozens of businesses, we've noticed the same pattern: companies want to automate the exciting things, but the ROI lives in the boring things. Here are the ten processes we see deliver the fastest payback, roughly ranked.",
      },
      { type: "h2", text: "The top ten, ranked by typical payback speed" },
      {
        type: "ul",
        items: [
          "1. Inbound email triage — classify, route, and draft replies for the 80% of email that's routine",
          "2. Document data extraction — invoices, POs, contracts, and forms into your systems without retyping",
          "3. Customer support first-response — an AI agent that resolves common questions and escalates the rest",
          "4. Meeting notes to CRM — calls transcribed, summarized, and logged automatically",
          "5. Report generation — weekly ops/sales reports assembled from your data sources on schedule",
          "6. Lead qualification — enrich, score, and route inbound leads before a human touches them",
          "7. Content repurposing — one long-form piece into social posts, newsletters, and summaries",
          "8. Invoice chasing — polite, persistent, automatic accounts-receivable follow-ups",
          "9. Employee onboarding — checklists, account provisioning, and FAQ answering",
          "10. Review and reputation monitoring — aggregate, analyze, and draft responses across platforms",
        ],
      },
      { type: "h2", text: "Why these and not the flashy stuff" },
      {
        type: "p",
        text: "Each of these is high-volume, rule-adjacent, and low-risk when a human stays in the loop. That combination is where current AI is genuinely reliable. Fully autonomous, high-stakes decisions are still where automation projects go to die.",
      },
      { type: "h2", text: "The human-in-the-loop principle" },
      {
        type: "p",
        text: "Our rule: AI drafts, humans approve — until the error rate proves the approval step unnecessary. This gets you 80% of the time savings on day one with none of the 'the bot emailed our biggest client something weird' risk.",
      },
      { type: "h2", text: "How to start" },
      {
        type: "p",
        text: "Pick one process where your team spends 5+ hours a week on repetitive work. Measure the hours honestly. Automate that one process, run it human-supervised for a month, then expand. Most of our automation engagements start exactly this way — a 2–6 week build for a single workflow, then compounding from there. If you want help choosing the first one, that's literally what our free consultation is for.",
      },
    ],
  },
  {
    slug: "website-cost-guide-2026",
    title: "How Much Does a Website Cost in 2026? (Honest Numbers)",
    description:
      "Real price drivers for landing pages, business websites, e-commerce, and web applications in 2026 — plus the hidden costs agencies don't mention upfront.",
    category: "Web Development",
    date: "2026-08-10",
    readTime: "7 min read",
    author: "Synaptro.AI Team",
    keywords: ["website cost", "web development pricing", "how much does a website cost"],
    blocks: [
      {
        type: "p",
        text: "Ask five agencies what a website costs and you'll get five answers spanning two orders of magnitude — all technically honest. The variable isn't the agency; it's what 'website' means. Here's the pricing landscape as we see it from inside the industry, so you can budget before you ever talk to a salesperson.",
      },
      { type: "h2", text: "The four tiers of 'website'" },
      {
        type: "ul",
        items: [
          "Landing page (1–3 pages, static): fast to build, launches in about a week. The right choice for campaigns, launches, and validating offers.",
          "Business website (5–15 pages, static + CMS): the standard professional web presence with blog, SEO setup, and forms. Typically 1–3 weeks.",
          "E-commerce or booking site (dynamic): products, payments, accounts, and order flows. Typically 3–6 weeks depending on catalog and integrations.",
          "Custom web application (fully dynamic): dashboards, portals, SaaS products. Weeks to months; priced like the software product it is.",
        ],
      },
      { type: "h2", text: "What actually drives the price" },
      {
        type: "ul",
        items: [
          "Custom design vs. template — custom design is most of the cost difference at the low end",
          "Number of distinct page layouts (not number of pages)",
          "Dynamic features: accounts, payments, dashboards, integrations",
          "Content: who writes the copy and produces the images",
          "SEO depth: 'meta tags exist' vs. genuine keyword strategy and structured data",
        ],
      },
      { type: "h2", text: "The hidden costs nobody quotes" },
      {
        type: "p",
        text: "Hosting (near-zero for static sites, real money for dynamic apps), domain and email, maintenance and updates, and — the big one — the cost of a site that doesn't convert. A cheap site that generates zero leads is the most expensive option on this page.",
      },
      {
        type: "quote",
        text: "Don't budget for a website. Budget for a lead-generation asset, and judge every line item by whether it helps convert a visitor into a conversation.",
      },
      { type: "h2", text: "How to keep costs down without getting a bad site" },
      {
        type: "ul",
        items: [
          "Start static — add dynamic features when real usage justifies them",
          "Write your own first-draft copy; have a professional edit it",
          "Insist on modern static hosting (Vercel/Netlify/Cloudflare) — hosting should be nearly free",
          "Ask for fixed-scope, fixed-price quotes and an explicit 'not included' list",
        ],
      },
      {
        type: "p",
        text: "At Synaptro.AI we quote fixed prices for static sites, dynamic applications, and everything between — and we'll tell you when the cheaper tier is genuinely the right call. Get in touch for a quote with real numbers within 24 hours.",
      },
    ],
  },
  {
    slug: "choosing-an-ai-consulting-partner",
    title: "Choosing an AI Consulting Partner: 12 Questions to Ask Before You Sign",
    description:
      "A due-diligence checklist for hiring an AI consultancy — the questions that separate builders from slide-deck sellers.",
    category: "AI & Automation",
    date: "2026-05-20",
    readTime: "6 min read",
    author: "Synaptro.AI Team",
    keywords: ["AI consulting", "hire AI consultant", "AI agency", "AI strategy"],
    blocks: [
      {
        type: "p",
        text: "The AI consulting market is crowded with two kinds of firms: those who ship working systems, and those who ship PowerPoints about working systems. These twelve questions — the ones we'd ask if we were hiring — reliably tell them apart in a single call.",
      },
      { type: "h2", text: "Questions about proof" },
      {
        type: "ul",
        items: [
          "1. Show me something you built that's in production today. Can I click it?",
          "2. What's a project that failed, and why?",
          "3. Which of your case studies can I verify with the client directly?",
        ],
      },
      { type: "h2", text: "Questions about approach" },
      {
        type: "ul",
        items: [
          "4. What would you NOT automate in our business? (Anyone who says 'everything's automatable' is selling.)",
          "5. Where do humans stay in the loop, and how do we measure when they can step out?",
          "6. Build vs. buy — when do you recommend off-the-shelf tools over custom builds?",
          "7. What happens to our data? Who trains on it, who stores it, where?",
        ],
      },
      { type: "h2", text: "Questions about economics" },
      {
        type: "ul",
        items: [
          "8. What's the smallest first engagement you offer? (Beware firms that only sell six-figure transformations.)",
          "9. How do you price — fixed scope, time and materials, or value-based? Why?",
          "10. What does maintenance cost after launch, honestly?",
        ],
      },
      { type: "h2", text: "Questions about fit" },
      {
        type: "ul",
        items: [
          "11. Who exactly will work on our account — the people on this call, or a bench we haven't met?",
          "12. If we should NOT do this project, will you tell us? Has that ever happened?",
        ],
      },
      {
        type: "quote",
        text: "The best predictor of a good AI partner isn't their tech stack — it's whether they'll tell you when NOT to use AI.",
      },
      {
        type: "p",
        text: "For what it's worth, our answers to all twelve are on the table in every intro call — including the failed-project one. Book a free consultation and ask us anything on this list.",
      },
    ],
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);

export const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);
