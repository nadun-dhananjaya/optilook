const Button = ({ children, icon, onClick = () => {}, className }) => {
  return (
    <button
      className={`inline-flex items-center w-full justify-center px-4 py-4 font-medium uppercase text-white bg-teal-700 rounded hover:bg-teal-600 active:hover:bg-teal-700 ${className}`}
      onClick={onClick}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};

export default Button;
