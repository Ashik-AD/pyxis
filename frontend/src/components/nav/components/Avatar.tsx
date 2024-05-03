import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../store/Store";
import profileImage from "../../../image/default_avatar.jpg";
import SkeletonElement from "../../skeleton/SkeletonElement";

const Avatar: React.FC<AvatarTypes> = () => {
  const {
    store: { user },
  } = useContext(StoreContext);
  return (
    <Link
      to="/profile/overview"
      className="flex gap-10 items-center font-semibold my-6"
      style={{ objectFit: "fill" }}
    >
      <img
        src={profileImage}
        alt="user_profile_image"
        className="rounded-full border-purple profile-btn"
        style={{ height: 25, width: 25 }}
      />
      <span>
        {user ? user.full_name.split(" ").shift() : <SkeletonElement />}
      </span>
    </Link>
  );
};

interface AvatarTypes {
  classes?: string;
  width?: string;
  height?: string;
}

export default Avatar;
