import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Clock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { site, absoluteUrl } from "@/lib/site";

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${site.name} Services`,
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.shortDescription,
      provider: { "@type": "Organization", name: site.name, url: site.url },
      url: s.href ? absoluteUrl(s.href) : absoluteUrl(`/services#${s.id}`),
    },
  })),
};

const ServicesPage = () => {
  const { hash } = useLocation();

  // Scroll to the anchored service when arriving via /services#<id>
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <main className="min-h-screen bg-background">
      <Seo
        title="Services — AI Consulting, Web Development, SEO & Automation"
        description="Explore Synaptro.AI services: MVP development in 15 days, static websites, dynamic web applications, AI consulting, automation, AI-powered SEO, digital marketing, and cloud & DevOps. Fixed-price quotes."
        path="/services"
        jsonLd={servicesJsonLd}
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
            className="max-w-3xl"
          >
            <span className="text-sm font-medium text-primary mb-4 block">Services</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              One Team, <span className="text-gradient">Idea to Revenue</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Eight services that cover the full journey: build the product, put it online, get it
              found, and automate the busywork. Every engagement starts with a free scoping call
              and a fixed-price quote.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service detail sections */}
      <section className="py-12">
        <div className="container space-y-8">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="scroll-mt-28 p-8 sm:p-10 rounded-3xl border-glow card-gradient"
            >
              <div className="grid lg:grid-cols-2 gap-10 items-start">
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold">{service.title}</h2>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.longDescription}
                  </p>
                  {service.timeline && (
                    <p className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-6">
                      <Clock className="w-4 h-4 text-primary" />
                      Typical timeline: <span className="text-foreground font-medium">{service.timeline}</span>
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <Button variant="hero" asChild>
                      <Link to="/contact">
                        Get a fixed-price quote
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    {service.href && (
                      <Button variant="outline" asChild>
                        <Link to={service.href}>Full details</Link>
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
                      What's included
                    </h3>
                    <ul className="space-y-3">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
                      Outcomes
                    </h3>
                    <ul className="space-y-3">
                      {service.outcomes.map((o) => (
                        <li key={o} className="flex items-start gap-2 text-sm">
                          <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            That's what the free call is for. Describe your goal and we'll recommend the smallest
            engagement that gets you there — even if it's not with us.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/contact">
              Book a Free Strategy Call
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ServicesPage;
