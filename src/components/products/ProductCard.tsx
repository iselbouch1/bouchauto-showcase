import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const coverImage = product.images.find((img) => img.isCover) || product.images[0];

  return (
    <Link to={`/produits/${product.slug}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-card-hover">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={coverImage?.url}
            alt={coverImage?.alt || product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.isNew && (
            <Badge className="absolute right-2 top-2 bg-accent text-accent-foreground">
              Nouveau
            </Badge>
          )}
          {product.isFeatured && !product.isNew && (
            <Badge className="absolute right-2 top-2 bg-primary text-primary-foreground">
              Best-seller
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="mb-1 line-clamp-2 font-semibold text-foreground transition-colors group-hover:text-accent">
            {product.name}
          </h3>
          {product.shortDescription && (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {product.shortDescription}
            </p>
          )}
          {product.tags && product.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {product.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
