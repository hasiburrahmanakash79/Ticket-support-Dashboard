import { useEffect, useState } from "react";
import apiClient from "../../lib/api-client";
import { getCookie } from "../../lib/cookie-utils";

let cachedAdmin = null;
let cachedPromise = null;

const useAdmin = () => {
  const [admin, setAdmin] = useState(cachedAdmin);
  const [loading, setLoading] = useState(!cachedAdmin);
  const [error, setError] = useState(null); // Add error state for better debugging

  const token = getCookie("accessToken");

  useEffect(() => {
    if (!token) {
      setAdmin(null);
      setLoading(false);
      setError("No access token found");
      return;
    }

    if (cachedAdmin) {
      setLoading(false);
      return;
    }

    setLoading(true);
    cachedPromise = apiClient
      .get("/user/me")
      .then((res) => {
        cachedAdmin = res.data.data;
        return cachedAdmin;
      })
      .catch((err) => {
        throw err; // Rethrow to handle in the next block
      });

    cachedPromise
      .then((data) => {
        setAdmin(data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching admin:", {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
        });
        setError(err.message);
        cachedAdmin = null; // Clear cache on error
        cachedPromise = null; // Clear promise on error
        setLoading(false);
      });
  }, [token]);

  return { admin, loading, error };
};

export default useAdmin;