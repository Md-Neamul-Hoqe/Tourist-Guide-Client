import PropTypes from "prop-types";
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const TouristPackage = ({ thePackage }) => {
  const [inWishList, setInWishList] = useState(false);
  console.log(thePackage);
  return (
    <div className="card bg-base-100 shadow-xl text-start">
      <div className="absolute right-3 top-3">
        <button
          className="btn text-2xl"
          onClick={() => setInWishList(!inWishList)}>
          {inWishList ? <FaHeart className="text-blue-700" /> : <FaRegHeart />}
        </button>
      </div>
      <figure className="min-h-[15rem]">
        <img
          className="h-full w-full"
          src={thePackage?.thumbnail}
          alt="Shoes"
        />
      </figure>
      <div className="card-body flex-grow">
        <h2 className="card-title">
          {thePackage?.title}
          <div className="badge badge-primary badge-outline">
            {thePackage?.type}
          </div>
        </h2>
        <p>{thePackage?.description.split(".")[0]}</p>
        <div className="card-actions justify-between items-center">
          <button className="text-blue-700">price: {thePackage?.price}$</button>
          <Link
            to={`/details-packages/${thePackage?._id}`}
            className="btn bg-blue-700 text-white">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

TouristPackage.propTypes = {
  thePackage: PropTypes.object,
};

export default TouristPackage;
