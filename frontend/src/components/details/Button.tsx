import React, { ReactElement } from "react";

const Button: React.FC<PropTypes> = (props) => {
  const { title, styles, color, handleClick } = props;
  return (
    <button
      className={`flex content-center gap-10 color-white p-6 border-0 ${
        styles ? styles : ""
      }`}
      style={{ background: color }}
      onClick={handleClick}
    >
      {title}
      {props.children}
    </button>
  );
};

interface PropTypes {
  children?: ReactElement;
  handleClick?: () => void;
  title?: string;
  styles?: string;
  color?: string | undefined;
}

export default Button;
