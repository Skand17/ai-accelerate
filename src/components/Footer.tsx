import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { site } from "@/lib/site";

const footerLinks = {
  services: [
    { name: "MVP in 15 Days", href: "/services#mvp-development" },
    { name: "Static Websites", href: "/services/static-website-development" },
    { name: "Dynamic Websites & Web Apps", href: "/services/dynamic-website-development" },
    { name: "AI Consulting", href: "/services#ai-consulting" },
    { name: "Automation & AI Agents", href: "/services#automation" },
    { name: "AI SEO & LLM Visibility", href: "/services#ai-seo" },
    { name: "Digital Marketing", href: "/services#digital-marketing" },
    { name: "Cloud & DevOps", href: "/services#cloud-devops" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Pricing", href: "/pricing" },
  ],
};

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <Logo className="h-12" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {site.tagline}. We build websites, web apps, and AI systems for startups and growing
              businesses — and the SEO and marketing that make them pay off.
            </p>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline break-all"
            >
              {site.email}
              <ArrowUpRight className="w-3 h-3 shrink-0" />
            </a>
            <p className="mt-3 text-xs text-muted-foreground">{site.location}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
