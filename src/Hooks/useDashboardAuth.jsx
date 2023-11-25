import { useContext } from "react";
import { DashboardContext } from "../Providers/DashboardAuth";

const useDashboardAuth = () => {
  return useContext(DashboardContext);
};

export default useDashboardAuth;
