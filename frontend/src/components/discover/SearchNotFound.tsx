import React from "react";
import { IoSearchCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const SearchNotFound: React.FC<{ search_key: string }> = ({ search_key }) => {
  return (
    <div className="flex flex-col content-center color-gray text-lg h-screen overflow-hidden">
      <div className="flex item-center font-semibold">
        <IoSearchCircleSharp className="text-heading mx-10" /> No result found
        for "
        <span className="font-bold color-white">{decodeURI(search_key)}"</span>
      </div>
      <div className="text-regular text-center font-semibold my-20 w-75">
        Please make sure your words are spelled correctly or use less or
        different keywords.
      </div>
      <Link
        to="/search/"
        className="text-regular font-semibold color-white my-20"
      >
        Go Back
      </Link>
    </div>
  );
};

export default SearchNotFound;
