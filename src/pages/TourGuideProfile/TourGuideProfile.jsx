import Loader from "../Loader";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const TourGuideProfile = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axios = useAxiosPublic();
  const [rating, setRating] = useState(0);

  const {
    data: reviews = [],
    isLoading: isLoadingReviews,
    refetch: refetchReviews,
  } = useQuery({
    enabled: !!id,
    queryKey: ["reviews", id],
    queryFn: async () => {
      const reviews = await axios.get(`/reviews/${id}`);
      // console.log(reviews);
      return reviews?.data;
    },
  });

  // const { data: averageUserRating = 0 } = useQuery({
  //   enabled: !!id,
  //   queryKey: ["rating", id],
  //   queryFn: async () => {
  //     const reviews = await axios.get(`/rating/${id}`);
  //     console.log(reviews?.data);
  //     return reviews?.data?.rating;
  //   },
  // });

  const totalRating = reviews?.reduce(
    (total, currentValue) => total + currentValue?.rating,
    0
  );
  const averageRating = reviews?.length ? totalRating / reviews?.length : 0;

  const { register, reset, handleSubmit } = useForm();

  const {
    data: tourGuide = {},
    isPaused: isPausedGuide,
    isLoading,
  } = useQuery({
    enabled: !!id,
    queryKey: ["tour-guide", id],
    queryFn: async () => {
      const res = await axios.get(`/users/${id}`);
      // console.log(res?.data);
      return res?.data;
    },
  });
  // console.log(tourGuide?.contactDetails?.email, user?.email);
  const onSubmitForm = (data) => {
    // console.log(data);
    const { review, title } = data;

    const saveReview = {
      rating,
      title,
      review,
      user,
      date: new Date(),
      guide_id: id,
    };

    try {
      axios.post("/create-reviews", saveReview).then((res) => {
        if (res?.data?.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Review successful",
          });

          refetchReviews();
          reset();
          setRating(0);
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "warning",
        title: error.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };
  return (
    <>
      {/* About Guide */}
      <section>
        {!isPausedGuide && !isLoading && tourGuide ? (
          <div className="card lg:card-side card-bordered">
            <figure className="w-32 md:max-w-sm">
              <img
                className="w-full"
                src={tourGuide?.profilePicture}
                alt={tourGuide?.name}
              />
            </figure>
            <div className="card-body text-start">
              <h2 className="card-title text-2xl">
                {tourGuide?.name}
                <span className="badge text-xs bg-white text-blue-700 badge-outline">
                  {tourGuide?.role}
                </span>
              </h2>
              <p>Phone: {tourGuide?.contactDetails?.phone || "Not allowed"}</p>
              <p>Education: {tourGuide?.education || "Not allowed"}</p>
              <p>Skills: {tourGuide?.skills.toString() || "Not allowed"}</p>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </section>

      {/* Tourist Reviews */}
      <section>
        {!isPausedGuide && !isLoading && !isLoadingReviews ? (
          <div>
            <h2 className="font-semibold">Tourist Reviews</h2>
            <div className="flex gap-3">
              <Rating
                {...register("ratings")}
                style={{ maxWidth: 100 }}
                value={averageRating}
                halfFillMode="svg"
                itemStyles={{
                  itemShapes: RoundedStar,
                  activeFillColor: "#000000",
                  activeStrokeColor: "gray",
                  inactiveFillColor: "#eeeeee",
                  inactiveStrokeColor: "LightSeaGreen",
                }}
                readOnly
              />
              <span>{reviews?.length} reviews</span>
            </div>
          </div>
        ) : null}
      </section>

      {/* Give a review form */}
      <section
        className={`my-10 ${
          tourGuide?.contactDetails?.email === user?.email ? "hidden" : ""
        }`}>
        <h3 className="text-xl font-semibold font-mono">
          Review as {user?.email}
        </h3>
        <form onSubmit={handleSubmit(onSubmitForm)} className="card-body">
          <div className="w-full relative mb-10">
            <Rating
              style={{ maxWidth: 180 }}
              value={rating}
              itemStyles={{
                itemShapes: RoundedStar,
                activeFillColor: "#ffcf49",
                activeStrokeColor: "gray",
                inactiveFillColor: "#eeeeee",
                inactiveStrokeColor: "LightSeaGreen",
              }}
              isRequired={true}
              onChange={setRating}
            />
            <div className="form-control mt-5">
              <input
                type="text"
                {...register("title", { required: true })}
                placeholder="Title"
                className="input input-bordered"
              />
            </div>
            <div className="form-control my-5">
              <textarea
                {...register("review")}
                rows="10"
                placeholder="review text..."
                className="textarea textarea-bordered text-xl"></textarea>
              <button className="btn btn-neutral px-7 py-4 absolute right-10 bottom-12">
                Post Review
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Others Reviews */}
      {!isLoadingReviews ? (
        <section>
          <h2 className="text-3xl font-semibold p-5">
            {reviews?.length} Reviews
          </h2>
          <hr />
          <div>
            {reviews?.map((review) => {
              return (
                <div key={review?._id} className="card card-body">
                  <div className="flex gap-5 items-start max-md:flex-col">
                    <div>
                      <figure className="w-20 h-20 rounded-full">
                        <img
                          className="w-full"
                          src={user?.photoURL}
                          alt={user?.displayName}
                        />
                      </figure>
                    </div>

                    <div className="flex flex-col gap-1">
                      <h4 className="text-xl font-semibold">{review?.title}</h4>
                      <small className="text-sm font-semibold">
                        &mdash; {review?.user?.displayName}
                      </small>
                      <Rating
                        style={{ maxWidth: 100 }}
                        value={review?.rating}
                        itemStyles={{
                          itemShapes: RoundedStar,
                          activeFillColor: "#ffcf49",
                          activeStrokeColor: "gray",
                          inactiveFillColor: "#eeeeee",
                          inactiveStrokeColor: "LightSeaGreen",
                        }}
                        readOnly
                      />
                      <div className="rounded-lg my-5">{review?.review}</div>
                    </div>
                  </div>

                  <hr />
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default TourGuideProfile;
