import { useEffect, useState } from 'react';
import { GetProducts } from '../Services/GetProducts';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const limit = 10;

  const fetchProducts = async (pageToFetch: number) => {
    try {
      const response = await GetProducts(pageToFetch, limit);
      const newProducts = response.data;

      // ✅ Normalize each product by injecting an `id` from `_id.$oid`
      const normalizedProducts = response.data.map((p: any): Product => ({
        id: p.id,
        main_image: p.main_image,
        price: p.price,
        names: { en: p.name }, // ✅ adapt the API's "name"
        vendor: { name: p.brand }, // ✅ adapt the API's "brand"
      }));

      if (pageToFetch === 1) {
        setProducts(normalizedProducts);
      } else {
        setProducts((prev) => [...prev, ...normalizedProducts]);
      }

      setHasMore(newProducts.length === limit);
    } catch (err) {
      setError('Something went wrong while fetching products.');
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchMore = () => {
    if (hasMore && !isFetchingMore) {
      setIsFetchingMore(true);
      setPage((prev) => prev + 1);
    }
  };

  return {
    products,
    loading,
    error,
    fetchMore,
    isFetchingMore,
  };
};