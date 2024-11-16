import Webcam from "react-webcam";
import Button from "../../components/button/Button";
import Wrapper from "../../layout/wrappers/Wrapper";
import { BiCamera } from "react-icons/bi";
import { FaCamera } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/ROUTES";

const ScanFacePage = () => {
  const videoConstraints = {
    facingMode: "user",
  };

  return (
    <Wrapper header={"Scan Your Face"}>
      <div className="grid h-full md:h-full p-4 gap-3 grid-rows-[1fr_4rem]">
        <div className="flex items-center p-2 bg-[#B4CCD1] rounded">
          <Webcam
            className="max-h-full rounded"
            videoConstraints={videoConstraints}
          />
        </div>
        <div>
          <Link to={ROUTES.FACE_PROFILE}>
            <Button icon={<FaCamera size={18} />} className="gap-2">
              Scan Face
            </Button>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default ScanFacePage;
