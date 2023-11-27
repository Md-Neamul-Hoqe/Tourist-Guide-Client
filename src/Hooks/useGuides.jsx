import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useGuides = () => {
  const axios = useAxiosPublic();

  const {
    data: guides = [],
    // refetch,
    isPending: guidesPending,
    isLoading: guidesLoading,
  } = useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      const res = await axios.get("/role-users/guide");

      return res?.data;
    },
  });
  return [guides, guidesPending, guidesLoading];
};

export default useGuides;
