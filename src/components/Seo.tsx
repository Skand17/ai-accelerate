import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { site, absoluteUrl } from "@/lib/site";

interface SeoProps {
  title: string;
  description: string;
  /** Path for the canonical URL, e.g. "/services". Defaults to current route. */
  path?: string;
  /** Absolute or root-relative image for social sharing. */
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  /** One or more JSON-LD objects injected for this page. */
  jsonLd?: object | object[];
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
}

const upsertMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const upsertLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

/**
 * Per-page SEO manager for the SPA: keeps <title>, meta description,
 * canonical, Open Graph / Twitter tags and JSON-LD in sync with the route.
 */
export const Seo = ({
  title,
  description,
  path,
  image,
  type = "website",
  noIndex = false,
  jsonLd,
  article,
}: SeoProps) => {
  const location = useLocation();
  const canonicalPath = path ?? location.pathname;

  useEffect(() => {
    const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
    const canonical = absoluteUrl(canonicalPath);
    const ogImage = image
      ? image.startsWith("http")
        ? image
        : absoluteUrl(image)
      : absoluteUrl(site.defaultOgImage);

    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");
    upsertLink("canonical", canonical);

    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", ogImage);
    upsertMeta("property", "og:site_name", site.name);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", ogImage);

    if (article) {
      upsertMeta("property", "article:published_time", article.publishedTime);
      if (article.modifiedTime) upsertMeta("property", "article:modified_time", article.modifiedTime);
      if (article.author) upsertMeta("property", "article:author", article.author);
    }

    const scripts: HTMLScriptElement[] = [];
    if (jsonLd) {
      const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      for (const block of blocks) {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo", "page");
        script.textContent = JSON.stringify(block);
        document.head.appendChild(script);
        scripts.push(script);
      }
    }

    return () => {
      scripts.forEach((s) => s.remove());
    };
  }, [title, description, canonicalPath, image, type, noIndex, jsonLd, article]);

  return null;
};
