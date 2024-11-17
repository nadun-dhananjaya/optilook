import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SkinToneSelector from "../../FaceProfile/components/SkinToneSelector";
import { useSelector } from "react-redux";

const skinToneMapping = {
  Cool: 0,
  Neutral: 1,
  Warm: 2,
};

const faceShapeMapping = {
  Round: 1,
  Square: 2,
  Oval: 3,
  Oblong: 4,
  Heart: 5,
};

const DetailViewPanel = ({ isOpen, onClose }) => {
  const [faceShapeData, setFaceShapeData] = useState([]);
  const [skinToneData, setSkinToneData] = useState([]);

  const {
    faceShapeResponse,
    skinToneResponse,
    frameShapeResponse,
    frameColorResponse,
  } = useSelector((state) => state.capture);

  console.log(skinToneMapping[skinToneResponse?.predicted_class]);
  // Update faceShapeData and skinToneData when responses change
  useEffect(() => {
    if (frameShapeResponse) {
      const updatedFaceShapeData = Object.entries(frameShapeResponse).map(
        ([key, value]) => ({
          label: key.toUpperCase(), // Use the key as the label (e.g., "ROUND")
          value: Math.min(value, 100), // Ensure the value doesn't exceed 100%
        })
      );
      setFaceShapeData(updatedFaceShapeData);
    }

    if (frameColorResponse) {
      const updatedSkinToneData = Object.entries(frameColorResponse).map(
        ([key, value]) => ({
          label: key.toUpperCase(), // Use the key as the label (e.g., "BLACK")
          value: Math.min(value, 100), // Ensure the value doesn't exceed 100%
        })
      );
      setSkinToneData(updatedSkinToneData);
    }
  }, [frameShapeResponse, frameColorResponse]);

  // Animation variants for the panel
  const panelVariants = {
    open: {
      x: 0, // Slide in
      opacity: 1, // Fully visible
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      x: "100%", // Slide out
      opacity: 0, // Fully hidden
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100000] bg-gray-900 bg-opacity-50 flex justify-end"
          initial={{ opacity: 0 }} // Initial state for background
          animate={{ opacity: 1 }} // Background fade-in animation
          exit={{ opacity: 0 }} // Background fade-out animation
          onClick={onClose} // Close when clicking outside
        >
          <motion.div
            className="absolute right-0 h-full p-6 bg-white shadow-lg w-96"
            initial="closed"
            animate="open"
            exit="closed"
            variants={panelVariants} // Apply Framer Motion variants
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="h-[95vh] px-2 overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-teal-100">
              <h1 className="mb-6 text-2xl font-bold text-teal-800">INSIGHT</h1>

              {/* Your Face Shape */}
              <div className="mb-6">
                <h2 className="mb-2 text-lg font-semibold text-gray-800">
                  YOUR FACE SHAPE
                </h2>
                <div className="px-4 py-2 font-semibold text-black bg-[#B4CCD1] rounded-md">
                  {faceShapeResponse?.predicted_class ?? ""} Shape
                </div>
              </div>

              {/* Your Skin Tone */}
              <div className="mb-6">
                <h2 className="mb-2 text-[1.2rem] font-semibold text-gray-800">
                  YOUR SKIN TONE
                </h2>
                <SkinToneSelector
                  selectedIndex={
                    skinToneMapping[skinToneResponse?.predicted_class]
                  }
                />
              </div>

              {/* Popular Choices by Face Shape */}
              <div className="pt-4 mb-6">
                <h2 className="mb-2 text-[1.2rem] font-semibold text-gray-800">
                  POPULAR CHOICES BY YOUR FACE SHAPE
                </h2>
                {faceShapeData.map((item, index) => (
                  <div key={index} className="mb-2">
                    <p className="mb-1 text-sm font-medium text-gray-700">
                      {item.label}
                    </p>
                    <div className="relative h-4 overflow-hidden bg-[#B4CCD1] rounded-md">
                      <div
                        className="absolute top-0 left-0 h-full bg-[#006D77]"
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Popular Choices by Skin Tone */}
              <div>
                <h2 className="pt-4 mb-2 font-semibold text-gray-800 text-[1.2rem]">
                  POPULAR CHOICES BY YOUR SKIN TONE
                </h2>
                {skinToneData.map((item, index) => (
                  <div key={index} className="mb-2">
                    <p className="mb-1 text-sm font-medium text-gray-700">
                      {item.label}
                    </p>
                    <div className="relative h-4 overflow-hidden bg-[#B4CCD1] rounded-md">
                      <div
                        className="absolute top-0 left-0 h-full bg-[#006D77]"
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DetailViewPanel;
