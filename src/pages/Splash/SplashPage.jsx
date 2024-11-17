import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import OptilookLogo from "./../../assets/optilook_logo.png";
import { ROUTES } from "../../constants/ROUTES";

const SplashPage = () => {
  return (
    <div className="grid items-center px-4 h-[90vh]">
      <img src={OptilookLogo} className="mx-auto w-72 " />
      <Link to={ROUTES.SCAN_FACE} className="flex justify-center w-full">
        <Button className={"!w-3/4 mx-auto"}>Start</Button>
      </Link>
    </div>
  );
};

export default SplashPage;
