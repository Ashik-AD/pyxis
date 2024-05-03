import React, { useEffect, useState } from "react";
import { DateProps } from "./input.type";
import Input from "./Input";
import monthLists from "../../utils/monthLists";

const DateInput: React.FC<DateProps> = (props) => {
  const { day, month, year, onDatePicked, error, onBlur } = props;
  const [activeDrpDown, setActiveDrpDown] = useState("");
  const handleDrpDownItemClick = (val: number | string, id: string) => {
    onDatePicked(id, val);
    setActiveDrpDown("");
  };

  const handleRemove = (e: any) => {
    if (e.target.name !== activeDrpDown) {
      if (activeDrpDown) {
        setActiveDrpDown("");
      }
    }
  };
  useEffect(() => {
    window.addEventListener("click", handleRemove);
    return () => {
      window.removeEventListener("click", handleRemove);
    };
  }, []);
  const handlePickDay = (eve: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = eve.currentTarget;
    setActiveDrpDown(name);
    if (name) {
      onDatePicked(name, value);
    }
  };

  const checkDate = (val: number) => (val > 0 ? val : "");
  return (
    <div className="relative">
      <div className="flex gap-10 py-10">
        <div className="drp-cont relative w-40 sm:w-33">
          <Input
            name="day"
            type="number"
            value={checkDate(day)}
            label="Day"
            onInputChange={handlePickDay}
            handleOnBlur={onBlur}
            error={error?.day}
            isShowError={false}
          />
          <CreateDrpDown
            limit={30}
            init={1}
            onClickDropDown={handleDrpDownItemClick}
            width={50}
            id="day"
            isActive={activeDrpDown === "day"}
          />
        </div>
        <div className="drp-cont relative w-75 sm:w-50">
          <Input
            name="month"
            type="text"
            value={month}
            label="Month"
            onInputChange={handlePickDay}
            handleOnBlur={onBlur}
            error={error?.month}
            isShowError={false}
          />
          <CreateDrpDown
            items={monthLists()}
            onClickDropDown={handleDrpDownItemClick}
            width={120}
            id="month"
            isActive={activeDrpDown === "month"}
          />
        </div>
        <div className="drp-cont relative w-60 sm:w-40">
          <Input
            name="year"
            type="number"
            value={checkDate(year)}
            label="Year"
            onInputChange={handlePickDay}
            handleOnBlur={onBlur}
            error={error?.year}
            isShowError={false}
          />
          <CreateDrpDown
            limit={new Date().getFullYear() - 1970}
            init={1970}
            onClickDropDown={handleDrpDownItemClick}
            width={90}
            id="year"
            isActive={activeDrpDown === "year"}
          />
        </div>
      </div>
      {error ? (
        <p className="color-red absolute right-10">
          {error.day || error.month || error.year}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};
interface DropdownProps {
  init?: number;
  limit?: number;
  width?: string | number;
  id: string;
  isActive: boolean;
  items?: Array<any>;
  onClickDropDown: (val: number, id: string) => void;
}
const CreateDrpDown: React.FC<DropdownProps> = (props) => {
  const { init, limit, width, id, isActive, items } = props;
  let lists = null;
  if (items) {
    lists = props.items!.map((e, index) => (
      <li
        key={index}
        onClick={() => props.onClickDropDown(e, props.id)}
        className="p-6 px-10 text-sm font-semibold cursor-pointer hover-bg-fade"
      >
        {e}
      </li>
    ));
  } else {
    lists = new Array(limit).fill(0).map((_, index) => (
      <li
        key={index}
        onClick={() => props.onClickDropDown(init ? init + index : 0, id)}
        className="p-6 px-10 text-sm font-semibold cursor-pointer hover-bg-fade"
      >
        {props.init ? props.init + index : ""}
      </li>
    ));
  }
  return (
    <ul
      className={`drop-container absolute bg-primary color-light-gray z-2 overflow-y-scroll py-5 rounded-regular shadow-lg left-10 ${
        !isActive ? "visibility-hidden" : null
      }`}
      style={{ height: 250, width: width }}
    >
      {lists}
    </ul>
  );
};

export default React.memo(DateInput);
