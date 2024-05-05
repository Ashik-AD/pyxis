import { CSSProperties, ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";

interface PropsType {
  icon?: ReactElement;
  text?: string;
  styles?: CSSProperties;
  classes?: string;
  link: string;
}

const NavItem = (props: PropsType) => {
  const { icon, text, styles, classes, link } = props;
  const { pathname } = useLocation();
  const routeMatch = () =>
    pathname &&
    link &&
    pathname.split("/")[1] &&
    pathname.split("/")[1].toLowerCase() === link.split("/")[1].toLowerCase();
  return (
    <Link
      title={text}
      to={link}
      style={{ ...styles, color: routeMatch() ? "#d1004d" : "" }}
      className={`${
        classes ? classes : ""
      } flex gap-10 align-center color-white py-6 font-semibold rounded-lg transition overflow-hidden`}
    >
      {icon && <span className={`flex`}>{icon}</span>}
      {text && <span className="flex text-xsm truncate">{text}</span>}
    </Link>
  );
};

export default NavItem;
