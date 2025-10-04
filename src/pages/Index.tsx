import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api";
import { Product, Category } from "@/types/product";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import catInterieur from "@/assets/cat-interieur.jpg";
import catExterieur from "@/assets/cat-exterieur.jpg";
import catEclairage from "@/assets/cat-eclairage.jpg";

const Index = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, productsResponse] = await Promise.all([
          api.getCategories(),
          api.getProducts({ visible: true, sortBy: "newest", perPage: 8 }),
        ]);
        setCategories(categoriesData.slice(0, 6));
        setNewProducts(productsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const categoryImages: Record<string, string> = {
    interieur: catInterieur,
    exterieur: catExterieur,
    eclairage: catEclairage,
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50" />
          </div>
          <div className="relative container mx-auto flex h-full items-center px-4">
            <div className="max-w-2xl text-white">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
                Accessoires Premium pour Votre Véhicule
              </h1>
              <p className="mb-8 text-lg md:text-xl text-white/90">
                Découvrez notre sélection d'accessoires et décorations automobiles de qualité
                supérieure
              </p>
              <Button size="lg" variant="default" className="bg-accent hover:bg-accent/90">
                <Link to="/categories/interieur">Découvrir le catalogue</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold text-foreground">Nos Catégories</h2>
            <p className="text-muted-foreground">
              Explorez nos différentes gammes de produits automobiles
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link key={category.id} to={`/categories/${category.slug}`}>
                <Card className="group overflow-hidden transition-all duration-300 hover:shadow-card-hover">
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <img
                      src={categoryImages[category.slug] || "/placeholder.svg"}
                      alt={category.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="mb-1 text-2xl font-bold text-white">{category.name}</h3>
                      <p className="text-sm text-white/90">{category.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* New Products */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="mb-2 text-3xl font-bold text-foreground">Nouveautés</h2>
                <p className="text-muted-foreground">Découvrez nos derniers arrivages</p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/recherche?featured=true">
                  Voir tout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-square rounded-lg bg-muted"></div>
                    <div className="mt-3 h-4 w-3/4 rounded bg-muted"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {newProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
