import { useCallback, useEffect, useState } from "react";
import apiClient from "../../lib/api-client";


const useBrand = () => {
    const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBrand = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/brand");
      setBrands(res.data.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching Brand:", err.response?.data || err.message);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrand();
  }, [fetchBrand]);

  return { brands, loading, error, refetch: fetchBrand };
};

export default useBrand;