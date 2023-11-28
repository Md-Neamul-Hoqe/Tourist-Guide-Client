import React from "react";
import PropTypes from "prop-types";

const AdminProvider = ({ children }) => {
  const { user } = useAuth();

  // const

  return children;
};

AdminProvider.propTypes = {
  children: PropTypes.node,
};

export default AdminProvider;
