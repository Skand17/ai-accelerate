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
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Brain,
    title: "AI Consulting & Strategy",
    description: "Transform your business with tailored AI strategies. We identify opportunities, design solutions, and guide implementation.",
    link: "/services#ai-consulting"
  },
  {
    icon: Rocket,
    title: "MVP in 15 Days",
    description: "From concept to launch in just 15 days. Rapid prototyping and development for startups and innovators.",
    link: "/services#mvp-development"
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Scalable infrastructure that grows with you. AWS, GCP, Azure expertise with 24/7 support.",
    link: "/services#cloud-devops"
  },
  {
    icon: Search,
    title: "AI-Powered SEO",
    description: "Dominate search rankings with AI-driven SEO strategies. Data-backed optimization for maximum visibility.",
    link: "/services#ai-seo"
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "AI-first marketing that converts. Personalized campaigns, predictive analytics, and growth automation.",
    link: "/services#digital-marketing"
  },
  {
    icon: Cog,
    title: "Automation & AI Systems",
    description: "Streamline operations with intelligent automation. Custom AI agents, workflows, and integrations.",
    link: "/services#automation"
  }
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link 
        to={service.link}
        className="group block h-full p-6 rounded-2xl border-glow card-gradient hover:bg-secondary/50 transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
          <service.icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {service.description}
        </p>
        <span className="inline-flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          Learn more
          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </motion.div>
  );
};

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0 hero-gradient opacity-50" />
      
      <div className="container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary mb-4 block">Our Services</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            AI-Driven Solutions for Every Stage
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From strategy to execution, we provide end-to-end AI consulting services 
            designed to accelerate your growth and maximize ROI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
