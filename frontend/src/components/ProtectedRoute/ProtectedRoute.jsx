import { Navigate, useLocation } from "react-router";

function ProtectedRoute({ isLoggedIn, children, anonymous = false }) {
  const location = useLocation();
  const from = location.state?.from || "/";

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
