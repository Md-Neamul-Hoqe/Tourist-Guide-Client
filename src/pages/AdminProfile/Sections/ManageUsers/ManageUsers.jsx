import { useQuery } from "@tanstack/react-query";
import useRole from "../../../../Hooks/useRole";
import Swal from "sweetalert2";
import Loader from "../../../Loader";
import useAxiosHook from "../../../../Hooks/useAxiosHook";
import useAuth from "../../../../Hooks/useAuth";

const ManageUsers = () => {
  const axios = useAxiosHook();
  const { user, deleteCurrentUser } = useAuth();
  const [whichRole, isPaused, whichRolePending, whichRoleLoading] = useRole();

  const {
    data: users,
    isPending: isPendingUsers,
    isLoading: isLoadingUsers,
    refetch: refetchUsers,
  } = useQuery({
    enabled:
      !isPaused &&
      !whichRolePending &&
      !whichRoleLoading &&
      whichRole === "admin",
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axios.get(`/users?email=${user?.email}`);
      //   console.log(res?.data);

      return res?.data;
    },
  });

  const handleUserRole = (id, userRole) => {
    // console.log(id, userRole);
    try {
      axios
        .patch(`/update-user/${id}?email=${user?.email}`, { role: userRole })
        .then((res) => {
          if (res?.data?.modifiedCount) {
            Swal.fire({
              icon: "success",
              title: `User role updated as ${userRole}`,
              showConfirmButton: false,
              timer: 1000,
            });

            refetchUsers();
          }
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error?.message,
        showConfirmButton: true,
      });
    }
  };

  const handleRemoveUser = (id) => {
    // console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete the user",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .delete(`/delete-users/${id}?email=${user?.email}`)
            .then((response) => {
              if (response?.data?.deletedCount) {
                axios.get(`/users/${id}`).then((res) => {
                  console.log(res?.data);

                  // deleteCurrentUser(res?.data);
                });
                console.log(response?.data);

                Swal.fire({
                  icon: "success",
                  title: `User Removed with Id: ${id}`,
                  showConfirmButton: false,
                  timer: 1000,
                });

                refetchUsers();
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
      {!isPendingUsers && !isLoadingUsers && users?.length ? (
        <div className="overflow-x-auto">
          <table className="table max-md:table-xs">
            <thead>
              <tr>
                <th>Identity</th>
                <th>Role</th>
                <th>Education</th>
                <th className="text-center">manage role</th>
                <th className="text-center">Delete</th>
              </tr>
            </thead>

            <tbody>
              {users?.map((user) => (
                <tr key={user?._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={user?.profilePicture} alt={user?.name} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user?.name}</div>

                        {Array.isArray(user?.skills) ? (
                          user?.skills?.map((skill, idx) => (
                            <span
                              key={idx}
                              className="badge badge-ghost badge-sm">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="badge badge-ghost badge-sm">
                            {user?.skills}
                          </span>
                        )}

                        <div className="text-sm opacity-50">
                          {user?.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{user?.role}</td>
                  <td>{user?.education}</td>
                  <th className="text-center">
                    <button
                      onClick={() => handleUserRole(user?._id, "admin")}
                      className={`btn text-blue-700 bg-white btn-xs ${
                        user?.role === "admin" || user?.role === "guide"
                          ? "btn-disabled"
                          : ""
                      }`}>
                      Make Admin
                    </button>
                    <button
                      onClick={() => handleUserRole(user?._id, "guide")}
                      className={`btn text-green-700 bg-white btn-xs ${
                        user?.role === "admin" || user?.role === "guide"
                          ? "btn-disabled"
                          : ""
                      }`}>
                      Make Guide
                    </button>
                  </th>
                  <th>
                    <button
                      onClick={() => handleRemoveUser(user?._id)}
                      className={`btn text-red-700 bg-white btn-xs`}>
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ManageUsers;
