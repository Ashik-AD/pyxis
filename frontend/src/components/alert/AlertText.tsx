import { FC } from "react";
import { TiWarning } from "react-icons/ti";
import { AiFillInfoCircle } from "react-icons/ai";

const AlertText: FC<PropsType> = ({ text, type }) => {
  return (
    <div
      className={`error flex gap-10 items-center absolute bottom-20 flex ${
        type === "info" ? "bg-info" : "bg-danger"
      } color-white py-10 px-20 rounded-lg text-regular font-semibold`}
      style={{ zIndex: 9999 }}
    >
      <i className="flex">
        {type == "warn" ? (
          <TiWarning size={24} />
        ) : (
          <AiFillInfoCircle size={24} />
        )}
      </i>
      {text}
    </div>
  );
};
type PropsType = {
  type: "info" | "warn";
  text: string | null;
};
export default AlertText;
