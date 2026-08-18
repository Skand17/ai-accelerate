# Synaptro.AI — Company Website

Marketing site for Synaptro.AI: AI consulting, MVP development in 15 days, static & dynamic
website development, automation, SEO, and growth services.

**Stack:** Vite · React 18 · TypeScript · Tailwind CSS · shadcn/ui · framer-motion · react-router

## Development

```sh
npm install
npm run dev        # local dev server
npm run build      # production build → dist/
npm run test       # vitest
npm run lint       # eslint
```

## Contact form setup

The lead form (`src/components/ContactForm.tsx` → `src/lib/contact.ts`) submits to **Formspree**
form `maewllyl` (`https://formspree.io/f/maewllyl`) as a JSON POST — no server needed. Leads are
delivered to the inbox configured in the Formspree dashboard, with the visitor's email as
reply-to and a `source` field showing which page/section the lead came from.

Overrides via `.env` (see `.env.example`):
- `VITE_FORMSPREE_ID` — use a different Formspree form (e.g. a test form on staging)
- `VITE_CONTACT_ENDPOINT` — bypass Formspree with any custom JSON POST endpoint

Spam protection: a honeypot field is built in; Formspree adds its own filtering.
**Verify before launch:** submit a test lead on the live site and confirm it arrives.

## Where things live

| What | Where |
|---|---|
| Site name, URL, email, socials | `src/lib/site.ts` |
| Services (8) | `src/data/services.ts` |
| Pricing, hosting costs, maintenance plans | `src/data/pricing.ts` |
| Blog posts | `src/data/blog.ts` |
| Per-page SEO tags + JSON-LD | `src/components/Seo.tsx` (used by every page) |
| Theme (light/dark design tokens) | `src/index.css` (light = `:root`, dark = `.dark`) |
| Sitemap / robots / llms.txt | `public/` — update `sitemap.xml` when adding pages/posts |

## SEO checklist maintained in this repo

- Per-page `<title>`, meta description, canonical, Open Graph & Twitter tags (SPA-managed)
- JSON-LD: Organization, WebSite, Service list, FAQPage, BlogPosting, BreadcrumbList
- `public/sitemap.xml`, `public/robots.txt` (AI crawlers explicitly allowed), `public/llms.txt`
- SPA fallbacks for hosting: `vercel.json` (Vercel) and `public/_redirects` (Netlify/Cloudflare)

### Before launch

- [ ] Replace `public/og-image.png` with a real 1200×630 social share image (currently the logo)
- [ ] Set real social profile URLs in `src/lib/site.ts`
- [ ] Send a test lead end-to-end and confirm it arrives in the Formspree inbox
- [ ] Adjust pricing ranges/currency in `src/data/pricing.ts` for your market
- [ ] Add real client testimonials in `src/components/Testimonials.tsx` (section is ready, quotes intentionally omitted until real ones exist)
- [ ] Submit `sitemap.xml` in Google Search Console + Bing Webmaster Tools
- [ ] Consider prerendering/SSG (e.g. `vite-plugin-ssr`/prerender step) for even stronger SEO — meta tags are JS-managed today, which Google handles but slower crawlers may not
