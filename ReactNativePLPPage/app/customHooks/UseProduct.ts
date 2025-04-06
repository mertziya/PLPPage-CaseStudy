import { useEffect, useState } from 'react';
import GetProduct from '../Services/GetProduct';

const useProduct = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null); // this expects an Error

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await GetProduct(productId);
        setProduct(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err); // ✅ safe assignment
        } else {
          setError(new Error('An unknown error occurred'));
        }
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  return { product, loading, error };
};

export default useProduct;