import { useEffect, useState } from "react";
import Wrapper from "../../layout/wrappers/Wrapper";
import { FaInfoCircle } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import FilterPanel from "./components/FilterPanel";
import DetailViewPanel from "./components/DetailViewPanel";
import { spectDataSet } from "../../data/data";
import { useSpectacleFilter } from "../../hooks/useSpectacleFilter";
import { useSelector } from "react-redux";

// Reusable RecommendationCard Component
const RecommendationCard = ({ bgColor, recommendation }) => {
  return (
    <div
      className={`p-5 rounded shadow-md mt-4 border-l-4 ${
        bgColor === "orange"
          ? "bg-orange-100 border-orange-500"
          : "bg-blue-100 border-blue-500"
      }`}
    >
      <p
        className={`font-semibold ${
          bgColor === "orange" ? "text-orange-800" : "text-blue-800"
        }`}
      >
        {recommendation}
      </p>
    </div>
  );
};

function percentageToFloat(percentageString) {
  return parseFloat(percentageString?.replace("%", "")) / 1;
}

const EyeGlassPage = () => {
  const [filters, setFilters] = useState({
    shapes: [],
    colors: [],
    weight: "standard",
    shapeOrder: [],
    colorOrder: [],
  });

  const groupedSpectacles = useSpectacleFilter(spectDataSet, filters);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const [isDetailViewOpen, setDetailViewOpen] = useState(false);

  const toggleDetailView = () => {
    setDetailViewOpen(!isDetailViewOpen);
  };

  const {
    frameShapeResponse,
    frameColorResponse,
    screenTimeResponse,
    ageGroupResponse,
    jobCategoryReponse,
    isLoading,
  } = useSelector((state) => state.capture);

  useEffect(() => {
    if (frameShapeResponse) {
      const sortFrameShapes = Object.keys(frameShapeResponse).sort(
        (a, b) => frameShapeResponse[b] - frameShapeResponse[a]
      );

      setFilters((prev) => ({
        ...prev,
        shapes: sortFrameShapes,
        shapeOrder: sortFrameShapes,
        weight: "standard",
      }));
    }

    if (frameColorResponse) {
      const sortFrameColor = Object.keys(frameColorResponse).sort(
        (a, b) => frameColorResponse[b] - frameColorResponse[a]
      );

      setFilters((prev) => ({
        ...prev,
        colors: sortFrameColor,
        colorOrder: sortFrameColor,
        weight: "standard",
      }));
    }

    // age group response
    if (ageGroupResponse) {
      const ageGroupWeightPreference =
        ageGroupResponse?.probabilities?.weight_preferences;

      setFilters((prev) => ({
        ...prev,
        weight:
          percentageToFloat(ageGroupWeightPreference) > 50 ? "low" : "standard",
      }));
    }
  }, [
    frameShapeResponse,
    frameColorResponse,
    screenTimeResponse,
    ageGroupResponse,
    jobCategoryReponse,
  ]);

  return (
    <Wrapper header={"Eye Glasses"}>
      <div className="relative ">
        <FilterPanel
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />

        <DetailViewPanel
          isOpen={isDetailViewOpen}
          onClose={() => setDetailViewOpen(false)}
        />
        {/* Fixed Buttons */}
        <div className="sticky top-0 left-0 right-0 z-50 px-4 py-4 bg-secondary">
          <div className="flex justify-between gap-4">
            <button
              onClick={toggleDetailView}
              className="p-2 text-white bg-[#B4CCD1] rounded shadow-sm"
            >
              <FaInfoCircle color="#006D77" size={22} />
            </button>
            <button
              onClick={toggleFilter}
              className="p-2 text-white bg-[#B4CCD1] rounded shadow-sm"
            >
              <FaFilter color="#006D77" size={22} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Job Category Recommendation */}
          {jobCategoryReponse &&
            percentageToFloat(
              jobCategoryReponse?.probabilities?.use_uv_blocking
            ) > 50 && (
              <RecommendationCard
                bgColor="orange"
                recommendation={jobCategoryReponse?.recommendation}
              />
            )}

          {/* Screen Time Recommendation */}
          {screenTimeResponse &&
            percentageToFloat(
              screenTimeResponse?.probabilities?.use_blue_light_blocking
            ) > 40 && (
              <RecommendationCard
                bgColor="blue"
                recommendation={screenTimeResponse?.recommendation}
              />
            )}
        </div>

        {/* Frame Data */}
        <div className="p-6">
          {groupedSpectacles.map((shapeGroup) => (
            <div key={shapeGroup.title} className="mb-8">
              <h2 className="mb-4 text-lg font-bold text-gray-800">
                {shapeGroup.title}
              </h2>
              {shapeGroup.frames.map((frame) => (
                <div key={frame.colorName} className="mb-6">
                  <h3 className="mb-2 font-semibold text-gray-700 text-md bg-[#B4CCD1] px-1.5 py-2">
                    {frame.colorName}
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {frame.details.map((detail) =>
                      detail.images.map((image, index) => (
                        <div
                          key={index}
                          className="relative px-4 py-5 text-center bg-white border border-gray-300 rounded-lg shadow"
                        >
                          <div className="absolute top-0 right-0 p-1 bg-teal-500">
                            {detail?.weight}
                          </div>
                          <img
                            src={image}
                            alt={detail.name}
                            className="object-contain w-full h-40"
                          />

                          <label htmlFor="" className="w-full text-center">
                            {detail.name}
                          </label>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default EyeGlassPage;
