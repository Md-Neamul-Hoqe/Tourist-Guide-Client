import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import maxWidthStyles from "../../Shared/SectionMaxWidth";

const Tourism = () => {
  return (
    <div className={`py-24 ${maxWidthStyles}`}>
      <Tabs>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Our Packages</Tab>
          <Tab>Meet Our Tour Guides</Tab>
        </TabList>

        <TabPanel>
          <div className="w-full my-10">
            <iframe
            className="mx-auto rounded-box"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/vzSHcyXfNPw?si=c3uBnLacbnVvOptL&amp;start=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen></iframe>
            <h5 className="font-mono pt-5">Iceland Vacation Travel Guide | Dream Place</h5>
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
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Tourism;
