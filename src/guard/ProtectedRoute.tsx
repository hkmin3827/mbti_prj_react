import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute() {
  const { accessToken, hasHydrated } = useAuthStore();
  const location = useLocation();

  if (!hasHydrated) return <div>Loading...</div>;

  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
