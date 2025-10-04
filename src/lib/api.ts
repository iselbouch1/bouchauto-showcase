import { Category, Product, FilterParams, PaginatedResponse } from "@/types/product";
import { mockCategories, mockProducts } from "@/data/mockData";

const USE_MOCK = true; // Set to false when API is ready
const API_BASE_URL = ""; // Will be set from env: process.env.NEXT_PUBLIC_API_BASE_URL

async function fetchJson<T>(path: string, params?: URLSearchParams): Promise<T> {
  const url = params ? `${API_BASE_URL}${path}?${params}` : `${API_BASE_URL}${path}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

// Mock implementations
function applyFilters(products: Product[], filters: FilterParams): Product[] {
  let filtered = [...products];

  if (filters.visible !== undefined) {
    filtered = filtered.filter(p => p.isVisible === filters.visible);
  }

  if (filters.featured !== undefined) {
    filtered = filtered.filter(p => p.isFeatured === filters.featured);
  }

  if (filters.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(search) ||
      p.shortDescription?.toLowerCase().includes(search) ||
      p.tags?.some(t => t.toLowerCase().includes(search))
    );
  }

  if (filters.category) {
    filtered = filtered.filter(p => p.categoryIds.includes(filters.category!));
  }

  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(p => 
      filters.tags!.some(tag => p.tags?.includes(tag))
    );
  }

  // Sorting
  if (filters.sortBy === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (filters.sortBy === 'newest') {
    filtered.sort((a, b) => (b.sortOrder || 0) - (a.sortOrder || 0));
  } else if (filters.sortBy === 'featured') {
    filtered.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }

  return filtered;
}

function paginateResults<T>(items: T[], page: number, perPage: number): PaginatedResponse<T> {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  
  return {
    data: items.slice(start, end),
    total: items.length,
    page,
    perPage,
    totalPages: Math.ceil(items.length / perPage),
  };
}

// API methods
export const api = {
  async getCategories(): Promise<Category[]> {
    if (USE_MOCK) {
      return Promise.resolve(mockCategories);
    }
    return fetchJson<Category[]>("/api/v1/categories");
  },

  async getProducts(filters: FilterParams = {}): Promise<PaginatedResponse<Product>> {
    if (USE_MOCK) {
      const filtered = applyFilters(mockProducts, filters);
      return Promise.resolve(paginateResults(filtered, filters.page || 1, filters.perPage || 12));
    }
    
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.category) params.append('category', filters.category);
    if (filters.tags) filters.tags.forEach(tag => params.append('tags[]', tag));
    if (filters.visible !== undefined) params.append('visible', filters.visible ? '1' : '0');
    if (filters.featured !== undefined) params.append('featured', filters.featured ? '1' : '0');
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.perPage) params.append('per_page', filters.perPage.toString());
    if (filters.sortBy) params.append('sort_by', filters.sortBy);
    
    return fetchJson<PaginatedResponse<Product>>("/api/v1/products", params);
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    if (USE_MOCK) {
      const product = mockProducts.find(p => p.slug === slug);
      return Promise.resolve(product || null);
    }
    return fetchJson<Product>(`/api/v1/products/${slug}`);
  },

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    if (USE_MOCK) {
      const category = mockCategories.find(c => c.slug === slug);
      return Promise.resolve(category || null);
    }
    return fetchJson<Category>(`/api/v1/categories/${slug}`);
  },

  async getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
    if (USE_MOCK) {
      const product = mockProducts.find(p => p.id === productId);
      if (!product) return Promise.resolve([]);
      
      // Get products from same categories
      const related = mockProducts.filter(p => 
        p.id !== productId &&
        p.isVisible &&
        p.categoryIds.some(catId => product.categoryIds.includes(catId))
      ).slice(0, limit);
      
      return Promise.resolve(related);
    }
    
    const params = new URLSearchParams();
    params.append('limit', limit.toString());
    return fetchJson<Product[]>(`/api/v1/products/${productId}/related`, params);
  },
};
