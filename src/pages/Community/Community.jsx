import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const Community = () => {
  const axios = useAxiosPublic();

  const { data: stories, isLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const res = await axios.get("/user/stories");
      console.log(res?.data);

      return res?.data;
    },
  });

  return (
    <div>
      <div className="grid grid-cols-1 mx-32">
        {!isLoading &&
          stories?.map((story, idx) => {
            return (
              <div key={idx} className="card rounded-lg max-h-screen">
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
                  <p>{story?.story}</p>
                  <cite className="text-end">&mdash; {story?.author}</cite>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Community;
