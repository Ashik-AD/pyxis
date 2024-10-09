import React, { KeyboardEvent, KeyboardEventHandler, useRef } from "react";
import { RiCloseFill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import styles from "./styles.module.css";

type Props = {
  handleInputChange: (search_key: string) => void;
  searchValue?: string;
};

function SearchInput(props: Props) {
  let inputRef = useRef<HTMLInputElement | null>(null);
  const handleChange = (eve: React.FormEvent<HTMLInputElement>) => {
    if (!eve.currentTarget.value.trim()) {
      return false;
    } else {
      props.handleInputChange(eve.currentTarget.value);
    }
  };

  function handleClickBox() {
    inputRef?.current?.focus();
  }

  function handleClearSearchBox() {
    if (props.handleInputChange) {
      props.handleInputChange("");
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function handlePressEnterKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key?.toString().toLowerCase() == "enter") {
      if (props.handleInputChange && inputRef?.current) {
        props.handleInputChange(inputRef?.current?.value);
      }
    }
  }
  return (
    <div
      aria-labelledby="search box"
      className={`${styles.search_box} relative flex items-center content-center w-full sm:w-auto`}
      onClick={handleClickBox}
    >
      <span className={`flex`}>
        <FiSearch size={18} />
      </span>
      <input
        type="text"
        name="search_input"
        onChange={handleChange}
        placeholder="Movie, Tv shows & Artist..."
        autoFocus={true}
        defaultValue={props.searchValue}
        onKeyDown={handlePressEnterKey}
        title="Search here"
        ref={inputRef}
      />
      {props.searchValue && (
        <span
          className="cursor-pointer flex"
          title="Clear search"
          onClick={handleClearSearchBox}
        >
          <RiCloseFill size={18} />
        </span>
      )}
    </div>
  );
}
export default SearchInput;
