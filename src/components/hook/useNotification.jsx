import { useEffect, useState, useCallback } from "react";
import apiClient from "../../lib/api-client";

const useNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/notification/get-notification-from-user");
      setNotifications(res.data.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching notifications:", err.response?.data || err.message);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    loading,
    error,
    refetch: fetchNotifications,
  };
};

export default useNotification;
