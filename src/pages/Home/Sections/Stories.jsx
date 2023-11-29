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
      const res = await axios.get("/user/stories?max=3");

      /* Get The package thumbnail using the id stored in story packageId */

      /* form a new array of object including the thumb */

      /* return the new array */
      return res?.data;
    },
  });

  return (
    <div className="text-center max-lg:p-5 lg:py-10">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-20">
        {!isLoading &&
          stories?.map((story, idx) => {
            return (
              <div key={idx} className="card md:max-h-52 rounded-lg image-full">
                <figure>
                  <img
                    className="w-full h-full rounded-lg"
                    src={story?.thumbnail}
                    alt={story?.title}
                  />
                </figure>
                <Link
                  to={`/user/story/${story?._id}`}
                  className="card-body text-start">
                  <p>{story?.story.slice(0, 150) + "..."}</p>
                  <cite className="text-end">&mdash; {story?.author}</cite>
                </Link>
              </div>
            );
          })}
      </div>
      <div>
        <Link to={`user/stories`} className="btn bg-blue-700 text-white">
          See All Stories
        </Link>
      </div>
    </div>
  );
};

export default Stories;
