import { Link } from "react-router-dom";
import useTypes from "../../../Hooks/useTypes";

const TourType = () => {
  const [types, isLoadingTypes] = useTypes();
  return (
    <>
      <h4 className="text-2xl w-full text-center pt-12 font-bold">
        We provided the travels
      </h4>
      <div className="flex flex-wrap justify-center gap-10 mb-10 py-10">
        {!isLoadingTypes
          ? types?.map((eachTypes, idx) => {
              return (
                <Link
                  to={`/packages/${eachTypes?.type}`}
                  key={idx}
                  className="flex flex-col items-center justify-center hover:text-blue-700 hover:font-bold">
                  <figure className="rounded-full">
                    <img
                      className="rounded-full w-32 h-32"
                      src={eachTypes?.thumbnail}
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
