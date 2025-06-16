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


// import { useEffect, useState, useRef } from "react";
// import apiClient from "../../lib/api-client";

// const useOverview = () => {
//   const [overview, setOverview] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const hasFetched = useRef(false);

//   useEffect(() => {
//     if (hasFetched.current) return;
//     hasFetched.current = true;

//     const controller = new AbortController();

//     const fetchOverview = async () => {
//       try {
//         const res = await apiClient.get("/dashboard/overview", {
//           signal: controller.signal,
//         });

//         console.log("Fetched overview data", res.data);

//         // Try res.data OR res.data.data based on backend shape
//         setOverview(res.data?.data || res.data);
//       } catch (err) {
//         if (err.name !== "CanceledError" && err.name !== "AbortError") {
//           console.error("Error fetching overview:", err);
//           setError(err);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOverview();

//     return () => {
//       controller.abort();
//     };
//   }, []);

//   return { overview, loading, error };
// };

// export default useOverview;
