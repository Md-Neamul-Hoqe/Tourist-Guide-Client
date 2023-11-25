import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useWishList = () => {
  const axios = useAxiosPublic();
  const { user, loading } = useAuth();

  // if (!user?.email) return;

  const {
    data: wishList = [],
    isLoading: wishListLoading,
    refetch: refetchWishList,
  } = useQuery({
    queryKey: [user?.email, "wish-list"],
    enabled: !loading,
    queryFn: async () => {
      if (user?.email) {
        const res = axios.get(`/wish-list/${user?.email}`);
        return res?.data;
      }
      return [];
    },
  });

  return [wishList, wishListLoading, refetchWishList];
};

export default useWishList;
