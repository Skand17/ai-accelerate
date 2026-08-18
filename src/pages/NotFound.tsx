import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Seo
        title="Page Not Found"
        description="The page you're looking for doesn't exist."
        noIndex
      />
      <Navbar />
      <div className="flex-1 flex items-center justify-center pt-20">
        <div className="text-center container">
          <p className="text-7xl font-bold text-gradient mb-4">404</p>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">This page doesn't exist</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The link may be outdated — but the things people usually come here for are one click
            away.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" asChild>
              <Link to="/">
                Back to Home
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/services">View Services</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default NotFound;
