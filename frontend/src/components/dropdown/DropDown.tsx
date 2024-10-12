import { useState, ReactNode, MouseEvent } from "react";

type Props = {
  children: ReactNode;
  label: ReactNode;
  styles?: string;
  drpId: string;
  handleDrp?: () => void;
  noHide?: boolean;
}


const DropDown = ({ children, label, styles, drpId }: Props) => {
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
        className={`absolute top-10 right-0 ${
          styles ? styles : ""
        } ${!isVisible ? "visibility-hidden opacity-0" : ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default DropDown;
