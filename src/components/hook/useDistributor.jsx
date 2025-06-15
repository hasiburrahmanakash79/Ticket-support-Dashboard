import { useCallback, useEffect, useState } from "react";
import apiClient from "../../lib/api-client";

const useDistributor = () => {
    const [distributors, setDistributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDistributor = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/distributor");
      setDistributors(res.data.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching Distributors:", err.response?.data || err.message);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDistributor();
  }, [fetchDistributor]);

  return { distributors, loading, error, refetch: fetchDistributor };
};


export default useDistributor;