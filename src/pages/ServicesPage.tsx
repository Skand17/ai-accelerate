import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Brain, 
  Rocket, 
  Cloud, 
  Search, 
  TrendingUp, 
  Cog,
  Check,
  ArrowRight
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    id: "ai-consulting",
    icon: Brain,
    title: "AI Consulting & Strategy",
    subtitle: "Transform Your Business with AI",
    description: "We help businesses identify AI opportunities, design strategic roadmaps, and implement solutions that deliver measurable results. Our consultants bring deep expertise across industries.",
    features: [
      "AI opportunity assessment",
      "Custom AI strategy development",
      "Technology stack recommendations",
      "Implementation roadmaps",
      "ROI projections & measurement"
    ],
    outcomes: ["40% efficiency gains", "3-6 month implementation", "Ongoing support"]
  },
  {
    id: "mvp-development",
    icon: Rocket,
    title: "MVP Development in 15 Days",
    subtitle: "From Idea to Launch — Fast",
    description: "Turn your vision into a working product in just 15 days. Our rapid development process leverages AI tools and proven frameworks to deliver quality MVPs that attract investors and users.",
    features: [
      "Day 1-3: Discovery & design",
      "Day 4-10: Core development",
      "Day 11-13: Testing & refinement",
      "Day 14-15: Launch preparation",
      "Post-launch support included"
    ],
    outcomes: ["15-day delivery", "Production-ready code", "Investor-ready demos"]
  },
  {
    id: "cloud-devops",
    icon: Cloud,
    title: "Cloud & DevOps",
    subtitle: "Scalable Infrastructure That Grows With You",
    description: "Build on robust cloud foundations with AWS, GCP, or Azure. We design, deploy, and manage infrastructure that scales from startup to enterprise.",
    features: [
      "Cloud architecture design",
      "CI/CD pipeline setup",
      "Kubernetes & containerization",
      "Performance optimization",
      "24/7 monitoring & support"
    ],
    outcomes: ["99.9% uptime", "50% cost reduction", "Auto-scaling"]
  },
  {
    id: "ai-seo",
    icon: Search,
    title: "AI-Powered SEO",
    subtitle: "Dominate Search Rankings",
    description: "Leverage AI to optimize your content, analyze competitors, and climb search rankings faster. Data-driven SEO strategies that deliver measurable organic growth.",
    features: [
      "AI content optimization",
      "Technical SEO audits",
      "Competitor analysis",
      "Keyword strategy",
      "Performance tracking"
    ],
    outcomes: ["200% traffic growth", "Top 10 rankings", "Sustainable results"]
  },
  {
    id: "digital-marketing",
    icon: TrendingUp,
    title: "Digital Marketing",
    subtitle: "AI-First Marketing That Converts",
    description: "Personalized campaigns powered by AI. We combine creative strategy with predictive analytics to maximize your marketing ROI across all channels.",
    features: [
      "AI-powered ad optimization",
      "Personalization at scale",
      "Conversion rate optimization",
      "Marketing automation",
      "Analytics & attribution"
    ],
    outcomes: ["3x ROAS improvement", "40% lower CAC", "Automated campaigns"]
  },
  {
    id: "automation",
    icon: Cog,
    title: "Automation & AI Systems",
    subtitle: "Intelligent Workflows That Scale",
    description: "Streamline operations with custom AI agents, automated workflows, and intelligent integrations. Free your team to focus on what matters most.",
    features: [
      "Custom AI agent development",
      "Workflow automation",
      "System integrations",
      "Process optimization",
      "AI-powered decision support"
    ],
    outcomes: ["60% time savings", "Zero manual errors", "24/7 operations"]
  }
];

const ServiceSection = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <section 
      id={service.id} 
      className={`py-20 ${index % 2 === 1 ? 'bg-secondary/30' : ''}`}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
        className="container"
      >
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:grid-flow-col-dense'}`}>
          <div className={isEven ? '' : 'lg:col-start-2'}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <service.icon className="w-4 h-4" />
              {service.subtitle}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{service.title}</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {service.description}
            </p>
            
            <ul className="space-y-3 mb-8">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button variant="hero" asChild>
              <Link to="/contact">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className={`${isEven ? '' : 'lg:col-start-1'}`}>
            <div className="p-8 rounded-3xl border-glow card-gradient">
              <h3 className="text-lg font-semibold mb-6">Expected Outcomes</h3>
              <div className="grid gap-4">
                {service.outcomes.map((outcome) => (
                  <div 
                    key={outcome}
                    className="p-4 rounded-xl bg-primary/5 border border-primary/10"
                  >
                    <span className="text-lg font-semibold text-gradient">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const ServicesPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-sm font-medium text-primary mb-4 block">Our Services</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              AI-Driven Solutions for{" "}
              <span className="text-gradient">Every Challenge</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              From strategy to execution, we provide end-to-end services designed 
              to accelerate your growth and maximize your AI investment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      {services.map((service, index) => (
        <ServiceSection key={service.id} service={service} index={index} />
      ))}

      {/* CTA */}
      <section className="py-24 bg-primary/5">
        <div className="container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Book a free consultation and let's discuss how we can help you achieve your goals.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/contact">
              Book Free Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ServicesPage;
