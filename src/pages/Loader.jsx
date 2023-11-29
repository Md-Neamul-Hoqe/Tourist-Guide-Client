import PropTypes from "prop-types";
import { CirclesWithBar } from "react-loader-spinner";

const Loader = () => {
  /* tailwindcss can't calculate 2 step calculation so create class name then only put the class name variable */
  // const min_height = `flex justify-center items-center min-h-[calc(${
  //   100 / ratio
  // }vh)]`;

  // console.log(min_height);

  return (
    <div className={`flex justify-center items-center min-h-screen`}>
      <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel="circles-with-bar-loading"
      />
      ;
    </div>
  );
};

Loader.propTypes = {
  ratio: PropTypes.number,
};

export default Loader;
