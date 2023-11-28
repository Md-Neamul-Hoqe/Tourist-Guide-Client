import Loader from "../Loader";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import TourPackage from "../Home/Components/TourPackage";

const PackagesAsType = () => {
  const axios = useAxiosPublic();
  const { type } = useParams();

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["ATypePackages"],
    queryFn: async () => {
      const res = await axios.get(`/typed-packages/${type}`);

      // console.log(res?.data);
      return res?.data;
    },
  });

  return (
    <div className="py-20">
      {isLoading ? (
        <Loader/>
      ) : !isLoading && packages?.length ? (
        <>
          <h2 className="text-3xl text-center pb-5 font-cinzel">The Packages of Type: {type}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {packages?.map((Package) => (
              <TourPackage key={Package?._id} thePackage={Package} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center min-h-[calc(100vh/3)]">
          <h2 className="text-5xl">No Package Found. Search Another Type</h2>
        </div>
      )}
    </div>
  );
};

export default PackagesAsType;
