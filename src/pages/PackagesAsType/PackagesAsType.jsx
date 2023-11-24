import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const PackagesAsType = () => {
  const axios = useAxiosPublic();
  const { type } = useParams();

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["ATypePackages"],
    queryFn: async () => {
      const res = await axios.get(`/packages/${type}`);

      console.log(res?.data);
      return res?.data;
    },
  });

  return <div>{!isLoading && packages?.length}</div>;
};

export default PackagesAsType;
