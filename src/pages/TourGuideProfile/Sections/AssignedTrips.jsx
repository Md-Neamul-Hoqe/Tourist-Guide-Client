import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useUser from "../../../Hooks/useUser";

const AssignedTrips = () => {
  const [userProfile, isPendingUserInfo, isLoadingUserInfo] = useUser();
  const axios = useAxiosPublic();

  const {
    data: trips = [],
    isLoading: isLoadingTrips,
    isPaused: isPausedTrips,
    isPending: isPendingTrips,
    refetch,
  } = useQuery({
    enabled:
      !isPendingUserInfo &&
      !isLoadingUserInfo &&
      !!userProfile?.contactDetails?.email,
    queryKey: ["trips", userProfile?.contactDetails?.email],
    queryFn: async () => {
      /* TODO: need booked package details */
      const res = await axios.get(`/guide-trips/${userProfile?._id}`);
      console.log("Details Package: ", res?.data);
      return res?.data;
    },
  });

  const handleTripRequest = (id, status) => {
    console.log(id, status);
    Swal.fire({
      title: "Are you sure?",
      text: `You want to change the trip status as ${status}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.patch(`/update-trips/${id}`, { status }).then((res) => {
            if (res?.data?.modifiedCount) {
              refetch();

              Swal.fire({
                icon: "success",
                title: "Status updated.",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: `Can't Update.`,
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
  };

  return (
    <div>
      {!isLoadingUserInfo &&
      !isPausedTrips &&
      !isPendingTrips &&
      !isLoadingTrips ? (
        <div className="overflow-x-auto">
          {Array.isArray(trips) ? (
            trips?.length ? (
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>Package Info</th>
                    <th>Tourist Name</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Accept</th>
                    <th>Reject</th>
                  </tr>
                </thead>
                <tbody>
                  {trips?.map((trip) => (
                    <tr key={trip?._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={trip?.packageInfo?.thumbnail}
                                alt={trip?.packageInfo?.title}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">
                              {trip?.packageInfo?.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>{trip?.touristInfo?.name}</div>
                        <div>{trip?.touristInfo?.email}</div>
                      </td>
                      <td>{trip?.price}$</td>
                      <td>{trip?.trip_date}</td>

                      <th>
                        <button
                          onClick={() =>
                            handleTripRequest(trip?._id, "accepted")
                          }
                          className={`btn btn-xs ${
                            trip?.status === "in review" ? "" : "btn-disabled"
                          }`}>
                          {trip?.status === "accepted" ? "Accepted" : "Accept"}
                        </button>
                      </th>
                      <th>
                        <button
                          onClick={() =>
                            handleTripRequest(trip?._id, "rejected")
                          }
                          className={`btn btn-xs  ${
                            trip?.status === "in review" ? "" : "btn-disabled"
                          }`}>
                          {trip?.status === "rejected" ? "Rejected" : "Reject"}
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className=" min-h-[calc(100vh-100px)] flex justify-center items-center">
                {"No Trips Found"}
              </div>
            )
          ) : (
            <div className=" min-h-[calc(100vh-100px)] flex justify-center items-center">
              {`Something Wrong.`}
            </div>
          )}
        </div>
      ) : (
        <div className=" min-h-[calc(100vh-100px)] flex justify-center items-center">
          {`Something Wrong.`}
        </div>
      )}
    </div>
  );
};

export default AssignedTrips;
