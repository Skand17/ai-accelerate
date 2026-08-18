import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ContactForm } from "@/components/ContactForm";

export const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="get-started" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Get a Free Plan for Your{" "}
              <span className="text-gradient">Next Project</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Tell us what you're building. Within 24 hours you'll get an honest assessment, a
              recommended approach, and a fixed-price quote — free, no strings.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ContactForm source="home-cta" compact />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
