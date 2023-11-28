import PropTypes from "prop-types";
import { CirclesWithBar } from "react-loader-spinner";

const Loader = ({ ratio = 1 }) => {
  /* tailwindcss can't calculate 2 step calculation so create class name then only put the class name variable */
  const min_height = `min-h-[calc(${100 / ratio}vh)]`;

  return (
    <div className={`flex justify-center items-center ${min_height}`}>
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
