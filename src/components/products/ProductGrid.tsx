import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export const ProductGrid = ({ products, isLoading }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square rounded-lg bg-muted"></div>
            <div className="mt-3 h-4 w-3/4 rounded bg-muted"></div>
            <div className="mt-2 h-3 w-full rounded bg-muted"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Aucun produit trouvé</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Essayez de modifier vos critères de recherche
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
