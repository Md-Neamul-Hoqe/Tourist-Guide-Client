import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";

const Bookings = () => {
  const { user } = useAuth();
  const axios = useAxiosPublic();

  const {
    data: bookings = [],
    isLoading: isLoadingBookings,
    isPaused: isPausedBookings,
    isPending: isPendingBookings,
    refetch,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      /* TODO: need booked package details */
      const res = await axios.get(`/bookings?email=${user?.email}`);
      console.log("Details Package: ", res?.data);
      return res?.data;
    },
  });

  const handleRemoveFromBookings = (id) => {
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
            .delete(`/cancel-bookings/${id}?email=${user?.email}`)
            .then((res) => {
              if (res?.data?.deletedCount) {
                refetch();

                Swal.fire({
                  icon: "success",
                  title: "Booking Canceled.",
                  showConfirmButton: false,
                  timer: 1500,
                });
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
  };

  const handlePayment = (id) => {
    console.log(id);
  };

  const handleApply = (id) => {
    console.log(id);
  };
  return (
    <div>
      {!isPausedBookings && !isLoadingBookings && !isPendingBookings ? (
        <div className="overflow-x-auto">
          {Array.isArray(bookings) ? (
            bookings?.length ? (
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>Package Info</th>
                    <th>Guide Name</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Details</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th>Cancel</th>
                    <th>Apply</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings?.map((booking) => (
                    <tr key={booking?._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={booking?.packageInfo?.thumbnail}
                                alt={booking?.packageInfo?.title}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">
                              {booking?.packageInfo?.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{booking?.guideInfo?.name}</td>
                      <td>{booking?.price}$</td>
                      <td>{booking?.trip_date}</td>
                      <th>
                        <Link
                          to={`/details/${booking?.packageInfo?._id}`}
                          className="btn text-blue-700 btn-xs">
                          details
                        </Link>
                      </th>
                      <th>
                        <span
                          className={`whitespace-nowrap capitalize ${
                            booking?.status === "accepted"
                              ? "text-blue-700"
                              : booking?.status === "rejected"
                              ? " text-red-700"
                              : ""
                          }`}>
                          {booking?.status}
                        </span>
                      </th>
                      <th>
                        <button
                          onClick={() => handlePayment(booking?._id)}
                          className={`btn btn-xs  ${
                            booking?.status === "accepted" ? "" : "btn-disabled"
                          }`}>
                          Pay
                        </button>
                      </th>
                      <th>
                        <button
                          onClick={() => handleRemoveFromBookings(booking?._id)}
                          className="btn text-red-700 btn-xs">
                          Cancel
                        </button>
                      </th>
                      <th>
                        <button
                          onClick={() => handleApply(booking?._id)}
                          className={`btn btn-xs btn-disabled`}>
                          Apply
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className=" min-h-[calc(100vh-100px)] flex justify-center items-center">
                {"No Bookings Found"}
              </div>
            )
          ) : (
            <div className=" min-h-[calc(100vh-100px)] flex justify-center items-center">
              {`Something Wrong.`}
            </div>
          )}
        </div>
      ) : (
        "Loading.."
      )}
    </div>
  );
};

export default Bookings;
