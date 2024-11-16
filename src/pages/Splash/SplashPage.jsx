import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import OptilookLogo from "./../../assets/optilook_logo.png";
import { ROUTES } from "../../constants/ROUTES";

const SplashPage = () => {
  return (
    <div className="grid items-center h-full px-4">
      <img src={OptilookLogo} className="w-40 mx-auto " />
      <Link to={ROUTES.SCAN_FACE} className="flex justify-center w-full">
        <Button className={"!w-3/4 mx-auto"}>Start</Button>
      </Link>
    </div>
  );
};

export default SplashPage;
