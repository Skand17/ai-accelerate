import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { FAQ, homeFaqs, faqJsonLd } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Seo
        title="Synaptro.AI | AI Consulting, Web Development & MVPs in 15 Days"
        description="We build websites, web apps, and AI systems for startups and growing businesses — MVPs in 15 days, static & dynamic websites, AI automation, SEO, and growth. Fixed price, free consultation."
        path="/"
        jsonLd={faqJsonLd(homeFaqs)}
      />
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
