import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useUser = () => {
  const { user } = useAuth();
  const axios = useAxiosPublic();

  // console.log(user?.photoURL);

  const {
    data: userProfile,
    isPending: isPendingUserInfo,
    isLoading: isLoadingUserInfo,
    refetch: refetchUserInfo,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: ["user-profile", user?.email],
    queryFn: async () => {
      if (user?.email) {
        const { data } = await axios.get(`/current-user/${user?.email}`);
        // console.log(data);

        return data;
      }
      return [];
    },
  });

  return [userProfile, isPendingUserInfo, isLoadingUserInfo, refetchUserInfo];
};

export default useUser;
