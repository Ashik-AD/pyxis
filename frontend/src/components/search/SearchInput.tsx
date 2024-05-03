import React, { FC } from "react";
import { RiSearch2Line, RiCloseFill } from "react-icons/ri";
const SearchInput: FC<{
  handleInputChange: (search_key: string) => void;
  searchValue: string | null;
}> = (props) => {
  const handleChange = (eve: React.FormEvent<HTMLInputElement>) => {
    if (eve.currentTarget.value === " ") {
      return false;
    } else {
      props.handleInputChange(eve.currentTarget.value);
    }
  };
  return (
    <div className="flex my-20 px-20 sm:px-50">
      <div className="relative flex content-center w-full sm:w-auto">
        <input
          type="text"
          name="search_input"
          onChange={handleChange}
          className="py-16 px-20 rounded-xxlg border-0 w-full sm:w-400 bg-light-gray font-semibold"
          style={{ paddingLeft: 50 }}
          placeholder="Movie, Tv shows & Artist..."
          autoFocus={true}
          value={props.searchValue ? props.searchValue : ""}
          title="Search here"
        />
        <span className="absolute left-20 text-lg font-bold top-10">
          <RiSearch2Line />
        </span>
        {props.searchValue && (
          <span
            className="absolute right-20 text-lg font-bold top-10 cursor-pointer"
            title="Clear search"
            onClick={() => props.handleInputChange("")}
          >
            <RiCloseFill />
          </span>
        )}
      </div>
    </div>
  );
};
export default SearchInput;
