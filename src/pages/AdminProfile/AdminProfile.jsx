import useDashboardAuth from "../../Hooks/useDashboardAuth";
import Loader from "../Loader";

const AdminProfile = () => {
  const { userProfile, isPendingUserInfo, isLoadingUserInfo } =
    useDashboardAuth();

  // console.log(userProfile);
  return (
    <div>
      {isLoadingUserInfo || isPendingUserInfo ? (
        <Loader />
      ) : (
        <div className="card lg:card-side card-bordered rounded-lg">
          <figure className="p-10 border max-w-xs">
            <img src={userProfile?.profilePicture} alt={userProfile?.name} />
          </figure>
          <div className="card-body gap-0">
            <h2 className="card-title text-2xl">
              {userProfile?.name}
              <span className="badge text-xs bg-white text-blue-700 badge-outline">
                {userProfile?.role}
              </span>
            </h2>
            <small className="text-xs">
              {userProfile?.contactDetails?.email}
            </small>
            <small className="text-xs">
              {userProfile?.contactDetails?.phone}
            </small>
          </div>
          <div className="card-body">
            <p>
              Experiences: {userProfile?.workExperience || "Not applicable"}
            </p>
            <p>Skills: {userProfile?.skills || "Not applicable"}</p>
            <p>
              Education Background: {userProfile?.education || "Not applicable"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
