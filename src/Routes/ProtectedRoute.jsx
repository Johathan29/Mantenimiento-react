// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const userLogin = localStorage.getItem("user");
  return userLogin  ? children : <Navigate to="/" replace />;
}
