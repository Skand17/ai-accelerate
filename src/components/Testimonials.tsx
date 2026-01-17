import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "50+", label: "MVPs Shipped" },
  { value: "97%", label: "Client Satisfaction" },
  { value: "15", label: "Days Avg. MVP Time" },
  { value: "3x", label: "Faster with AI" },
];

const testimonials = [
  {
    quote: "Synaptro.AI transformed our startup idea into a working product in just 2 weeks. Their AI-first approach saved us months of development time.",
    author: "Sarah Chen",
    role: "Founder, TechFlow",
  },
  {
    quote: "The AI consulting team helped us identify automation opportunities we never knew existed. Our operational efficiency improved by 40%.",
    author: "Michael Torres",
    role: "CTO, DataScale",
  },
  {
    quote: "Their SEO and marketing AI tools delivered results from day one. We saw a 200% increase in organic traffic within 3 months.",
    author: "Emily Rodriguez",
    role: "Marketing Director, GrowthLabs",
  },
];

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
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary mb-4 block">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-bold">What Our Clients Say</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="p-6 rounded-2xl border-glow card-gradient"
            >
              <blockquote className="text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{testimonial.author}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
