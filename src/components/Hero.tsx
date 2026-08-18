import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Timer, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HeroIllustration } from "@/components/graphics/HeroIllustration";

const heroPoints = [
  { icon: Timer, text: "MVPs launched in 15 days" },
  { icon: Wallet, text: "Fixed scope, fixed price" },
  { icon: ShieldCheck, text: "Senior engineers, no bench" },
];

const marqueeItems = [
  "MVP in 15 Days",
  "Static Websites",
  "E-commerce Stores",
  "Education Platforms",
  "AI Agents & Automation",
  "AI SEO & LLM Visibility",
  "Cloud & DevOps",
  "Dashboards & Portals",
  "Digital Marketing",
];

export const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 lg:pt-36">
      {/* Background effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-glow-secondary/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                AI consulting · Web development · Automation · Growth
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance"
            >
              Your AI-Powered Product,{" "}
              <span className="text-gradient">Live in 15 Days</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0 text-balance"
            >
              We design, build, and launch websites, web apps, and AI systems for startups and
              growing businesses — then drive traffic to them with AI-first SEO and marketing.
              One team, idea to revenue.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact" className="group">
                  Book a Free Strategy Call
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/services">Explore Services</Link>
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-4 text-sm text-muted-foreground"
            >
              Free 30-minute consultation · Honest scoping · No obligation
            </motion.p>

            {/* Trust points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 pt-8 border-t border-border"
            >
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-8 gap-y-3">
                {heroPoints.map((point) => (
                  <div key={point.text} className="flex items-center gap-2 text-muted-foreground">
                    <point.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{point.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden md:block"
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </div>

      {/* Capability marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative z-10 mt-16"
      >
        <div className="marquee" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className="marquee-track">
              {marqueeItems.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="whitespace-nowrap px-4 py-2 rounded-full border border-border bg-card/60 text-sm text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
