import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
const url = import.meta.env.DEV
  ? import.meta.env.VITE_SERVER_DEVELOPMENT
  : import.meta.env.VITE_SERVER_PRODUCTION;
const SelectCountry: React.FC<CountryProps> = (props) => {
  const { handleSelectCountry, value } = props;
  const [visible, setVisible] = useState(false);
  const [countryList, setCountryList] = useState<string[]>([]);

  useEffect(() => {
    let fetchCountry = null;
    fetchCountry = async () => {
      const { data } = await axios.get(`${url}/country/all`);
      setCountryList(data);
    };
    fetchCountry();
    return () => {
      fetchCountry = null;
    };
  }, []);

  const handleClickCountry = (name: string) => {
    handleSelectCountry(name);
    setVisible(false);
  };
  let searched = useMemo(() => {
    if (!value) return;
    return countryList.filter((el) =>
      el.toLowerCase().includes(value.toLowerCase())
    );
  }, [value]);

  // const handleOpenDropdown = (e: any) => {
  //   e.stopPropagation();
  //   setVisible(true);
  //   window.addEventListener("click", handleCloseDropdown);
  // };
  // const handleCloseDropdown = () => {
  //   setVisible(false);
  //   window.removeEventListener("click", handleCloseDropdown);
  // };

  const renderList = (list: string[]) => {
    return list.map((el: string, idx) => (
      <li
        className="py-6 px-20 cursor-pointer color-white hover-bg-fade truncate font-medium"
        onClick={() => handleClickCountry(el)}
        key={idx}
        data-id={el.toLowerCase()}
        style={{ fontSize: 13 }}
      >
        {el}
      </li>
    ));
  };
  return (
    <ul
      className={`select-country absolute  w-200 bg-primary rounded-lg overflow-x-hidden shadow-lg ${
        !visible ? "visibility-hidden" : " z-2"
      }`}
      style={{ maxHeight: 200 }}
    >
      {searched
        ? renderList(searched).map((el) => el)
        : renderList(countryList).map((el) => el)}
    </ul>
  );
};

interface CountryProps {
  handleSelectCountry: (countryName: string) => void;
  value?: string;
}

export default React.memo(SelectCountry);
