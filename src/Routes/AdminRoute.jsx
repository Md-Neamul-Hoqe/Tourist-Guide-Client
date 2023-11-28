import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loader from "../pages/Loader";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const [whichRole, isPaused, whichRolePending, whichRoleLoading] = useRole();

  console.log(loading, isPaused, whichRolePending, whichRoleLoading);

  if (loading || isPaused || whichRolePending || whichRoleLoading)
    return <Loader />;

  if (user?.email && whichRole === "admin") return children;

  return (
    <Navigate to="/credentials/login" state={location?.pathname} replace />
  );
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};
export default AdminRoute;
