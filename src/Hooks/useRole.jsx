import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosHook from "./useAxiosHook";
const useRole = () => {
  const { user, loading } = useAuth();

  const axios = useAxiosHook();
  const { data: userRole, isLoading: userRoleLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading,
    queryFn: async () => {
      if (user?.email) {
        const res = await axios.get(`/user/admin/${user?.email}`);

        return res?.data?.admin;
      }
      return null;
    },
  });
  return [userRole, userRoleLoading];
};

export default useRole;
