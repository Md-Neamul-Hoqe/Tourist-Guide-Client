import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TouristGuid = ({ guide }) => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure className="w-32 md:max-w-sm">
        <img className="w-full" src={guide?.profilePicture} alt="Album" />
      </figure>
      <div className="card-body text-start">
        <h2 className="card-title">{guide?.name}</h2>
        <p>Phone: {guide?.contactDetails?.phone}</p>
        <p>Education: {guide?.education}</p>
        <p>Skills: {guide?.skills.toString()}</p>
        <div className="card-actions justify-end">
          <Link
            to={`/user/guides/${guide?._id}`}
            className="btn bg-blue-700 text-white">
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

TouristGuid.propTypes = {
  guide: PropTypes.object,
};

export default TouristGuid;