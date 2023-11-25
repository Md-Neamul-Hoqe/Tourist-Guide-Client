import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const TourType = () => {
  const axios = useAxiosPublic();
  /**
   *  TODO: Get all types
   *  TODO: Show all in a swiper slider
   * */

  const { data: types = [], isLoading } = useQuery({
    queryKey: ["types"],
    queryFn: async () => {
      const typeList = [];
      const { data } = await axios.get("/packages");

      //   console.log(res?.data);

      data?.length &&
        data?.map((thePackage) => {
          if (!typeList.find((theObj) => theObj?.type === thePackage?.type))
            typeList.push({
              _id: thePackage?._id,
              type: thePackage?.type,
              thumb: thePackage?.thumbnail,
            });
        });

      //   console.log(typeList);
      return typeList;
    },
  });

  return (
    <>
      <h4 className="text-2xl w-full text-center pt-12 font-bold">
        We provided the travels
      </h4>
      <div className="flex flex-wrap justify-center gap-10 mb-10 py-10">
        {!isLoading
          ? types?.map((eachTypes, idx) => {
              return (
                <Link
                  to={`/packages/${eachTypes?.type}`}
                  key={idx}
                  className="flex flex-col items-center justify-center hover:text-blue-700 hover:font-bold">
                  <figure className="rounded-full">
                    <img
                      className="rounded-full w-32 h-32"
                      src={eachTypes?.thumb}
                      alt={eachTypes?.type}
                    />
                  </figure>
                  <p className="font-mono py-5">{eachTypes?.type}</p>
                </Link>
              );
            })
          : "Loading..."}
      </div>
    </>
  );
};

export default TourType;
