import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminDashboardRoute({ element }) {
  const { user } = useSelector((state) => state.auth);
  return user?.role === "admin" ? (
    element
  ) : (
    <Navigate
      to={"/login"}
      replace
      state={{ from: window.location.pathname }}
    />
  );
}

export default AdminDashboardRoute;
