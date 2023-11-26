import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
const useRole = () => {
  const { user } = useAuth();

  const axios = useAxiosPublic();
  const { data: whichRole ,isPending:whichRolePending,isPaused, isLoading: whichRoleLoading } = useQuery({
    enabled: !!user?.email,
    queryKey: ["whichRole", user?.email],
    queryFn: async () => {
      // if (user?.email) {
      const { data } = await axios.get(`/user/authorization/${user?.email}`);

      // console.log(data?.admin);

      return data?.admin;
      // }
      // return null;
    },
  });
  return [whichRole,isPaused, whichRolePending,whichRoleLoading];
};

export default useRole;
