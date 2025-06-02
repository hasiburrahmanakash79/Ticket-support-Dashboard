import { useEffect, useState, useCallback } from "react";
import apiClient from "../../lib/api-client";

const useUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/user");
      setUsers(res.data.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching users:", err.response?.data || err.message);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, refetch: fetchUsers };
};

export default useUser;