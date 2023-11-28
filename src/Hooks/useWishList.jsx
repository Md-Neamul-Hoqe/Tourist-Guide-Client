import useAuth from "./useAuth";
import useAxiosHook from "./useAxiosHook";
import { useQuery } from "@tanstack/react-query";

const useWishList = () => {
  const axios = useAxiosHook();
  const { user } = useAuth();

  const {
    data: wishList = [],
    isLoading: wishListLoading,
    isPaused: wishListPaused,
    refetch: refetchWishList,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: [user?.email, "wish-list"],
    queryFn: async () => {
      if (user?.email) {
        const res = await axios.get(`/wish-list/${user?.email}`);
        console.log(res?.data);

        return res?.data;
      }
      return [];
    },
  });

  return [wishList, wishListLoading, wishListPaused, refetchWishList];
};

export default useWishList;
