import Button from "../../components/button/Button";
import Label from "../../components/label/Label";
import ResultLabel from "../../components/label/ResultLabel";
import Wrapper from "../../layout/wrappers/Wrapper";
import { FaCamera, FaLongArrowAltRight } from "react-icons/fa";
import SkinToneSelector from "./components/SkinToneSelector";

const FaceProfilePage = () => {
  return (
    <Wrapper header={"Your Face Profile"}>
      <div className="p-4 g ">
        <div className="flex items-center p-2 mb-3 bg-[#B4CCD1] rounded">
          <img
            className="max-h-full rounded"
            src="https://s3-alpha-sig.figma.com/img/120e/ee42/19bc6882edb8b0d46e243ce680a0dbf2?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fwdbEeXUxCCUxEikj1DoBOef3EcxrbOYI33~Nm-3-bwJtGdFZJaQKI-eRjJ16aQYAS9y9AQbvWlMvNcZu5aJ3fJUj1UYrN7nDRz~JYeATfy1xRjwxXsmG6Etf79OuXI1~ZpZTBJhHP-QpOJaA8LYixRoYk25lZtdkbidSDkzDRmqlcJGuHdw9JNuQdc3I7ujeQTmbEsT30wq71MkHn2i0iTHCkuJ09uX63KZs90Ivbk9NrCTcNU-QLyHxQDjbQe551KsUYCaVtZ~ySfI2kDCD4k4LYMoSLOZkNuTiw6lNQVL0DTUPLeWNAj3EbbD-PiuYtuW56Dr-pXtMs2Ff-RhxA__"
          />
        </div>

        <div>
          <Label>Your face shape</Label>
          <ResultLabel>Diamond Shape</ResultLabel>
        </div>

        <div className="mt-8">
          <Label>Your Skin Tone</Label>
          <SkinToneSelector selectedIndex={1} />
        </div>

        <div className="mt-4">
          <Button
            icon={<FaLongArrowAltRight size={20} />}
            className="flex-row-reverse gap-2"
          >
            NExt
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default FaceProfilePage;
