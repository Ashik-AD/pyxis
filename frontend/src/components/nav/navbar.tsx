import { Link } from "react-router-dom";
import { FaSearch, FaAngleDown, FaHeart } from "react-icons/fa";
import { BiSolidCategoryAlt, BiSolidCollection } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io";

import NavItem from "./components/NavItem";
import Container from "../layout/container";
import DropDown from "../dropdown/DropDown";
import useUser from "../../hooks/useUser";

export default function Navbar() {
  const user = useUser();
  console.log(user)
  return (
    <nav className="absolute w-screen top-0 left-0 lg:visible z-2">
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
              {user ? <Profile fullName={user.full_name} /> : <NavItem text="Log in" link="/login" />}
              <NavItem icon={<FaSearch />} link="/search" />
              <NavItem icon={<BiSolidCategoryAlt />} link="" />
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
}
function Profile({ fullName, avatarURL }: ProfileProps) {
  return (
    <DropDown
      drpId="user_profile"
      label={
        <div className="flex color-white items-center gap-10 cursor-pointer">
          <img
            src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_6.png"
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
          text="Liked"
          link="/liked"
          icon={<FaHeart />}
          classes="p-16 hover-bg-fade:hover"
        />
        <NavItem
          text="Collections"
          link="/liked"
          icon={<BiSolidCollection />}
          classes="p-16 hover-bg-fade:hover"
        />
        <NavItem
          text="Logout"
          link="/"
          icon={<IoMdLogOut />}
          classes="p-16 hover-bg-fade:hover"
        />
      </div>
    </DropDown>
  );
}
