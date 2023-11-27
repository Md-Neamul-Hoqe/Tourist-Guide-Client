import { createContext } from "react";
import PropTypes from "prop-types";
import useUser from "../Hooks/useUser";

export const DashboardContext = createContext(null);
const DashboardAuth = ({ children }) => {
  const [userProfile, isPendingUserInfo, isLoadingUserInfo] = useUser();

  const dashboardInfo = {
    userProfile,
    isPendingUserInfo,
    isLoadingUserInfo,
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
