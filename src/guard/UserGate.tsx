import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

export function UserGate() {
  const { user, loading } = useContext(UserContext);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
