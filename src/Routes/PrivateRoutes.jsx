import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../Hooks/useAuth";
import Loader from "../pages/Loader";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  // console.log(loading);

  if (loading) return <Loader />;

  if (user?.email) return children;

  return (
    <Navigate to="/credentials/login" state={location?.pathname} replace />
  );
};

PrivateRoutes.propTypes = {
  children: PropTypes.node,
};
export default PrivateRoutes;
