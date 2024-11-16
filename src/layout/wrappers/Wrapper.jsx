const Wrapper = ({ header, children }) => {
  return (
    <div className="h-[88vh] md:h-full">
      <div className="absolute top-0 left-0 flex items-end justify-center w-full h-16 bg-teal-700">
        <span className="pb-2 font-sans text-lg font-bold leading-normal text-center text-white uppercase">
          {header}
        </span>
      </div>
      <div className="h-full pt-16 overflow-x-hidden overflow-y-auto">
        {children}
      </div>
    </div>
  );
};
export default Wrapper;
