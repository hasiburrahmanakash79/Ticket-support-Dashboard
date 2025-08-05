import { useEffect, useState } from "react";
import apiClient from "../../lib/api-client";
import { getCookie } from "../../lib/cookie-utils";

let cachedAdmin = null;
let cachedPromise = null;

const useAdmin = () => {
  const [admin, setAdmin] = useState(cachedAdmin);
  const [loading, setLoading] = useState(!cachedAdmin);

  const token = getCookie("accessToken");

  useEffect(() => {
    if (cachedAdmin || !token) {
      setLoading(false);
      return;
    }

    if (!cachedPromise) {
      cachedPromise = apiClient.get("/user/me").then((res) => {
        cachedAdmin = res.data.data;
        return cachedAdmin;
      });
    }

    cachedPromise
      .then((data) => {
        setAdmin(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching admin:", err);
        setLoading(false);
      });
  }, [token]);

  return { admin, loading };
};

export default useAdmin;
