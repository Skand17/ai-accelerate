import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { getPost, sortedPosts, type BlogBlock } from "@/data/blog";
import { site, absoluteUrl } from "@/lib/site";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

const Block = ({ block }: { block: BlogBlock }) => {
  switch (block.type) {
    case "h2":
      return <h2 className="text-2xl sm:text-3xl font-bold mt-12 mb-4">{block.text}</h2>;
    case "h3":
      return <h3 className="text-xl font-bold mt-8 mb-3">{block.text}</h3>;
    case "quote":
      return (
        <blockquote className="my-8 pl-6 border-l-4 border-primary text-lg font-medium italic text-foreground">
          {block.text}
        </blockquote>
      );
    case "ul":
      return (
        <ul className="my-6 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    default:
      return <p className="my-5 text-muted-foreground leading-relaxed text-lg">{block.text}</p>;
  }
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  const related = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      author: { "@type": "Organization", name: post.author, url: site.url },
      publisher: { "@type": "Organization", name: site.name, url: site.url },
      mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
      keywords: post.keywords.join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
        { "@type": "ListItem", position: 3, name: post.title, item: absoluteUrl(`/blog/${post.slug}`) },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Seo
        title={post.title}
        description={post.description}
        path={`/blog/${post.slug}`}
        type="article"
        jsonLd={jsonLd}
        article={{ publishedTime: post.date, author: post.author, tags: post.keywords }}
      />
      <Navbar />

      <article className="pt-32 pb-16">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> All articles
            </Link>

            <span className="block px-0 text-primary text-sm font-semibold mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground pb-8 mb-8 border-b border-border">
              <span>{post.author}</span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4" /> {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {post.readTime}
              </span>
            </div>

            {post.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </motion.div>

          {/* Inline CTA */}
          <div className="mt-14 p-8 rounded-3xl border-glow card-gradient text-center">
            <h2 className="text-2xl font-bold mb-3">Want this done for you?</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Get a free 30-minute consultation and a fixed-price quote within 24 hours — no
              obligation.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                Book a Free Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </article>

      {/* Related posts */}
      <section className="pb-24">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Keep reading</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="group flex flex-col p-6 rounded-2xl border-glow card-gradient card-lift"
              >
                <span className="text-xs font-semibold text-primary mb-3">{p.category}</span>
                <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <span className="mt-auto pt-3 text-xs text-muted-foreground">{p.readTime}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BlogPostPage;
