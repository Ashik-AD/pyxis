import React, { useRef } from "react";

const DropDown: React.FC<PropTypes> = ({
  children,
  label,
  styles,
  drpId,
  handleDrp,
  noHide,
}) => {
  const drpDownRef = useRef<HTMLDivElement>(null);

  window.addEventListener("click", (eve: any) => {
    if (noHide) {
      if (eve.target.classList.contains("noEffect")) {
        return;
      }
    }
    if (eve.target?.classList?.contains(drpId)) {
      drpDownRef.current?.classList.toggle("visibility-hidden");
    } else {
      drpDownRef.current?.classList.add("visibility-hidden");
      handleDrp && handleDrp();
    }
  });

  return (
    <div className="drp_container relative z-4">
      {label && <div className={`drp_btn ${drpId}`}>{label}</div>}
      <div
        className={`drp_list absolute visibility-hidden z-4 ${
          styles ? styles : ""
        } right-0`}
        ref={drpDownRef}
      >
        {children}
      </div>
    </div>
  );
};

interface PropTypes {
  children: React.ReactChild;
  label: any;
  styles?: string;
  drpId: string;
  handleDrp?: () => void;
  noHide?: boolean;
}

export default React.memo(DropDown);
