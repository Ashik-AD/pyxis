import React from "react";
import { Link } from "react-router-dom";
const DiscoverCard: React.FC<PropTypes> = ({ name, id, styles, type }) => {
  return (
    <Link
      to={`/discover/${type}/genre/${name.replaceAll(" ", "-")}-${id}/1`}
      key={id}
      className="flex h-100 px-10 text-sm content-center text-center sm:h-150 sm:text-medium font-semibold color-white rounded-lg hover-shadow transition"
      style={{ ...styles }}
    >
      {name}
    </Link>
  );
};
interface PropTypes {
  name: string;
  id: number | string;
  styles: React.CSSProperties;
  type: "movie" | "tv";
}

export default DiscoverCard;
