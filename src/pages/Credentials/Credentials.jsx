import loginImg from "../../assets/Illustration.svg";
import formImg from "../../assets/authentication.jpg";
import bgImg from "../../assets/authentication-bg.jpg";
import { Outlet } from "react-router-dom";

const Credentials = () => {
  return (
    <div
      className="md:hero min-h-screen"
      style={{ backgroundImage: `url(${bgImg})` }}>
      <div
        className={`hero-content justify-between xl:w-[1280px] flex-col lg:flex-row drop-shadow-2xl shadow-black md:p-10`}
        style={{ backgroundImage: `url(${formImg})` }}>
        <div className="text-center lg:text-left flex-1">
          <img src={loginImg} alt="Credentials Page" />
        </div>
        <div className="md:card flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Credentials;
