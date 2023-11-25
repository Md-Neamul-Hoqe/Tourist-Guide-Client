import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTypes = () => {
    const axios = useAxiosPublic();

    const { data: types = [], isLoading:isLoadingTypes } = useQuery({
        queryKey: ["types"],
        queryFn: async () => {
          const { data } = await axios.get("/packages/types");
    
          console.log(data?.packages);
          return data?.packages;
        },
      });

      return [types, isLoadingTypes]
};

export default useTypes;