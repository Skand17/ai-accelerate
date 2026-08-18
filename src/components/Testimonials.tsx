import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BadgeCheck, Eye, Handshake, Scale } from "lucide-react";
import { CountUp } from "@/components/graphics/CountUp";

const stats = [
  { end: 15, suffix: "", label: "Days from idea to launched MVP" },
  { end: 7, suffix: "", label: "Days to a live, SEO-ready website" },
  { end: 24, suffix: "h", label: "Max response time on every message" },
  { end: 30, suffix: "", label: "Days of free post-launch support" },
];

const reasons = [
  {
    icon: Scale,
    title: "Fixed price, fixed scope",
    description:
      "You approve a one-page proposal with exact deliverables and an exact price before we write a line of code. Scope creep is our problem, not yours.",
  },
  {
    icon: Eye,
    title: "You see progress daily",
    description:
      "Everything we build ships to a live URL from the first week. No black box, no 'big reveal' — you steer while we build.",
  },
  {
    icon: BadgeCheck,
    title: "Senior people, small team",
    description:
      "The people on your intro call are the people who build your product. No handoff to a junior bench after the contract is signed.",
  },
  {
    icon: Handshake,
    title: "We'll talk you out of overspending",
    description:
      "If a $1,500 static site does the job, we won't sell you a $20,000 web app. Honest scoping is why clients come back for the second project.",
  },
];

/*
 * NOTE: Client testimonials intentionally omitted until we have real,
 * verifiable quotes with client permission. Add them here (name, role,
 * company, quote) once collected — real social proof converts far better
 * than placeholder quotes, and fake ones are a trust/legal liability.
 */

export const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient opacity-30" />

      <div className="container relative z-10">
        {/* Stats */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold text-gradient mb-2">
                <CountUp end={stat.end} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Why choose us */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary mb-4 block">Why Synaptro.AI</span>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Built Different from the Average Agency
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="p-6 rounded-2xl border-glow card-gradient"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <reason.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{reason.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
