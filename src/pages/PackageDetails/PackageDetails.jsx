import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

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

  console.log(tourPackage);
  return (
    !isLoading && (
      <section>
        <div></div>
        <div className="card rounded-none">
          <AwesomeSlider>
            {tourPackage?.images?.map((image, idx) => (
              <div key={idx}>
                <img src={image} alt={tourPackage?.tile} />
              </div>
            ))}
          </AwesomeSlider>
          <div className="card-body">
            <h2 className="card-title">{tourPackage?.title}</h2>
            <small>
              Type: {tourPackage?.type}, Price: {tourPackage?.price}
            </small>
            <p>{tourPackage?.description}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Book Now</button>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default PackageDetails;
