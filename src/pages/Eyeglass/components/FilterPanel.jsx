import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../../components/button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  setScreenTimeResponse,
  setAgeGroupResponse,
  setJobCategoryResponse,
  startLoading,
  stopLoading,
} from "./../../../store/slice/captureSlice";

const screenTimeMapping = {
  "<1": 1,
  "1-2": 2,
  "2-4": 3,
  "4-6": 4,
  ">6": 5,
};

const ageGroupMapping = {
  "18-24": 1,
  "25-34": 2,
  "35-44": 3,
  "45-54": 4,
  "55+": 5,
};

const jobCategoryMapping = {
  Student: 1,
  "Office Worker": 2,
  Driver: 3,
  "Doctor / Nurse": 4,
};

const FilterPanel = ({ isOpen, onClose }) => {
  // Local state for filters
  const [screenTime, setScreenTime] = useState(""); // For screen time filter
  const [age, setAge] = useState(""); // For age filter
  const [job, setJob] = useState("");
  const dispatch = useDispatch();

  // Clear filters
  const clearFilters = () => {
    setScreenTime("");
    setAge("");
    setJob("");
    onClose();
  };

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

  const applyFilter = async () => {
    if (screenTime != "") {
      const screenTimeReqData = {
        screen_time: screenTimeMapping[screenTime],
      };
      const screenTimeResponse = await fetch(
        "http://127.0.0.1:8000/recommend/blue_light_glasses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(screenTimeReqData), // Convert object to JSON string
        }
      );

      const screenTimeData = await screenTimeResponse.json();
      dispatch(setScreenTimeResponse(screenTimeData));
    }

    if (age != "") {
      const ageGroupReqData = {
        age_group: ageGroupMapping[age],
      };
      const ageGroupResponse = await fetch(
        "http://127.0.0.1:8000/recommend/age_group_frame_weight",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ageGroupReqData), // Convert object to JSON string
        }
      );

      const ageGroupData = await ageGroupResponse.json();
      dispatch(setAgeGroupResponse(ageGroupData));
    }

    if (job != "") {
      const jobCategoryReqData = {
        job_category: jobCategoryMapping[job],
      };
      const jobCategoryResponse = await fetch(
        "http://127.0.0.1:8000/recommend/uv_filter_glasses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jobCategoryReqData), // Convert object to JSON string
        }
      );

      const jobCategoryData = await jobCategoryResponse.json();
      dispatch(setJobCategoryResponse(jobCategoryData));
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 !z-[99999999] bg-gray-900 bg-opacity-50 flex justify-end"
          initial={{ opacity: 0 }} // Initial state for background
          animate={{ opacity: 1 }} // Background fade-in animation
          exit={{ opacity: 0 }} // Background fade-out animation
          onClick={onClose} // Close when clicking outside
        >
          <motion.div
            className="absolute right-0 h-full p-6 bg-white shadow-lg w-96 "
            initial="closed"
            animate="open"
            exit="closed"
            variants={panelVariants} // Apply Framer Motion variants
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="h-[95vh] pe-2 overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-teal-100">
              <h2 className="mb-4 text-xl font-bold">FILTER</h2>

              {/* Screen Time Section */}
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-semibold">YOUR SCREEN TIME</h3>
                <div className="space-y-2 ">
                  {["<1", "1-2", "2-4", "4-6", ">6"].map((time) => (
                    <label
                      key={time}
                      className="flex items-center space-x-1 bg-[#B4CCD1] ps-2 rounded"
                    >
                      <input
                        type="radio"
                        name="screenTime"
                        value={time}
                        className="accent-[#006D77]"
                        checked={screenTime === time}
                        onChange={() => setScreenTime(time)} // Update local state
                      />
                      <span className="w-full px-4 py-2 rounded-md">
                        {time === "<1" && "LESS THAN 1 HOURS"}
                        {time === "1-2" && "1-2 HOURS"}
                        {time === "2-4" && "2-4 HOURS"}
                        {time === "4-6" && "4-6 HOURS"}
                        {time === ">6" && "MORE THAN 6 HOURS"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Age Section */}
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-semibold">AGE</h3>
                <div className="space-y-2">
                  {["18-24", "25-34", "35-44", "45-54", "55+"].map(
                    (ageRange) => (
                      <label
                        key={ageRange}
                        className="flex items-center space-x-1 bg-[#B4CCD1] ps-2 rounded"
                      >
                        <input
                          type="radio"
                          name="age"
                          className="accent-[#006D77]"
                          value={ageRange}
                          checked={age === ageRange}
                          onChange={() => setAge(ageRange)} // Update local state
                        />
                        <span className="w-full px-4 py-2 rounded-md">
                          {ageRange}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Job Section */}
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-semibold">Job Category</h3>
                <div className="space-y-2">
                  {["Student", "Office Worker", "Driver", "Doctor / Nurse"].map(
                    (jobCategory, index) => (
                      <label
                        key={jobCategory}
                        className="flex items-center space-x-1 bg-[#B4CCD1] ps-2 rounded"
                      >
                        <input
                          type="radio"
                          name="job_category"
                          className="accent-[#006D77]"
                          value={jobCategory}
                          checked={job === jobCategory}
                          onChange={() => setJob(jobCategory)} // Update local state
                        />
                        <span className="w-full px-4 py-2 rounded-md">
                          {jobCategory}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>
              {/* Filter and Clear Buttons */}
              <div className="flex justify-between gap-2">
                <Button onClick={clearFilters}>CLEAR</Button>
                <Button onClick={applyFilter}>Apply</Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterPanel;
