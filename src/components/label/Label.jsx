const Label = ({ children, className }) => {
  return (
    <label
      className={`font-sans text-base font-medium leading-normal text-black uppercase  ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
