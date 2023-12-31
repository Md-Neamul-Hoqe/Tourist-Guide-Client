import bannerBg from "../../../assets/authentication-bg.jpg";
import Typewriter from "typewriter-effect";
import maxWidthStyles from "../../Shared/SectionMaxWidth";

const Banner = () => {
  return (
    <section className={maxWidthStyles}>
      <div
        style={{
          backgroundColor: "#000000",
          backgroundImage: `url(${bannerBg})`,
          backgroundOrigin: "border-box",
          backgroundPosition: "center",
          backgroundSize: "cover",
          minHeight: "100vh",
        }}
        className="flex flex-col justify-center items-center text-white gap-10 text-center">
        <h2 className="font-cinzel md:text-3xl 2xl:text-5xl font-semibold first-letter:text-blue-700 first-letter:text-6xl">
          <Typewriter
            options={{
              strings: [
                "Destinations Decoded: Your Insider's Guide to Travel",
                "Wanderlust Wonders: Your Ultimate Travel Companion",
                "Discover Destinations: Unveiling the World's Hidden Gems",
                "Journey Beyond Boundaries: Explore, Experience, Enrich",
                "Roam, Relax, Repeat: Your Passport to Adventure",
                "Embark on Epic Escapades: Uncover the Globe's Beauty",
                "Navigate the World: Your Gateway to Extraordinary Places",
              ],
              autoStart: true,
              deleteSpeed: 5,
              loop: true,
            }}
          />
        </h2>
        <p className="md:text-lg 2xl:text-2xl font-light max-w-3xl max-md:px-5 max-md:text-justify">
          Plan and book our perfect trip with expert advice, travel tips,
          destination information and inspiration from us
        </p>
      </div>
    </section>
  );
};

export default Banner;
