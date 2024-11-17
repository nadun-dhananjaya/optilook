import { useState } from "react";
import Wrapper from "../../layout/wrappers/Wrapper";
import { FaInfoCircle } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import FilterPanel from "./components/FilterPanel";
import DetailViewPanel from "./components/DetailViewPanel";

const EyeGlassPage = () => {
  const frameData = [
    {
      title: "RECTANGULAR FRAMES",
      colors: [
        {
          colorName: "BLACK COLOR",
          images: ["/path/to/black1.png", "/path/to/black2.png"],
        },
        {
          colorName: "ORANGE COLOR",
          images: ["/path/to/orange1.png", "/path/to/orange2.png"],
        },
      ],
    },
    {
      title: "SQUARE FRAMES",
      colors: [
        {
          colorName: "BLACK COLOR",
          images: ["/path/to/squareBlack1.png", "/path/to/squareBlack2.png"],
        },
        {
          colorName: "ORANGE COLOR",
          images: ["/path/to/squareOrange1.png", "/path/to/squareOrange2.png"],
        },
      ],
    },
  ];

  
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const [isDetailViewOpen, setDetailViewOpen] = useState(false);

  const toggleDetailView = () => {
    setDetailViewOpen(!isDetailViewOpen);
  };

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

        {/* Frame Data */}
        {frameData.map((frame, index) => (
          <div key={index} className="px-4 mt-4 mb-8">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              {frame.title}
            </h2>

            {frame.colors.map((color, colorIndex) => (
              <div key={colorIndex} className="mb-6">
                <h3 className="mb-2 text-lg font-semibold px-1 text-gray-700 bg-[#B4CCD1]">
                  {color.colorName}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {color.images.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="p-2 bg-white border rounded-lg shadow-sm"
                    >
                      <img
                        src={image}
                        alt={`${frame.title} - ${color.colorName}`}
                        className="object-contain w-full h-auto"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default EyeGlassPage;
