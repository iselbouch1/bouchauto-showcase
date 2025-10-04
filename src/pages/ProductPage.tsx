import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/api";
import { Product } from "@/types/product";
import { Share2, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      setIsLoading(true);
      try {
        const productData = await api.getProductBySlug(slug);
        setProduct(productData);
        if (productData) {
          const related = await api.getRelatedProducts(productData.id, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Lien copié dans le presse-papier");
    } catch (error) {
      toast.error("Erreur lors de la copie du lien");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold">Produit introuvable</h1>
            <p className="mb-6 text-muted-foreground">Le produit demandé n'existe pas.</p>
            <Button asChild>
              <Link to="/">Retour à l'accueil</Link>
            </Button>
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
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link to="/">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Retour
            </Link>
          </Button>

          {/* Product Details */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                <img
                  src={product.images[selectedImage]?.url}
                  alt={product.images[selectedImage]?.alt || product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                        selectedImage === idx
                          ? "border-accent"
                          : "border-transparent hover:border-muted"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.alt || `${product.name} ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <div className="mb-3 flex flex-wrap gap-2">
                  {product.isNew && <Badge className="bg-accent">Nouveau</Badge>}
                  {product.isFeatured && <Badge>Best-seller</Badge>}
                  {product.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h1 className="mb-2 text-3xl font-bold text-foreground">{product.name}</h1>
                {product.shortDescription && (
                  <p className="text-lg text-muted-foreground">{product.shortDescription}</p>
                )}
              </div>

              <Separator />

              <div>
                <h2 className="mb-3 text-xl font-semibold text-foreground">Description</h2>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              {product.specs && Object.keys(product.specs).length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">
                      Caractéristiques
                    </h2>
                    <dl className="space-y-2">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <dt className="font-medium text-foreground">{key}</dt>
                          <dd className="text-muted-foreground">{String(value)}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </>
              )}

              <Separator />

              <Button onClick={handleShare} variant="outline" className="w-full">
                <Share2 className="mr-2 h-4 w-4" />
                Partager ce produit
              </Button>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="mb-6 text-2xl font-bold text-foreground">Produits associés</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
