import useGuides from "../../Hooks/useGuides";
import TouristGuid from "../Home/Components/TouristGuid";

const Guides = () => {
  const [guides, guidesPending, guidesLoading] = useGuides();
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh/3)]">
      {!guidesPending && !guidesLoading ? (
        Array.isArray(guides) && guides?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {guides?.map((guide) => (
              <TouristGuid key={guide?._id} guide={guide} />
            ))}
          </div>
        ) : (
          "Something Wrong."
        )
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Guides;
