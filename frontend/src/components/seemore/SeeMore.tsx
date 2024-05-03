import React from "react";
import { Link } from "react-router-dom";
const SeeMore: React.FC<PropTypes> = (props) => {
  return (
    <Link
      to={`all${props.url}`}
      className={`flex content-center color-info text-regular font-semibold h-full w-100 ${props.className}`}
    >
      See More
    </Link>
  );
};
interface PropTypes {
  url: string;
  className?: string;
}

export default SeeMore;
