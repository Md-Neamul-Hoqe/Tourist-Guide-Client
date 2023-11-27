import useDashboardAuth from "../../Hooks/useDashboardAuth";
import AddStory from "./Sections/AddStory/AddStory";

const TouristProfile = () => {
  const { userProfile, isPendingUserInfo, isLoadingUserInfo } =
    useDashboardAuth();

  return (
    <div>
      {isLoadingUserInfo || isPendingUserInfo ? (
        "Loading..."
      ) : (
        <div className="card lg:card-side card-bordered rounded-lg">
          <figure className="p-10 border drop-shadow-2xl">
            <img className="w-32" src={userProfile?.profilePicture} alt={userProfile?.name} />
          </figure>
          <div className="card-body gap-0">
            <h2 className="card-title">
              {userProfile?.name}
              <span className="badge bg-white text-blue-700 badge-outline">
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
      <AddStory />
    </div>
  );
};

export default TouristProfile;
