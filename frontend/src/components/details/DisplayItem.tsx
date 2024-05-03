import React, { ReactElement } from "react";

const DisplayItem: React.FC<PropTypes> = (props) => {
  const { title, value, className } = props;
  return (
    <div
      className={`flex items-center gap-10 color-white font-medium ${
        className && className
      }`}
    >
      {title && <span className="title text-regular">{title}</span>}
      <span className="value">{value}</span>
    </div>
  );
};
interface PropTypes {
  title: string | number | ReactElement;
  value: string | number | null | undefined;
  className?: string;
}
export default DisplayItem;
