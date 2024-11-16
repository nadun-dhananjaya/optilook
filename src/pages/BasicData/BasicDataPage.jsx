import Button from "../../components/button/Button";
import Label from "../../components/label/Label";
import Wrapper from "../../layout/wrappers/Wrapper";
import { FaLongArrowAltRight } from "react-icons/fa";
import GenderSelector from "./components/GenderSelector";
import AgeSeeker from "./components/AgeSeeker";
import Dropdown from "../../components/DropDown/DropDown";

const BasicDataPage = () => {
  return (
    <Wrapper header={"Basic Data"}>
      <div className="px-4 mt-4">
        <div>
          <Label>Your Gender</Label>
          <div className="pt-2">
            <GenderSelector />
          </div>
        </div>

        <div className="mt-8">
          <Label>Your Age</Label>
          <div className="pt-2">
            <AgeSeeker />
          </div>
        </div>

        <div className="mt-8">
          <Label>Outdoor Activities</Label>
          <div className="pt-2">
            <Dropdown
              label="Outdoor Activities"
              options={["Daily", "Weekly", "Monthly"]}
            />
          </div>
        </div>

        <div className="mt-10">
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

export default BasicDataPage;
