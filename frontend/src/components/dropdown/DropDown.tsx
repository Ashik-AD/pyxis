import { useState, ReactNode, MouseEvent } from "react";

const DropDown = ({ children, label, styles, drpId }: PropTypes) => {
  const [isVisible, setIsVisible] = useState(false);

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    document.addEventListener("click", hideDropdown);

    function hideDropdown(eve: any) {
      if (eve.target == event.target) {
        let visible = !isVisible;
        setIsVisible(visible);
        return;
      }
      setIsVisible(false);
      document.removeEventListener("click", hideDropdown);
    }
  }

  return (
    <div className="relative">
      <div className={`drp_btn ${drpId}`} onClick={handleClick}>
        {label}
      </div>
      <div
        className={`w-full absolute ${
          styles ? styles : ""
        } ${!isVisible ? "visibility-hidden opacity-0" : ""} left-0`}
        style={{ top: "120%" }}
      >
        {children}
      </div>
    </div>
  );
};

interface PropTypes {
  children: ReactNode;
  label: ReactNode;
  styles?: string;
  drpId: string;
  handleDrp?: () => void;
  noHide?: boolean;
}

export default DropDown;
