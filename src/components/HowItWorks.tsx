import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Code, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Discover & Strategy",
    description: "We dive deep into your business, identify AI opportunities, and craft a tailored roadmap for success."
  },
  {
    number: "02",
    icon: Code,
    title: "Build & Launch",
    description: "Rapid development with AI-powered tools. We build, test, and launch your solution in record time."
  },
  {
    number: "03",
    icon: Rocket,
    title: "Scale with AI",
    description: "Continuous optimization, monitoring, and scaling. Your AI-powered system grows with your business."
  }
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
            From Idea to AI-Powered Reality
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our proven process ensures rapid delivery without compromising quality. 
            Here's how we bring your vision to life.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative text-center"
              >
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-card border border-border mb-6 group hover:border-primary/50 transition-colors">
                  <step.icon className="w-8 h-8 text-primary" />
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
