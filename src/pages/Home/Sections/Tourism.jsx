import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import maxWidthStyles from "../../Shared/SectionMaxWidth";
import { BsTelephone } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import YouTube from "react-youtube";
import TourPackage from "../Components/TourPackage";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Guides from "../../Guides/Guides";
import Loader from "../../Loader";

const Tourism = () => {
  const axios = useAxiosPublic();

  const {
    data: packages = [],
    // refetch,
    isPending: packagesPending,
    isLoading: packagesLoading,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axios.get("/packages?max=4");
      // console.log(res?.data);
      return res?.data;
    },
  });

  return (
    <div className={`pt-24 max-lg:px-5 relative ${maxWidthStyles}`}>
      <Tabs>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Our Packages</Tab>
          <Tab>Meet Our Tour Guides</Tab>
        </TabList>

        <TabPanel>
          <div className="w-full my-20">
            <div className="w-full md:w-[80%] mx-auto">
              <YouTube
                loading="lazy"
                title={"Iceland Vacation Travel Guide | Dream Place"}
                opts={{
                  height: "400",
                  width: "100%",
                }}
                videoId="vzSHcyXfNPw"
                onReady={(event) => {
                  event.target.mute();
                  event.target.setVolume(0);
                  event.target.pauseVideo();
                }}
              />
            </div>

            <h5 className="font-mono pt-5">
              Iceland Vacation Travel Guide | Dream Place
            </h5>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-justify gap-6">
            <div>
              <strong>Comprehensive Travel Information:</strong>{" "}
              <p className="mt-4">
                Offer access to a wealth of information, including detailed
                destination guides, insider tips, local insights, and practical
                advice, empowering users to make well-informed travel decisions.
              </p>
            </div>
            <div>
              <strong>Curated Experiences:</strong>{" "}
              <p className="mt-4">
                Present curated itineraries, off-the-beaten-path
                recommendations, and unique experiences that cater to different
                travel preferences, whether it&apos;s adventure-seeking,
                cultural exploration, or relaxation.
              </p>
            </div>
            <div>
              <strong>Time-Saving Resources:</strong>{" "}
              <p className="mt-4">
                Provide users with time-saving tools such as pre-planned
                itineraries, suggested routes, packing lists, and essential
                travel tips, streamlining the trip planning process.
              </p>
            </div>
            <div>
              <strong>Authentic Insights:</strong>{" "}
              <p className="mt-4">
                Deliver authentic insights into various destinations, cultural
                nuances, traditions, and local customs, allowing travelers to
                immerse themselves more deeply in their chosen destinations.
              </p>
            </div>
            <div>
              <strong>Expert Guidance:</strong>{" "}
              <p className="mt-4">
                Offer expert advice from seasoned travelers, local guides, or
                travel experts who share firsthand experiences, recommendations,
                and insider knowledge, adding credibility and trust to the
                information provided.
              </p>
            </div>
            <div>
              <strong>Community Engagement:</strong>{" "}
              <p className="mt-4">
                Foster a sense of community where travelers can interact, share
                experiences, exchange tips, and seek advice from fellow
                globetrotters, creating a supportive and engaging environment.
              </p>
            </div>
            <div>
              <strong>Personalization:</strong>{" "}
              <p className="mt-4">
                Allow users to personalize their travel experiences by offering
                customizable options, enabling them to tailor their trips based
                on interests, budget, and preferences.
              </p>
            </div>
            <div>
              <strong>Special Offers and Deals:</strong>{" "}
              <p className="mt-4">
                Provide exclusive deals, discounts, or perks for users who
                engage with your platform, incentivizing them to choose your
                site for their travel needs.
              </p>
            </div>
            <div>
              <strong>Customer Support and Assistance:</strong>{" "}
              <p className="mt-4">
                Assure users of reliable customer support, providing assistance
                throughout their travel journey, whether it&apos;s pre-trip
                inquiries, on-the-go support, or post-travel feedback.
              </p>
            </div>
            <div>
              <strong>Inspiration and Motivation:</strong>{" "}
              <p className="mt-4">
                Inspire wanderlust by showcasing stunning visuals, captivating
                stories, and inspiring narratives that fuel the desire to
                explore new destinations and embark on exciting adventures.
              </p>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="flex justify-center items-center min-h-[calc(100vh/4)]">
            {!packagesPending && !packagesLoading ? (
              Array.isArray(packages) && packages?.length ? (
                <div className="flex flex-wrap justify-center gap-10 mb-10 py-10">
                  {
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {packages?.map((thePackage, idx) => (
                          <TourPackage key={idx} thePackage={thePackage} />
                        ))}
                      </div>
                      <div className="w-full my-10">
                        <Link
                          to={`/packages`}
                          className="btn bg-blue-700 text-white">
                          All Packages
                        </Link>
                      </div>
                    </>
                  }
                </div>
              ) : (
                "Something Wrong."
              )
            ) : (
              <Loader />
            )}
          </div>

          <div className="absolute right-10 bottom-0">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="btn btn-circle btn-outline outline-dotted outline-blue-700 btn-lg"
              to="tel:+8801725958889">
              <BsTelephone className="text-blue-700 text-3xl" />
            </motion.a>
          </div>
        </TabPanel>

        <TabPanel className={"mb-20"}>
          <Guides />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Tourism;
