import { FC } from "react";

const AlertText: FC<PropsType> = ({ text, type }) => {
  return (
    <div
      className={`error absolute bottom-20 flex ${
        type === "info" ? "bg-info color-black" : "bg-primary"
      } color-white py-10 px-20 rounded-lg text-regular font-semibold`}
      style={{ zIndex: 9999 }}
    >
      {text}
    </div>
  );
};
type PropsType = {
  type: "info" | "warn";
  text: string | null;
};
export default AlertText;
