import { motion } from "framer-motion";
import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { FAQ, faqJsonLd, type FaqItem } from "@/components/FAQ";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { site, absoluteUrl } from "@/lib/site";

export interface LandingSection {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ServiceLandingProps {
  path: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  heading: string;
  headingHighlight: string;
  subheading: string;
  serviceName: string;
  bullets: string[];
  sections: LandingSection[];
  steps: { title: string; description: string }[];
  faqs: FaqItem[];
  formSource: string;
  defaultService: string;
  crossSell: { text: string; linkLabel: string; href: string };
}

export const ServiceLanding = ({
  path,
  seoTitle,
  seoDescription,
  eyebrow,
  heading,
  headingHighlight,
  subheading,
  serviceName,
  bullets,
  sections,
  steps,
  faqs,
  formSource,
  defaultService,
  crossSell,
}: ServiceLandingProps) => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: serviceName,
      description: seoDescription,
      provider: { "@type": "Organization", name: site.name, url: site.url },
      areaServed: "Worldwide",
      url: absoluteUrl(path),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
        { "@type": "ListItem", position: 3, name: serviceName, item: absoluteUrl(path) },
      ],
    },
    faqJsonLd(faqs),
  ];

  return (
    <main className="min-h-screen bg-background">
      <Seo title={seoTitle} description={seoDescription} path={path} jsonLd={jsonLd} />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-medium text-primary mb-4 block">{eyebrow}</span>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">
                {heading} <span className="text-gradient">{headingHighlight}</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">{subheading}</p>
              <ul className="space-y-3 mb-8">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <a href="#quote">
                    Get a fixed-price quote
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <span className="text-sm text-muted-foreground">Free consultation · Reply in 24h</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="hidden lg:block"
            >
              <div id="quote-desktop">
                <ContactForm source={formSource} compact defaultService={defaultService} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What You Get</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
                className="p-6 rounded-2xl border-glow card-gradient card-lift"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{section.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{section.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container max-w-3xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
          </div>
          <ol className="space-y-6">
            {steps.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex gap-5 p-6 rounded-2xl border-glow card-gradient"
              >
                <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Cross-sell */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto p-8 rounded-3xl border-glow card-gradient text-center">
            <p className="text-muted-foreground mb-4">{crossSell.text}</p>
            <Button variant="outline" asChild>
              <Link to={crossSell.href}>
                {crossSell.linkLabel}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <FAQ faqs={faqs} subtitle="Common questions about this service." />

      {/* Bottom form (mobile + everyone who scrolled) */}
      <section id="quote" className="py-24 scroll-mt-20">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Get Your <span className="text-gradient">Free Quote</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Tell us about your project — we'll reply within 24 hours with an honest
              recommendation and a fixed price.
            </p>
          </div>
          <ContactForm source={`${formSource}-bottom`} defaultService={defaultService} />
        </div>
      </section>

      <Footer />
    </main>
  );
};
