import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFilters } from "@/components/products/ProductFilters";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";
import { Product, Category, FilterParams } from "@/types/product";
import { SlidersHorizontal } from "lucide-react";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<FilterParams["sortBy"]>("newest");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      setIsLoading(true);
      try {
        const [categoryData, productsResponse] = await Promise.all([
          api.getCategoryBySlug(slug),
          api.getProducts({
            category: slug,
            visible: true,
            sortBy,
            tags: selectedTags.length > 0 ? selectedTags : undefined,
          }),
        ]);
        setCategory(categoryData);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug, sortBy, selectedTags]);

  // Extract unique tags from products
  const availableTags = Array.from(
    new Set(products.flatMap((p) => p.tags || []))
  ).map((tag) => ({
    label: tag,
    value: tag,
    count: products.filter((p) => p.tags?.includes(tag)).length,
  }));

  const handleClearFilters = () => {
    setSelectedTags([]);
  };

  if (!category && !isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold">Catégorie introuvable</h1>
            <p className="text-muted-foreground">La catégorie demandée n'existe pas.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Category Header */}
        <section className="border-b bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <h1 className="mb-2 text-4xl font-bold text-foreground">{category?.name}</h1>
            {category?.description && (
              <p className="text-lg text-muted-foreground">{category.description}</p>
            )}
          </div>
        </section>

        {/* Products Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {isLoading ? "Chargement..." : `${products.length} produits`}
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filtres
              </Button>

              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Plus récents</SelectItem>
                  <SelectItem value="name">Nom A-Z</SelectItem>
                  <SelectItem value="featured">Populaires</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <aside
              className={`w-64 flex-shrink-0 ${
                showFilters ? "block" : "hidden"
              } lg:block`}
            >
              <div className="sticky top-20">
                <ProductFilters
                  tags={availableTags}
                  selectedTags={selectedTags}
                  onTagsChange={setSelectedTags}
                  onClear={handleClearFilters}
                />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <ProductGrid products={products} isLoading={isLoading} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
