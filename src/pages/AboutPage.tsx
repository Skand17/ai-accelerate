import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Target,
  Zap,
  Shield,
  Users,
  ArrowRight,
  Code2,
  Mail,
  MapPin
} from "lucide-react";
import abhishekPhoto from "@/assets/abhishek-mishra.jpg";
import { site } from "@/lib/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description: "Every solution we build is designed to deliver measurable outcomes. We focus on ROI from day one."
  },
  {
    icon: Zap,
    title: "Speed & Agility",
    description: "In the AI era, speed matters. We move fast without sacrificing quality, delivering MVPs in weeks, not months."
  },
  {
    icon: Shield,
    title: "Enterprise-Grade",
    description: "Startup speed with enterprise reliability. Our solutions are built to scale, secure, and production-ready."
  },
  {
    icon: Users,
    title: "Partnership Approach",
    description: "We don't just deliver and disappear. We partner with you for the long term, ensuring sustained success."
  }
];

const AboutPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <main className="min-h-screen bg-background">
      <Seo
        title="About Us — The Team Behind Synaptro.AI"
        description="Synaptro.AI is an AI-first consulting and development company. Meet the values and approach behind our websites, web apps, AI systems, and growth services."
        path="/about"
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-sm font-medium text-primary mb-4 block">About Synaptro.AI</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Engineering{" "}
              <span className="text-gradient">Smarter Decisions</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              We're an AI-first consulting company helping businesses harness 
              the power of artificial intelligence to build better products, 
              faster.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To democratize AI for businesses of all sizes. We believe every 
                  company should have access to cutting-edge AI technology and 
                  expertise, regardless of their technical resources.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A world where AI enhances human potential, where businesses 
                  make smarter decisions, and where technology serves to amplify 
                  creativity and innovation.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-primary mb-4 block">Our Values</span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Why Choose Synaptro.AI
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-native approach and commitment to excellence set us apart 
              in the consulting industry.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl border-glow card-gradient"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-primary mb-4 block">Our Team</span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              The People You'll Work With
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A sales team that speaks business and an engineering team that ships — no layers in
              between.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {/* Sales head */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-3xl border-glow card-gradient text-center"
            >
              <img
                src={abhishekPhoto}
                alt="Abhishek Mishra, Head of Sales at Synaptro"
                className="w-36 h-36 rounded-full object-cover object-top mx-auto mb-6 ring-4 ring-primary/20"
              />
              <h3 className="text-xl font-bold">Abhishek Mishra</h3>
              <p className="text-primary font-medium mb-2">Head of Sales</p>
              <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                <MapPin className="w-4 h-4" /> India
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Your first point of contact — from the free consultation through scoping and
                quoting. Every inquiry lands on his desk and gets a reply within 24 hours.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline break-all"
              >
                <Mail className="w-4 h-4 shrink-0" /> {site.email}
              </a>
            </motion.div>

            {/* Engineering team */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="p-8 rounded-3xl border-glow card-gradient flex flex-col justify-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto md:mx-0">
                <Code2 className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center md:text-left">
                Engineering Team Across India
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 text-center md:text-left">
                Behind every project is a distributed team of senior engineers across India —
                React and TypeScript specialists, Node.js and Python backend developers, and
                cloud engineers on AWS and GCP.
              </p>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  Frontend, backend, cloud & AI specialists on every build
                </li>
                <li className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  The engineers you meet are the engineers who build
                </li>
                <li className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  Overlap-friendly hours for clients worldwide
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* TODO: replace with real, verifiable numbers as they accumulate */}
            {[
              { value: "15", label: "Days from idea to launched MVP" },
              { value: "7", label: "Days to a live business website" },
              { value: "24h", label: "Max response time" },
              { value: "100%", label: "Code ownership stays with you" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Let's discuss how Synaptro.AI can help you achieve your goals.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/contact">
              Get in Touch
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;
