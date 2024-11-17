import Webcam from "react-webcam";
import Button from "../../components/button/Button";
import Wrapper from "../../layout/wrappers/Wrapper";
import { FaCamera } from "react-icons/fa";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startLoading,
  stopLoading,
  setImageFile,
  setPreviewURL,
  setFaceShapeResponse,
  setSkinToneResponse,
} from "../../store/slice/captureSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ROUTES } from "../../constants/ROUTES";

const ScanFacePage = () => {
  const videoConstraints = {
    facingMode: "user",
  };

  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { isLoading, imageFile } = useSelector((state) => state.capture);

  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const file = base64ToFile(imageSrc, "captured-image.jpg");
    dispatch(setImageFile(file));
    dispatch(startLoading());
    await sendImageFile(file);
    dispatch(stopLoading());
  };

  const base64ToFile = (base64, filename) => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const sendImageFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Face shape response
      const faceShapeResponse = await fetch(
        "http://127.0.0.1:8000/predict/face_shape",
        {
          method: "POST",
          body: formData,
        }
      );
      const faceShapeData = await faceShapeResponse.json();
      dispatch(setFaceShapeResponse(faceShapeData));
      const previewURL = URL.createObjectURL(file);
      dispatch(setPreviewURL(previewURL));

      // skin tone response
      const skinToneResponse = await fetch(
        "http://127.0.0.1:8000/predict/skin_tone",
        {
          method: "POST",
          body: formData,
        }
      );
      const skinToneData = await skinToneResponse.json();
      dispatch(setSkinToneResponse(skinToneData));

      navigate(ROUTES.FACE_PROFILE);

      console.log("Response:", skinToneData);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Wrapper header={"Scan Your Face"}>
      <div className="grid h-full md:h-full p-4 gap-3 grid-rows-[1fr_4rem]">
        <div className="flex items-center p-2 bg-[#B4CCD1] rounded">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="max-h-full rounded"
            videoConstraints={videoConstraints}
          />
        </div>
        <div>
          <Button
            onClick={captureImage}
            icon={isLoading ? null : <FaCamera size={18} />}
            className="gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="loader"></div>
                Processing...
              </div>
            ) : (
              "Scan Face"
            )}
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default ScanFacePage;
