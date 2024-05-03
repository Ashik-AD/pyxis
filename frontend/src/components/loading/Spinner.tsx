import { FC } from "react";
import { ImSpinner2 } from "react-icons/im";
const Spinner: FC<{ styles?: string }> = ({ styles }) => {
  return (
    <div className={`h-full w-full flex content-center ${styles && styles}`}>
      <ImSpinner2 className="color-info rotate-infinite" />
    </div>
  );
};

export default Spinner;
