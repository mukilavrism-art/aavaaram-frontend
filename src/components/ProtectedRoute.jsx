import { Navigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

export default function ProtectedRoute({ children }) {

  const { isLoggedIn } = useAdmin();

  return isLoggedIn() ? children : <Navigate to="/admin-login" />;
}
