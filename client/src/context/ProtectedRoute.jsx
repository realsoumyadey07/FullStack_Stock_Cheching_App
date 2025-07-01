import { Navigate, useLocation } from "react-router-dom";

export default function AuthRoute({ children }) {
  const access_token = localStorage.getItem("access_token");
  const location = useLocation();

  const publicPaths = ["/"];
  const currentPath = location.pathname;

  const isPublic = publicPaths.includes(currentPath);

  // If user tries to visit a public route while logged in → redirect to /conversations
  if (isPublic && access_token) {
    return <Navigate to="/home" replace />;
  }

  // If user tries to visit a protected route without token → redirect to /authentication
  if (!isPublic && !access_token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
