import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, PenTool, Code, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Free Strategy Call",
    description:
      "A 30-minute call where we understand your goals and tell you honestly what to build — and what not to. You leave with a scoped plan either way.",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Fixed Scope & Price",
    description:
      "You get a one-page proposal: exactly what we'll deliver, when, and for how much. No hourly billing surprises, no scope creep.",
  },
  {
    number: "03",
    icon: Code,
    title: "Build in the Open",
    description:
      "We ship to a live URL from week one. You watch progress daily, give feedback early, and never wait for a 'big reveal.'",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Grow",
    description:
      "Launch is the start, not the end: analytics, SEO, and 30 days of post-launch support are included in every build.",
  },
];

export const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary mb-4 block">How It Works</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            A Process Built for Speed — and Trust
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No mystery, no months of silence. Here's exactly what working with us looks like, from
            first call to launch.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center"
              >
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-card border border-border mb-6 hover:border-primary/50 transition-colors">
                  <step.icon className="w-8 h-8 text-primary" />
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
