import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAdmin from "../components/hook/useAdmin";
import Dashboard from "../Layouts/Dashboard";

const ProtectedRoute = () => {
  const { admin, loading } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!admin || admin.role !== "ADMIN")) {
      navigate("/signin"); // redirect to sign in page
    }
  }, [admin, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">Loading...</div>
    );
  }

  // While redirecting, don't render anything
  if (!admin || admin.role !== "ADMIN") {
    return null;
  }

  return <Dashboard />;
};

export default ProtectedRoute;
