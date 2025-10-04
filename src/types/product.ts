export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  image?: string;
  sortOrder?: number;
}

export interface ProductImage {
  url: string;
  alt?: string;
  isCover?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  categoryIds: string[];
  tags?: string[];
  isVisible: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  sortOrder?: number;
  images: ProductImage[];
  specs?: Record<string, string | number | boolean>;
  relatedProductIds?: string[];
}

export interface FilterParams {
  search?: string;
  category?: string;
  tags?: string[];
  visible?: boolean;
  featured?: boolean;
  page?: number;
  perPage?: number;
  sortBy?: 'name' | 'newest' | 'featured';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}
