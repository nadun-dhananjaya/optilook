import React, { useState } from "react";

const Dropdown = ({
  options,
  selectedOption,
  setSelectedOption,
  placeHolder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="w-full">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-lg font-bold text-black bg-[#B4CCD1] rounded-lg cursor-pointer"
      >
        <span>{selectedOption ? selectedOption : placeHolder}</span>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="mt-2 overflow-hidden bg-gray-200 rounded-lg shadow-lg">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionSelect(option)}
              className={`px-4 py-2 cursor-pointer text-lg hover:bg-gray-300 ${
                selectedOption === option ? "bg-gray-300" : ""
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
