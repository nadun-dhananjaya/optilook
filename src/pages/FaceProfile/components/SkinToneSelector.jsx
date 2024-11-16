const SkinToneSelector = ({ selectedIndex }) => {
  const skinTones = ["#DAB892", "#A67C52", "#6A4E2D"]; // You can adjust these colors as needed

  return (
    <div className="flex items-center justify-center mt-2 space-x-2">
      {skinTones.map((color, index) => (
        <div
          key={index}
          className={`w-full h-8 rounded-md cursor-pointer ${
            selectedIndex === index ? "ring-4 ring-offset-2 ring-teal-500" : ""
          }`}
          style={{ backgroundColor: color }}
        ></div>
      ))}
    </div>
  );
};

export default SkinToneSelector;
