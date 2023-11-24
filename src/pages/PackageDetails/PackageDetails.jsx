import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const PackageDetails = () => {
  const axios = useAxiosPublic();
  const { id } = useParams();

  const { data: tourPackage = {}, isLoading } = useQuery({
    queryKey: ["tourPackage"],
    queryFn: async () => {
      const res = await axios.get(`/details-packages/${id}`);
      console.log("Details Package: ", res?.data);
      return res?.data;
    },
  });
  return <div>{tourPackage?.title}</div>;
};

export default PackageDetails;
