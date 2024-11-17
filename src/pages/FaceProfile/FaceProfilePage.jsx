import Button from "../../components/button/Button";
import Label from "../../components/label/Label";
import ResultLabel from "../../components/label/ResultLabel";
import Wrapper from "../../layout/wrappers/Wrapper";
import { FaCamera, FaLongArrowAltRight } from "react-icons/fa";
import SkinToneSelector from "./components/SkinToneSelector";
import { useDispatch, useSelector } from "react-redux";
import {
  setFrameShapeResponse,
  setFrameColorResponse,
  startLoading,
  stopLoading,
} from "../../store/slice/captureSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/ROUTES";

const skinToneMapping = {
  Cool: 0,
  Neutral: 1,
  Warm: 2,
};

const faceShapeMapping = {
  Round: 1,
  Square: 2,
  Oval: 3,
  Oblong: 4,
  Heart: 5,
};

const FaceProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const { previewURL, faceShapeResponse, skinToneResponse, isLoading } =
    useSelector((state) => state.capture); // Get preview URL from Redux

  const getRecommendations = async () => {
    dispatch(startLoading());

    // Sample JSON data (replace with your actual payload)
    const requestData = {
      face_shape: faceShapeMapping[faceShapeResponse?.predicted_class],
      face_color: skinToneMapping[skinToneResponse?.predicted_class] + 1,
    };

    try {
      // Face shape response
      const frameShapeResponse = await fetch(
        "http://127.0.0.1:8000/predict/face_shape_frame_shape",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData), // Convert object to JSON string
        }
      );
      const frameShapeData = await frameShapeResponse.json();
      dispatch(setFrameShapeResponse(frameShapeData));

      // Skin tone response
      const skinToneResponse = await fetch(
        "http://127.0.0.1:8000/predict/face_color_frame_color",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData), // Convert object to JSON string
        }
      );
      const frameColorData = await skinToneResponse.json();
      dispatch(setFrameColorResponse(frameColorData));
      navigate(ROUTES.EYE_GLASS);

      console.log("Frame Shape Response:", frameShapeData);
      console.log("Frame Color Response:", frameColorData);

      dispatch(stopLoading());
    } catch (error) {
      console.error("Error uploading data:", error);
      dispatch(stopLoading()); // Ensure loading stops on error
    }
  };

  return (
    <Wrapper header={"Your Face Profile"}>
      <div className="p-4 g ">
        <div className="flex items-center p-2 mb-3 bg-[#B4CCD1] rounded">
          <img className="max-h-full rounded" src={previewURL} />
        </div>

        <div>
          <Label>Your face shape</Label>
          <ResultLabel>
            {faceShapeResponse?.predicted_class ?? ""} Shape
          </ResultLabel>
        </div>

        <div className="mt-8">
          <Label>Your Skin Tone</Label>
          <SkinToneSelector
            selectedIndex={
              skinToneMapping[skinToneResponse?.predicted_class] || null
            }
          />
        </div>

        <div className="mt-4">
          <Button
            onClick={getRecommendations}
            icon={<FaLongArrowAltRight size={20} />}
            className="flex-row-reverse gap-2"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="loader"></div>
                Processing...
              </div>
            ) : (
              "Find Glasses"
            )}
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default FaceProfilePage;
