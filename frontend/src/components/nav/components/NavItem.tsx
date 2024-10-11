import { CSSProperties, ReactElement } from "react";
import { NavLink } from "react-router-dom";

interface PropsType {
  icon?: ReactElement;
  text?: string;
  styles?: CSSProperties;
  classes?: string;
  link: string;
  onClick?: () => void;
}

const NavItem = (props: PropsType) => {
  const { icon, text, styles, classes, link, onClick } = props;
  return (
    <NavLink
      title={text}
      to={link}
      style={({ isActive }) => ({
        ...styles,
        color: isActive ? "#d1004d" : "",
      })}
      className={`${
        classes ? classes : ""
      } flex gap-20 align-center color-white py-6 font-semibold rounded-lg transition overflow-hidden`}
      onClick={onClick}
    >
      {icon && <span className={`flex text-lg `}>{icon}</span>}
      {text && <span className="flex text-small truncate">{text}</span>}
    </NavLink>
  );
};

export default NavItem;
