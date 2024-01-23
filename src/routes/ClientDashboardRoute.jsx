import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ClientDashboardRoute({ element }) {
  const { user } = useSelector((state) => state.auth);
  return user?.role === "client" ? (
    element
  ) : (
    <Navigate
      to={"/login"}
      replace
      state={{ from: window.location.pathname }}
    />
  );
}

export default ClientDashboardRoute;
