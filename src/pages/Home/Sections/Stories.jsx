import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
// import { useKeenSlider } from "keen-slider/react"
// import "keen-slider/keen-slider.min.css"

const Stories = () => {
  const axios = useAxiosPublic();

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      /* Get stories */
      const res = await axios.get("/stories.json");

      /* Get The package thumbnail using the id stored in story packageId */

      /* form a new array of object including the thumb */

      /* return the new array */
      return res?.data;
    },
  });

  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-20">
        {!isLoading &&
          stories?.map((story, idx) => {
            return (
              <div key={idx} className="card bg-base-100 shadow-xl image-full">
                <figure>
                  <img src={story?.image} alt={story?.title} />
                </figure>
                <Link to={`/user/story/${story?._id}`} className="card-body">
                  <h2 className="card-title">{story?.author}</h2>
                  <small>{story?.location}</small>
                  <p>{story?.story.slice(0, 100) + "..."}</p>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Stories;
