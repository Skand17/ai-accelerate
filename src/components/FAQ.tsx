import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FaqItem {
  question: string;
  answer: string;
}

export const homeFaqs: FaqItem[] = [
  {
    question: "How can you build an MVP in just 15 days?",
    answer:
      "We combine ruthless scoping (one core flow, nothing else), a proven modern stack, managed services for auth/payments/email instead of building from scratch, and AI-accelerated development reviewed by senior engineers. The 15 days covers scoping, design, build, hardening, and launch to a live domain.",
  },
  {
    question: "Do I need a static website or a dynamic web application?",
    answer:
      "If your site's job is to inform and convert visitors (company site, landing page, portfolio), a static website is faster, cheaper, more secure, and better for SEO. If users need to log in, pay, book, or see personalized data, you need a dynamic web application. On our free call we'll tell you honestly which one fits — including when the cheaper option is right.",
  },
  {
    question: "How much does a website or MVP cost?",
    answer:
      "Every project is quoted fixed-price after a free scoping call, so you know the exact cost before we start. Static websites are the most affordable tier, dynamic web applications are priced by feature scope, and 15-day MVPs are a fixed-price package. No hourly billing, no surprise invoices.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Every build includes 30 days of post-launch support: bug fixes, small tweaks, and guidance. After that you can maintain it yourself (you own 100% of the code), or continue with an optional maintenance or growth plan covering updates, SEO, and marketing.",
  },
  {
    question: "Do you work with non-technical founders?",
    answer:
      "Most of our clients are non-technical. We handle everything technical — domains, hosting, code, deployment — and explain decisions in plain language. You own all accounts and all code from day one.",
  },
  {
    question: "What is AI SEO / LLM visibility?",
    answer:
      "Beyond ranking on Google, we optimize your site to be discovered and cited by AI assistants like ChatGPT, Claude, and Perplexity — where a growing share of buying research now happens. This includes structured data, llms.txt, AI-crawler-friendly configuration, and content written to be quoted by answer engines.",
  },
];

interface FAQProps {
  faqs?: FaqItem[];
  title?: string;
  subtitle?: string;
}

export const FAQ = ({
  faqs = homeFaqs,
  title = "Frequently Asked Questions",
  subtitle = "Straight answers to the questions we hear most. Anything else — just ask on the free call.",
}: FAQProps) => {
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
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-primary mb-4 block">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${i}`}
                className="rounded-2xl border-glow card-gradient px-6 border-b-0"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

/** Build a schema.org FAQPage JSON-LD object from FAQ items. */
export const faqJsonLd = (faqs: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});
