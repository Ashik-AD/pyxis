import React from "react";

const DrpItem: React.FC<DrpPropTypes> = (props) => {
  const { text, classes, icon, handleClick, iconStyles } = props;
  return (
    <li
      className={`${classes ? classes : ""} flex items-center cursor-default`}
      onClick={handleClick}
    >
      <span className={`flex ${iconStyles ? iconStyles : ""}`}>{icon}</span>
      <span>{text}</span>
    </li>
  );
};

interface DrpPropTypes {
  text: string | number;
  classes?: string;
  icon?: any;
  handleClick?: () => void;
  iconStyles?: string;
}

export default DrpItem;
