import { motion } from "framer-motion";
import { ArrowRight, Check, Clock, Server, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import {
  packages,
  paymentSchedule,
  hostingMatrix,
  maintenancePlans,
  techStack,
} from "@/data/pricing";
import { site, absoluteUrl } from "@/lib/site";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "Pricing", item: absoluteUrl("/pricing") },
  ],
};

const PricingPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Seo
        title="Pricing & Plans — Website, E-commerce, Education Platform & MVP Costs"
        description="Transparent pricing for business websites, e-commerce stores, education platforms, and custom web apps. See development costs, hosting charges, storage, maintenance plans, and exactly what you pay and when."
        path="/pricing"
        jsonLd={breadcrumbJsonLd}
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-sm font-medium text-primary mb-4 block">Pricing & Plans</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Transparent Pricing, <span className="text-gradient">No Surprises</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Exactly what a project costs, what hosting costs after launch, what you can change
              yourself, and what you pay when. Every project gets a fixed-price quote before we
              start.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages by segment */}
      <section className="py-12">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Packages by Business Type</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Indicative ranges — your exact quote is fixed after a free scoping call and never
              changes mid-project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
                className={`relative flex flex-col p-6 rounded-3xl border-glow card-gradient ${
                  pkg.popular ? "ring-2 ring-primary" : ""
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    <Star className="w-3 h-3" /> Most requested
                  </span>
                )}
                <h3 className="text-lg font-bold mb-1">{pkg.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">{pkg.audience}</p>
                <div className="text-2xl font-bold text-gradient mb-1">{pkg.priceRange}</div>
                <div className="flex flex-col gap-1 text-sm text-muted-foreground mb-5">
                  <span className="inline-flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" /> {pkg.timeline}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Server className="w-4 h-4 text-primary" /> Hosting: {pkg.hostingCost}
                  </span>
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {pkg.includes.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={pkg.popular ? "hero" : "outline"} asChild className="w-full">
                  <Link to="/contact">Get exact quote</Link>
                </Button>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have a basic website? Timelines shrink — a redesign or upgrade of an existing
            site is typically <span className="text-foreground font-medium">30–50% faster</span>{" "}
            than building from scratch.
          </p>
        </div>
      </section>

      {/* What you pay and when */}
      <section className="py-20 bg-secondary/30">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What You Pay — and When</h2>
            <p className="text-lg text-muted-foreground">
              Four possible costs. One is one-time, one is yours by design, two are optional or
              at-cost.
            </p>
          </div>
          <div className="space-y-4">
            {paymentSchedule.map((row, i) => (
              <motion.div
                key={row.item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="grid sm:grid-cols-[1fr_auto] gap-2 sm:gap-8 p-6 rounded-2xl border-glow card-gradient"
              >
                <div>
                  <h3 className="font-semibold mb-1">{row.item}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{row.detail}</p>
                </div>
                <span className="text-sm font-medium text-primary whitespace-nowrap self-start sm:text-right">
                  {row.when}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hosting & storage */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Hosting & Storage by Site Type</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hosting is billed at provider cost in an account you own — we set it up and optimize
              it, we don't mark it up.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border-glow card-gradient">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="p-5 font-semibold">Site type</th>
                  <th className="p-5 font-semibold">Hosting cost</th>
                  <th className="p-5 font-semibold">Storage included</th>
                  <th className="p-5 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {hostingMatrix.map((row) => (
                  <tr key={row.type} className="border-b border-border last:border-0 align-top">
                    <td className="p-5 font-medium">{row.type}</td>
                    <td className="p-5 text-primary font-medium whitespace-nowrap">{row.hosting}</td>
                    <td className="p-5 text-muted-foreground">{row.storage}</td>
                    <td className="p-5 text-muted-foreground">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Large video libraries are best served via secure video embeds (effectively unlimited,
            free) or cloud video hosting — we'll recommend the cheapest option that fits your
            content protection needs.
          </p>
        </div>
      </section>

      {/* After launch: changes & maintenance */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Changing Things After Launch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              You get admin/CMS access with every build — photos, text, products, videos, and PDFs
              are yours to change anytime, free, without calling us. For code and design changes,
              pick a plan or pay per request.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {maintenancePlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col p-6 rounded-3xl border-glow card-gradient"
              >
                <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                <div className="text-2xl font-bold text-gradient mb-3">{plan.price}</div>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  {plan.description}
                </p>
                <ul className="space-y-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Technology We Build With</h2>
            <p className="text-lg text-muted-foreground">
              Modern, mainstream, and maintainable — never exotic tech that locks you in.
            </p>
          </div>
          <div className="space-y-4">
            {techStack.map((row, i) => (
              <motion.div
                key={row.layer}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 p-5 rounded-2xl border-glow card-gradient"
              >
                <span className="text-sm font-semibold text-primary">{row.layer}</span>
                <div>
                  <p className="font-medium mb-1">{row.tech}</p>
                  <p className="text-sm text-muted-foreground">{row.why}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary/30">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Get Your <span className="text-gradient">Exact Quote</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Describe your project and get a fixed price within 24 hours — free, and it never
              changes mid-project.
            </p>
          </div>
          <ContactForm source="pricing-page" />
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PricingPage;
