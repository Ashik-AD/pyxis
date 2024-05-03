import { CSSProperties, FC, ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";

const NavItem: FC<PropsType> = (props) => {
  const { icon, text, styles, classes, link, iconClasses } = props;
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
      } flex gap-10 align-center color-gray py-6 font-semibold rounded-lg transition overflow-hidden`}
    >
      {icon && (
        <span className={`flex ${iconClasses ? iconClasses : "text-lg"}`}>
          {icon}
        </span>
      )}
      {text && <span className="flex text-xsm truncate">{text}</span>}
    </Link>
  );
};

interface PropsType {
  icon?: ReactElement;
  iconClasses?: string;
  text: string;
  styles?: CSSProperties;
  classes?: string;
  link: string;
}

export default NavItem;
