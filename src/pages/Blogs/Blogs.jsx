import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import maxWidthStyles from "../Shared/SectionMaxWidth";

const Blogs = () => {
  const axios = useAxiosPublic();
  const { data: blogs, isLoading: isLoadingBlogs } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get("/blogs");
      // console.log('Blogs post: ',res?.data);

      return res?.data;
    },
  });

  return (
    <div className={`${maxWidthStyles} max-w-xl`}>
      {isLoadingBlogs ? (
        <Loader />
      ) : Array.isArray(blogs) ? (
        blogs?.length ? (
          blogs?.map((post) => (
            <div key={post?._id} className="card card-bordered mb-10">
              <div className="card-body gap-0 pb-2">
                <h2 className="card-title">
                  {post?.title}
                  <span className="badge bg-white text-blue-700 badge-outline">
                    {post?.badge}
                  </span>
                </h2>
                <small className="text-xs">{post?.date}</small>
              </div>
              <div className="card-body pt-0">
                <p>{post?.post}</p>
              </div>
            </div>
          ))
        ) : (
          <div className=" min-h-[calc(100vh-100px)] flex justify-center items-center">
            {"No blogs found"}
          </div>
        )
      ) : (
        <div className="min-h-[calc(100vh-100px)] flex justify-center items-center">
          {`Something Wrong.`}
        </div>
      )}
    </div>
  );
};

export default Blogs;
