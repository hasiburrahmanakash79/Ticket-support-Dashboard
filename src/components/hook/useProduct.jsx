import { useState, useEffect } from 'react';
import apiClient from '../../lib/api-client';

const useProduct = ({ page = 1, status = '', searchTerm = '' }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await apiClient.get('/product', {
        params: {
          page,
          status,
          searchTerm
        }
      });

      setProducts(res?.data?.data || []);
      setTotalPages(res.data?.totalPages || 1);
      setError(null);

    } catch (err) {
      console.error("Error fetching Products:", err);
      setError(err?.response?.data?.message || "Failed to fetch Products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, status, searchTerm]);

  return {
    products,
    loading,
    error,
    totalPages,
    refetch: fetchProducts
  };
};

export default useProduct;
