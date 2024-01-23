import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ allowedRoles }) {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  return allowedRoles.includes(user?.role) ? (
    <Outlet />
  ) : user ? (
    <Navigate to={"/"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
