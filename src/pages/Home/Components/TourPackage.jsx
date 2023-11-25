import PropTypes from "prop-types";
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const TourPackage = ({ thePackage }) => {
  const { user, wishList, refetchWishList } = useAuth();
  const axios = useAxiosPublic();
  const [inWishList, setInWishList] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const wishListLength = wishList?.length;
  if (wishListLength)
    for (let index = 0; index < wishListLength; index++) {
      if (wishList[index]?.package_id === thePackage?._id) {
        console.log(wishList[index]?.package_id, thePackage?._id);
        setInWishList(true);
        break;
      }
    }

  console.log(wishList, inWishList);

  // console.log(thePackage);

  const handleWishList = (id) => {
    if (!inWishList) {
      const wishPackage = {
        package_id: id,
        email: user?.email || "hoqe1997@gmail.com",
      };

      /* TODO: Check user is sign in else redirect to sign in page then other process */
      if (!user?.email) {
        return navigate("/credentials/login", { state: location?.pathname });
      }

      axios
        .post("/wish-list/add-packages", wishPackage)
        .then((res) => {
          console.log(res?.data);

          res?.data?.insertedId && setInWishList(!inWishList);
        })
        .catch(console.error);
    } else {
      axios
        .delete(`/wish-list/delete-package/${id}`)
        .then((res) => {
          console.log(res?.data);

          res?.data?.deletedCount && setInWishList(!inWishList);
        })
        .catch(console.error);
    }
    refetchWishList();
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

TourPackage.propTypes = {
  thePackage: PropTypes.object,
};

export default TourPackage;
