import { FC } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
const SearchLabel: FC = () => {
  return (
    <Link
      to="/search"
      className="rounded-regular flex px-10 py-6 align-center gap-10 overflow-x-hidden select-none"
      style={{
        background: "linear-gradient(90deg, #65656680 0.17%, #3434341f 49.46%)",
        cursor: "text",
        width: "auto",
        paddingRight: 20,
      }}
    >
      <span className="flex font-bold">
        <RiSearch2Line />
      </span>
      <span className="text-msm font-bold truncate color-gray">
        Search Movie, Tv shows, Artists...
      </span>
    </Link>
  );
};

export default SearchLabel;
