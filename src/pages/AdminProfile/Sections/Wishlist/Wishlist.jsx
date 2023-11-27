import { Link } from "react-router-dom";
import useWishList from "../../../../Hooks/useWishList";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Wishlist = () => {
  const axios = useAxiosPublic();
  const [wishList, wishListLoading, wishListPaused, refetchWishList] =
    useWishList();

  const handleRemoveFromWishList = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(`/wish-list/delete-package/${id}`).then((res) => {
            if (res?.data?.deletedCount) {
              refetchWishList();

              Swal.fire({
                icon: "success",
                title: `The package removed from wishlist.`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: `Database error: ${error?.message}.`,
            showConfirmButton: true,
          });
        }
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center py-5">Wishlist</h2>
      {!wishListPaused && !wishListLoading ? (
        <div className="overflow-x-auto">
          {Array.isArray(wishList) ? (
            wishList?.length ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Details</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {wishList?.map((Package) => (
                    <tr key={Package?._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={Package?.thumbnail}
                                alt={Package?.title}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{Package?.title}</div>
                            <div className="text-sm opacity-50">
                              {Package?.type}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{Package?.price}$</td>
                      <th>
                        <Link
                          to={`/details/${Package?._id}`}
                          className="btn text-blue-700 btn-xs">
                          details
                        </Link>
                      </th>
                      <th>
                        <button
                          onClick={() => handleRemoveFromWishList(Package?._id)}
                          className="btn text-red-700 btn-xs">
                          delete
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

export default Wishlist;
