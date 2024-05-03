import React from "react";
import { Link } from "react-router-dom";

const WithCard: React.FC<PropTypes> = ({ children, url }) => {
  return (
    <Link
      to={url}
      className="flex flex-col sm:flex-row sm:item-center gap-20 bg-secondary p-16 color-white rounded-lg cursor-pointer hover-bg-fade transition sm:align-bottom"
    >
      {children}
    </Link>
  );
};
interface PropTypes {
  url: string;
  children: React.ReactChild;
}

export default WithCard;
