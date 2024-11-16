import React, { useState } from "react";

const AgeSeeker = () => {
  const [selectedAge, setSelectedAge] = useState(30);
  const ages = Array.from({ length: 50 }, (_, i) => i + 17); // Array of ages from 34 to 64

  const handleAgeSelect = (age) => {
    setSelectedAge(age);
  };

  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="flex px-2 py-2 space-x-4">
        {ages.map((age) => (
          <div>
            <div
              key={age}
              onClick={() => handleAgeSelect(age)}
              className={`w-14  h-14 flex items-center justify-center rounded-lg cursor-pointer text-xl font-bold ${
                selectedAge === age
                  ? "border-4 border-teal-700"
                  : "border-2 border-gray-300"
              } ${
                selectedAge === age ? "transform scale-110" : ""
              } transition-transform duration-300`}
            >
              {age}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgeSeeker;
