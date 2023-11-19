import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { TOKEN_STORAGE_ID } from "./App";

export default function RequireAuth() {
  const { auth } = useAuth();
  const location = useLocation();

  let user = false;

  try {
    user = JSON.parse(localStorage.getItem(TOKEN_STORAGE_ID));
  } catch (error) {
    user = auth?.user;
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
