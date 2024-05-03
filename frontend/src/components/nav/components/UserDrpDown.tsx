import React, { useContext } from "react";
import DropDown from "../../dropdown/DropDown";
import DrpItem from "../../dropdown/DrpItem";

import { IoChevronDown } from "react-icons/io5";
import {
  RiUser3Line,
  RiHeart3Line,
  RiPlayList2Line,
  RiListCheck2,
  RiLogoutCircleRLine,
} from "react-icons/ri";
import { BiSliderAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../store/Store";
const UserDrpDown = () => {
  const { store } = useContext(StoreContext);
  const classes =
    "py-8 px-10 gap-20 text-sm font-semibold cursor-default color-gray hover-bg-fade rounded-regular";
  const iconSize = "text-lg color-gray";
  return (
    <DropDown
      drpId="profile-btn"
      styles="my-20"
      label={
        <div className="hidden sm:visible">
          <button className="profile-btn flex content-center cursor-pointer color-white font-semibold rounded-xlg bg-primary border-0">
            {store.user && store.user.full_name.split(" ").shift()}{" "}
            <IoChevronDown
              className="flex content-center profile-btn text-medium"
              style={{ paddingTop: 4 }}
            />
          </button>
        </div>
      }
    >
      <ul
        className="bg-secondary rounded-lg shadow-medium"
        style={{ width: 200, padding: 4 }}
      >
        <Link to="/profile">
          <DrpItem
            text="Profile"
            icon={<RiUser3Line className={iconSize} />}
            classes={classes}
          />
        </Link>
        <Link to="/settings">
          <DrpItem
            text="Setting"
            icon={<BiSliderAlt className={iconSize} />}
            classes={classes}
          />
        </Link>
        <div
          className="bg-fade w-full"
          style={{ height: 1, margin: "5px 0" }}
        ></div>
        <Link to="/like">
          <DrpItem
            text="Liked"
            icon={<RiHeart3Line className={iconSize} />}
            classes={classes}
          />
        </Link>
        <Link to="/collection">
          <DrpItem
            text="My Collection"
            icon={<RiPlayList2Line className={iconSize} />}
            classes={classes}
          />
        </Link>
        <Link to="/watch-list">
          <DrpItem
            text="Watch List"
            icon={<RiListCheck2 className={iconSize} />}
            classes={classes}
          />
        </Link>
        <div
          className="bg-fade w-full"
          style={{ height: 1, margin: "5px 0" }}
        ></div>
        <DrpItem
          text="Log out"
          icon={<RiLogoutCircleRLine className={iconSize} />}
          classes={classes}
        />
      </ul>
    </DropDown>
  );
};

export default React.memo(UserDrpDown);
