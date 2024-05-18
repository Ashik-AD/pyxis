import { Link } from "react-router-dom";
import { FaSearch, FaAngleDown, FaHeart } from "react-icons/fa";
import { BiSolidCollection } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import NavItem from "./components/NavItem";
import Container from "../layout/container";
import DropDown from "../dropdown/DropDown";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";

import defaultAvatar from "../../image/default_avatar.jpg";

export default function Navbar() {
  const user = useUser();
  return (
    <nav className="absolute w-screen z-2">
      <Container> 
        <div className="flex flex-col space-between iteme-center  py-20 z-2">
          <div className="w-full flex gap-16 items-center space-between">
            <span className="flex gap-10 items-center">
              <Link
                to="/"
                className="text-lg color-white font-bold hidden sm:visible"
              >
                Pyxis
              </Link>
            </span>
            <div className="flex gap-30">
              {user ? (
                <Profile fullName={user.full_name} />
              ) : (
                <NavItem text="Log in" link="/login" />
              )}
              <NavItem icon={<FaSearch />} link="/search" />
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
}

type ProfileProps = {
  fullName: string;
  avatarURL?: string;
};

function Profile({ fullName, avatarURL }: ProfileProps) {
  const { logout } = useAuth();
  return (
    <DropDown
      drpId="user_profile"
      label={
        <div className="flex color-white items-center gap-10 cursor-pointer">
          <img
            src={avatarURL || defaultAvatar}
            className="rounded-full"
            height={32}
          />
          <span className="text-sm font-medium">{fullName}</span>
          <i className="flex">
            <FaAngleDown />
          </i>
        </div>
      }
    >
      <div className="bg-black py-10 rounded-lg border-1 border-gray">
        <NavItem
          text="Profile"
          link="/profile"
          icon={<IoPerson />}
          classes="p-16 hover-bg-fade:hover"
        />
        <NavItem
          text="Liked"
          link="/liked"
          icon={<FaHeart />}
          classes="p-16 hover-bg-fade:hover"
        />
        <NavItem
          text="Collections"
          link="/collection"
          icon={<BiSolidCollection />}
          classes="p-16 hover-bg-fade:hover"
        />
        <NavItem
          text="Logout"
          link="/"
          icon={<IoMdLogOut />}
          classes="p-16 hover-bg-fade:hover"
          onClick={logout}
        />
      </div>
    </DropDown>
  );
}
