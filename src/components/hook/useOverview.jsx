import { useEffect, useState } from "react";
import apiClient from "../../lib/api-client";

const useOverview = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await apiClient.get("/dashboard/overview");
        setOverview(res.data.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  return { overview, loading };
};

export default useOverview;
