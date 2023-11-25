import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const AllStories = () => {
  const axios = useAxiosPublic();

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const { data } = await axios.get("/user/stories");
      return data;
    },
  });
  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 p-20">
        {!isLoading &&
          stories?.map((story, idx) => {
            return (
              <div key={idx} className="card rounded-lg max-h-52 image-full">
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
    </div>
  );
};

export default AllStories;
