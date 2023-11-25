import { createContext } from "react";
import PropTypes from "prop-types";
import useUser from "../Hooks/useUser";
import useRole from "../Hooks/useRole";

export const DashboardContext = createContext(null);
const DashboardAuth = ({ children }) => {
  const [userProfile, isPendingUserInfo, isLoadingUserInfo] = useUser();

  const [whichRole, isPaused, whichRoleLoading, whichRolePending] = useRole();

  const dashboardInfo = {
    userProfile,
    isPendingUserInfo,
    isLoadingUserInfo,
    whichRole,
    whichRoleLoading,
    whichRolePending,
    isPaused,
  };

  return (
    <DashboardContext.Provider value={dashboardInfo}>
      {children}
    </DashboardContext.Provider>
  );
};

DashboardAuth.propTypes = {
  children: PropTypes.node,
};

export default DashboardAuth;
