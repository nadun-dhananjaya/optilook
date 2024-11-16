import React, { useState } from "react";
import { IoPerson } from "react-icons/io5";
import Male from "../../../assets/male.png";
import Female from "../../../assets/female.png";

const GenderSelector = ({ selectedGender, setSelectedGender }) => {
  return (
    <div className="flex justify-center space-x-6">
      <div
        className={`w-full h-40 flex flex-col items-center relative justify-center rounded-lg border-2 cursor-pointer ${
          selectedGender === "male" ? "border-teal-500" : "border-gray-300"
        }`}
        onClick={() => handleGenderSelect("male")}
      >
        <img src={Male} className="h-24" />
        {selectedGender === "male" && (
          <div className="absolute w-4 h-4 bg-teal-500 border-2 border-white rounded-full top-2 right-2"></div>
        )}
      </div>
      <div
        className={`w-full h-40 flex flex-col relative items-center justify-center rounded-lg border-2 cursor-pointer ${
          selectedGender === "female" ? "border-teal-500" : "border-gray-300"
        }`}
        onClick={() => handleGenderSelect("female")}
      >
        <img src={Female} className="h-24" />
        {selectedGender === "female" && (
          <div className="absolute w-4 h-4 bg-teal-500 border-2 border-white rounded-full top-2 right-2"></div>
        )}
      </div>
    </div>
  );
};

export default GenderSelector;
