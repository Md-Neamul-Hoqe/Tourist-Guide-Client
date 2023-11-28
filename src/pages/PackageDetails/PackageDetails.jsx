import Loader from "../Loader";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import AwesomeSlider from "react-awesome-slider";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Guides from "../Guides/Guides";
import useDashboardAuth from "../../Hooks/useDashboardAuth";
import useAuth from "../../Hooks/useAuth";
import useGuides from "../../Hooks/useGuides";
import ReactDatePicker from "react-datepicker";
import { useState } from "react";
import "react-awesome-slider/dist/styles.css";
import "react-datepicker/dist/react-datepicker.css";

const PackageDetails = () => {
  const { user } = useAuth();
  const { userProfile, isPendingUserInfo, isLoadingUserInfo } =
    useDashboardAuth();

  /* get all guides information */
  const [guides] = useGuides();

  const { id } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const axios = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  /* Get all information of the package */
  const { data: tourPackage = {}, isLoading } = useQuery({
    queryKey: ["tourPackage"],
    queryFn: async () => {
      const res = await axios.get(`/details-packages/${id}`);
      // console.log("Details Package: ", res?.data);
      return res?.data;
    },
  });

  /* Get all Tour Plane of the package */
  const {
    data: tourPlane = [],
    isLoading: isLoadingTourPlane,
    isPaused: isPausedTourPlane,
  } = useQuery({
    enabled: !!tourPackage?.type,
    queryKey: ["tourPlane"],
    queryFn: async () => {
      const res = await axios.get(`/tour-plane/${tourPackage?.type}`);

      console.log("Planes: ", res?.data);

      return res?.data?.planes;
    },
  });

  /* get the booking status of the package */
  const { data: bookingStatus = false } = useQuery({
    enabled: !!user?.email,
    queryKey: ["isBooked", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/isBooked/${id}?email=${user?.email}`);
      console.log("Already Package booked: ", res?.data);
      return res?.data;
    },
  });

  const onSubmitForm = (data) => {
    if (bookingStatus?.isBooked) {
      Swal.fire({
        title: "Are you sure?",
        text: "Cancel Your Booking",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            axios
              .delete(
                `/cancel-bookings/${bookingStatus?.bookingId}?email=${user?.email}`
              )
              .then((res) => {
                if (res?.data?.deletedCount) {
                  Swal.fire({
                    icon: "success",
                    title: "Booking Canceled.",
                    showConfirmButton: false,
                    timer: 1500,
                  });

                  return navigate("/dashboard/bookings", { replace: true });
                } else {
                  Swal.fire({
                    icon: "error",
                    title: `Can't Canceled.`,
                    showConfirmButton: true,
                  });
                }
              });
          } catch (error) {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: error?.message,
              showConfirmButton: true,
            });
          }
        }
      });
    } else {
      const { guide } = data;

      // console.log(guide);

      const bookingInfo = {
        packageInfo: {
          _id: tourPackage?._id,
          thumbnail: tourPackage?.thumbnail,
          title: tourPackage?.title,
        },
        guideInfo: JSON.parse(guide),
        price: tourPackage?.price,
        trip_date: startDate,
        touristInfo: {
          email: userProfile?.contactDetails?.email,
          name: userProfile?.name,
        },
        status: "in review",
      };

      Swal.fire({
        title: "Are you sure?",
        text: "Confirm Your Booking",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            axios.post("/create-booking", bookingInfo).then((res) => {
              if (res?.data?.insertedId) {
                Swal.fire({
                  icon: "success",
                  title: "Booked successfully.",
                  showConfirmButton: false,
                  timer: 1500,
                });

                if (bookingStatus?.countBookings === 3)
                  Swal.fire({
                    title: "Congratulations",
                    text: "Your got a discounts",
                    width: 600,
                    padding: "3em",
                    color: "red",
                    background: "#e2f5ea",
                    backdrop: `
          rgba(0,0,123,0.4)
          url("/backdrop.webp")
          left top / cover
          no-repeat
        `,
                  });

                reset();

                return navigate("/dashboard/bookings", { replace: true });
              } else {
                Swal.fire({
                  icon: "error",
                  title: `Can't added.`,
                  showConfirmButton: true,
                });
              }
            });
          } catch (error) {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: error?.message,
              showConfirmButton: true,
            });
          }
        }
      });
    }
  };

  console.log(tourPackage?.type);
  return (
    !isLoading && (
      <section>
        {/* Gallery section */}
        <AwesomeSlider>
          {tourPackage?.images?.map((image, idx) => (
            <div key={idx}>
              <img src={image} alt={tourPackage?.tile} />
            </div>
          ))}
        </AwesomeSlider>

        {/* About Section */}
        <section className="card rounded-none py-10 mt-20">
          <h2 className="text-xl text-center font-semibold font-mono">
            About The Package
          </h2>
          <div className="card-body">
            <h2 className="card-title">{tourPackage?.title}</h2>
            <small>
              Type: {tourPackage?.type}, Price: {tourPackage?.price}$
            </small>
            <p>{tourPackage?.description}</p>
          </div>
        </section>

        {/* Guides Section */}
        <section className="py-10">
          <h2 className="text-2xl font-semibold font-mono text-center">
            Our Tour Guides
          </h2>
          <Guides />
        </section>

        <section>
          {!isPausedTourPlane && !isLoadingTourPlane ? (
            Array.isArray(tourPlane) ? (
              tourPlane?.length ? (
                <>
                  <h2 className="font-mono text-2xl font-semibold text-center mb-20">
                    Tour Plane
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-20">
                    {tourPlane?.map((plane, idx) => (
                      <div key={idx} className="card bg-base-100 card-bordered">
                        <div className="absolute -left-3 -top-3">
                          <span className="px-3 py-2 rounded-xl bg-gradient-to-b from-blue-700 via-blue-400 to-blue-700 text-white">
                            Day {plane?.day}
                          </span>
                        </div>

                        <div className="card-body rounded-lg flex-grow bg-gradient-to-br from-blue-700 from-5% via-blue-400 to-blue-700 text-white">
                          <h2 className="card-title font-mono">
                            {plane?.title}
                          </h2>

                          <p className="text-xs">{plane?.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                "No Tour Plane Found"
              )
            ) : (
              "Something Wrong."
            )
          ) : (
            "Loading.."
          )}
        </section>

        {/* Booking Section */}
        <section className="py-10">
          <h2 className="text-2xl font-semibold font-mono text-center">
            Book A Tour
          </h2>

          {/* User Info */}
          <div className="mx-10">
            {user?.email ? (
              isLoadingUserInfo || isPendingUserInfo ? (
                <Loader />
              ) : (
                <div className="card lg:card-side card-bordered rounded-lg">
                  <figure className="p-3 border drop-shadow-2xl">
                    <img
                      className="w-24"
                      src={userProfile?.profilePicture}
                      alt={userProfile?.name}
                    />
                  </figure>
                  <div className="card-body gap-0">
                    <h2 className="card-title">{userProfile?.name}</h2>
                    <small className="text-xs">
                      {userProfile?.contactDetails?.email}
                    </small>
                    <small className="text-xs">
                      {userProfile?.contactDetails?.phone}
                    </small>
                  </div>
                </div>
              )
            ) : (
              <p className="text-red-700">You&apos;re not logged in.</p>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmitForm)} className="card-body">
            <div className="form-control">
              <ReactDatePicker
                className="input-bordered input"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Select a guide</span>
              </label>
              <select
                className="select select-bordered"
                {...register("guide", {
                  default: "not selected",
                  required: true,
                })}>
                <option value="not selected" disabled>
                  Select a guide
                </option>
                {Array.isArray(guides) && guides?.length ? (
                  guides?.map((guide) => (
                    <option
                      key={guide?._id}
                      value={JSON.stringify(guide)}
                      className="capitalize">
                      {guide?.name}
                    </option>
                  ))
                ) : (
                  <Loader />
                )}
              </select>
              {errors.guide ? (
                <p className="text-red-700">Guide is required</p>
              ) : null}
            </div>

            <div className="form-control">
              <small className="font-semibold">
                Type: {tourPackage?.type}, Price: {tourPackage?.price}$
              </small>
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn bg-blue-700 text-white ${
                  user?.email ? "" : "btn-disabled"
                }`}>
                {bookingStatus?.isBooked ? "Booked" : "Book Now"}
              </button>
            </div>
          </form>
        </section>
      </section>
    )
  );
};

export default PackageDetails;
