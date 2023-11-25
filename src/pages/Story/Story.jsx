import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Story = () => {
  const { id } = useParams();
  console.log(id);
  const axios = useAxiosPublic();

  const { data: story = {}, isLoading } = useQuery({
    queryKey: ["story"],
    queryFn: async () => {
      const { data } = await axios.get(`/user/stories/${id}`);
      return data;
    },
  });
  return (
    <div>
      {!isLoading ? (
        <div className="card bg-base-100 shadow-xl">
          <figure>
            <img
              className="rounded-xl max-h-96 w-3/4"
              src={story?.thumbnail}
              alt={story?.title}
            />
          </figure>
          <div className="card-body border rounded-md gap-0 my-5 mx-2">
            <h2 className="card-title mb-2">{story?.title}</h2>
            <small>{story?.author}</small>
            <div>
              <small>Location: {story?.location} </small>
              <small>Post: {story?.date}</small>
            </div>
            <hr className="my-5"/>
            <p className="text-justify">{story?.story.slice(0, 100) + "..."}</p>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Story;
