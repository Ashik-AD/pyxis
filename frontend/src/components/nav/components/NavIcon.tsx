import React from "react";
import Icon from "./Icon";
const NavIcon: React.FC<IconDropPropTypes> = (props) => {
  const {
    icon,
    isActive,
    isMatched,
    handleIconClick,
    isOtherActive,
    areaLabel,
    classNames,
  } = props;
  return (
    <div className={`flex gap-10 align-center ${classNames ? classNames : ""}`}>
      <Icon
        icon={isActive || isMatched ? icon.active : icon.unActive}
        classes={`p-6 flex rounded-full hover-bg-fade transition-1 ${areaLabel} ${
          isMatched &&
          !isOtherActive &&
          "color-purple bg-pink-light transition-1"
        } ${isActive && "color-purple bg-pink-light transition-1"}`}
        handleClick={() => handleIconClick(true)}
      />
    </div>
  );
};

interface IconDropPropTypes {
  handleIconClick: (arg: boolean) => void;
  icon: { active: any; unActive: any };
  isMatched: boolean;
  isActive: boolean;
  isOtherActive: boolean;
  areaLabel: string;
  classNames?: string;
  label?: string;
}

export default NavIcon;
