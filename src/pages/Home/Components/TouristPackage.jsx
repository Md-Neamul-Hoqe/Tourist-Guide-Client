import PropTypes from "prop-types";
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../../../Hooks/useAuth";

const TouristPackage = ({ thePackage }) => {
  const [inWishList, setInWishList] = useState(false);
  const { user } = useAuth();

  console.log(thePackage);

  const handleWishList = (id) => {
    const wishList = [];
    if (!wishList.includes(id)) {
      wishList.push(id);
    } else {
      const index = wishList.indexOf(id);
      wishList.splice(index - 1, 1);
    }

    /* TODO: update user's wishlist in database [put] */

    setInWishList(!inWishList);
  };
  return (
    <div className="card bg-base-100 shadow-xl text-start">
      <div className="absolute right-3 top-3">
        <motion.button
          className="btn text-2xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleWishList(thePackage?._id)}>
          {inWishList ? <FaHeart className="text-blue-700" /> : <FaRegHeart />}
        </motion.button>
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
