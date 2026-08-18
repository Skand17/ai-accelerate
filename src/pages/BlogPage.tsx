import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { sortedPosts } from "@/data/blog";
import { site, absoluteUrl } from "@/lib/site";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `${site.name} Blog`,
  url: absoluteUrl("/blog"),
  publisher: { "@type": "Organization", name: site.name, url: site.url },
  blogPost: sortedPosts.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    url: absoluteUrl(`/blog/${p.slug}`),
  })),
};

const BlogPage = () => {
  const [featured, ...rest] = sortedPosts;

  return (
    <main className="min-h-screen bg-background">
      <Seo
        title="Blog — Practical Guides on AI, Web Development & Growth"
        description="Practical, no-fluff guides from the Synaptro.AI team: website costs, static vs dynamic sites, MVP development, AI automation, and SEO for the age of AI assistants."
        path="/blog"
        jsonLd={blogJsonLd}
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12 relative">
        <div className="absolute inset-0 hero-gradient" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-sm font-medium text-primary mb-4 block">Blog</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Guides That <span className="text-gradient">Save You Money</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Honest, practical writing on websites, AI, and growth — the advice we give paying
              clients, published free.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured post */}
      <section className="py-8">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Link
              to={`/blog/${featured.slug}`}
              className="group block p-8 sm:p-10 rounded-3xl border-glow card-gradient hover:bg-secondary/50 transition-colors"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                Latest · {featured.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                {featured.title}
              </h2>
              <p className="text-muted-foreground mb-5 max-w-3xl leading-relaxed">
                {featured.description}
              </p>
              <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4" /> {formatDate(featured.date)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> {featured.readTime}
                </span>
                <span className="inline-flex items-center gap-1 font-medium text-primary">
                  Read article
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Post grid */}
      <section className="py-12 pb-24">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col h-full p-6 rounded-2xl border-glow card-gradient card-lift"
                >
                  <span className="inline-block self-start px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed flex-1">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="w-3.5 h-3.5" /> {formatDate(post.date)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BlogPage;
