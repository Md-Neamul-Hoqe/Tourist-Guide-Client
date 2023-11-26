import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import TourPackage from "../Home/Components/TourPackage";

const Packages = () => {
  const axios = useAxiosPublic();
  const {
    data: packages = [],
    // refetch,
    isPending: packagesPending,
    isLoading: packagesLoading,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axios.get("/packages");
      // console.log(res?.data);
      return res?.data;
    },
  });

  return (
    <div className="my-10">
      {packagesPending || packagesLoading ? (
        "Loading..."
      ) : packages?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {packages?.map((thePackage, idx) => (
            <TourPackage key={idx} thePackage={thePackage} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Packages;
