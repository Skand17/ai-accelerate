import logoHorizontal from "@/assets/synaptro-logo-dark.png";
import { site } from "@/lib/site";

interface LogoProps {
  className?: string;
}

/**
 * Brand logo (horizontal lockup). The artwork uses dark navy text, so in
 * dark mode a brightness filter lifts it to stay legible. If a dedicated
 * white-text logo variant is added later, swap it in via a second <img>
 * with `hidden dark:block`.
 */
export const Logo = ({ className = "h-10" }: LogoProps) => (
  <img
    src={logoHorizontal}
    alt={`${site.name} logo`}
    className={`w-auto dark:[filter:brightness(2.1)_saturate(0.85)] ${className}`}
  />
);
