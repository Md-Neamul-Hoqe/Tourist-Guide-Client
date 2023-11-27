import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Guides from "../Guides/Guides";
import useDashboardAuth from "../../Hooks/useDashboardAuth";
import useAuth from "../../Hooks/useAuth";
import useGuides from "../../Hooks/useGuides";
import ReactDatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const PackageDetails = () => {
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();
  const axios = useAxiosPublic();
  const { user } = useAuth();
  const { userProfile, isPendingUserInfo, isLoadingUserInfo } =
    useDashboardAuth();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: tourPackage = {}, isLoading } = useQuery({
    queryKey: ["tourPackage"],
    queryFn: async () => {
      const res = await axios.get(`/details-packages/${id}`);
      // console.log("Details Package: ", res?.data);
      return res?.data;
    },
  });

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
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              });
          } catch (error) {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: error?.message,
              showConfirmButton: false,
              timer: 2000,
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
        email: userProfile?.contactDetails?.email,
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

                reset();

                return navigate("/dashboard/bookings", { replace: true });
              } else {
                Swal.fire({
                  icon: "error",
                  title: `Can't added.`,
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
          } catch (error) {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: error?.message,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        }
      });
    }
  };

  // console.log(tourPackage);

  const [guides] = useGuides();
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
        <div className="card rounded-none py-10 mt-20">
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
        </div>

        <div className="py-10">
          <h2 className="text-2xl font-semibold font-mono text-center">
            Our Tour Guides
          </h2>
          <Guides />
        </div>

        {/* Booking Section */}
        <div className="py-10">
          <h2 className="text-2xl font-semibold font-mono text-center">
            Book A Tour
          </h2>

          {/* User Info */}
          <div className="mx-10">
            {user?.email ? (
              isLoadingUserInfo || isPendingUserInfo ? (
                "Loading..."
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
                {...register("guide", { required: true })}>
                <option value="not selected" disabled>
                  Select a guide
                </option>
                {Array.isArray(guides) && guides?.length
                  ? guides?.map((guide) => (
                      <option
                        key={guide?._id}
                        value={JSON.stringify(guide)}
                        className="capitalize">
                        {guide?.name}
                      </option>
                    ))
                  : "loading..."}
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
                className={`btn btn-primary ${
                  user?.email ? "" : "btn-disabled"
                }`}>
                {bookingStatus?.isBooked ? "Booked" : "Book Now"}
              </button>
            </div>
            {/* {errors ? <p>{errors}</p> : null} */}
          </form>
        </div>
      </section>
    )
  );
};

export default PackageDetails;
