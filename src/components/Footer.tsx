import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import synaptroLogo from "@/assets/synaptro-logo.png";

const footerLinks = {
  services: [
    { name: "AI Consulting", href: "/services#ai-consulting" },
    { name: "MVP Development", href: "/services#mvp-development" },
    { name: "Cloud & DevOps", href: "/services#cloud-devops" },
    { name: "AI SEO", href: "/services#ai-seo" },
    { name: "Digital Marketing", href: "/services#digital-marketing" },
    { name: "Automation", href: "/services#automation" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/careers" },
  ],
  social: [
    { name: "LinkedIn", href: "https://linkedin.com" },
    { name: "Twitter", href: "https://twitter.com" },
    { name: "GitHub", href: "https://github.com" },
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
              <img 
                src={synaptroLogo} 
                alt="Synaptro.AI" 
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Engineering smarter decisions through AI-powered consulting, 
              development, and growth solutions.
            </p>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Synaptro.AI. All rights reserved.
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

          {/* Social & Contact */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-border">
              <a
                href="mailto:hello@synaptro.ai"
                className="text-sm text-primary hover:underline"
              >
                hello@synaptro.ai
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
