import { useEffect } from "react";
import Banner from "./Sections/Banner";
import Stories from "./Sections/Stories";
import TourType from "./Sections/TourType";
import Tourism from "./Sections/Tourism";
import Swal from "sweetalert2";
import welcome from "/welcome.png";
import { useState } from "react";
import Loader from "../Loader";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => setIsLoading(false), 1000);

  useEffect(() => {
    window.onload = function () {
      Swal.fire({
        title: "Welcome to My Dream Place",
        text: "You can now enjoy your travel experience with easy access to resources and more.",
        imageUrl: welcome,
        imageWidth: 250,
        imageHeight: 200,
        imageAlt: "welcome",
        confirmButtonText: "Get Started",
        confirmButtonColor: "#1d4ed8",
      });
    };
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      <Banner />
      <Tourism />
      <TourType />
      <Stories />
    </>
  );
};

export default Home;
