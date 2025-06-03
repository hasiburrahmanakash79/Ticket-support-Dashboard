import { useEffect, useState } from "react";
import apiClient from "../../lib/api-client";

const useAdmin = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await apiClient.get("/user/me");
        setAdmin(res.data.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  return { admin, loading };
};

export default useAdmin;
