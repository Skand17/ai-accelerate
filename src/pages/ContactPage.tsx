import { motion } from "framer-motion";
import { Clock, Mail, MapPin, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { ContactForm } from "@/components/ContactForm";
import { site, absoluteUrl } from "@/lib/site";

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${site.name}`,
  url: absoluteUrl("/contact"),
  mainEntity: {
    "@type": "Organization",
    name: site.name,
    email: site.email,
    url: site.url,
  },
};

const expectations = [
  {
    icon: Clock,
    title: "Reply within 24 hours",
    description: "A real person reads every message and replies within one business day.",
  },
  {
    icon: ShieldCheck,
    title: "Honest scoping",
    description:
      "We'll tell you the smallest engagement that solves your problem — even when that's not us.",
  },
  {
    icon: Mail,
    title: "Fixed-price quote",
    description: "Most inquiries get a concrete, fixed price in the first reply or first call.",
  },
];

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Seo
        title="Contact Us — Free Consultation & Fixed-Price Quote in 24 Hours"
        description="Tell us about your website, web app, or AI project. Free 30-minute consultation, honest scoping, and a fixed-price quote within 24 hours. Email hello@synaptro.ai or use the form."
        path="/contact"
        jsonLd={contactJsonLd}
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12 relative">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-sm font-medium text-primary mb-4 block">Contact Us</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Tell Us What You're <span className="text-gradient">Building</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Free consultation, honest advice, and a fixed-price quote within 24 hours. The worst
              case: you leave with a clearer plan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form & Info */}
      <section className="py-12 pb-24">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-3"
            >
              <ContactForm source="contact-page" />
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="lg:col-span-2"
            >
              <div className="sticky top-28 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">What to expect</h2>
                  <div className="space-y-5">
                    {expectations.map((item) => (
                      <div key={item.title} className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl border-glow card-gradient">
                  <h3 className="font-semibold mb-4">Prefer email?</h3>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-lg font-medium text-primary hover:underline"
                  >
                    {site.email}
                  </a>
                  <div className="flex items-start gap-2 mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                    {site.location}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactPage;
