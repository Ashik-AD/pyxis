//@TODO
// - add nav links
import { RiArrowLeftLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import ProfileImage from "../../image/default_avatar.jpg";
import DropDown from "../dropdown/DropDown";
const ProfileNavMobile = () => {
  return (
    <div
      className="flex space-between glass fixed left-10 top-10 p-10 rounded-xxlg color-white sm:hidden"
      style={{ width: "95%" }}
    >
      <div className="flex align-center gap-10 font-semibold">
        <Link to="../" className="flex color-white">
          <RiArrowLeftLine className="text-lg" />{" "}
        </Link>
        <span>Profile</span>
      </div>
      <div className="flex relative">
        <img
          src={ProfileImage}
          alt="profile"
          style={{ height: 30 }}
          className="user_avatar"
        />
        <DropDown drpId="user_avatar" label="">
          <div className="bg-secondary flex flex-col absolute top-20 my-20 right-0 w-200 p-6 shadow-lg rounded-regular">
          </div>
        </DropDown>
      </div>
    </div>
  );
};

export default ProfileNavMobile;
