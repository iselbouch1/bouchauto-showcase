import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-8xl font-bold text-primary">404</h1>
          <h2 className="mb-2 text-2xl font-semibold text-foreground">Page introuvable</h2>
          <p className="mb-8 text-muted-foreground">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <Button asChild size="lg">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
