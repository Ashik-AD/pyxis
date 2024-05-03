import { Link } from "react-router-dom";
import {
  RiSearchEyeFill,
  RiHeartFill,
  RiHome5Fill,
  RiAddLine,
  RiLogoutCircleRLine,
} from "react-icons/ri";
import { MdSmartDisplay } from "react-icons/md";
import { BiLibrary } from "react-icons/bi";
import { BiCategoryAlt } from "react-icons/bi";

import NavItem from "./components/NavItem";
import CollectionLists from "./components/CollectionLists";
import Avatar from "./components/Avatar";
import CreateNewCollection from "../contextMenu/item/CreateNewCollection";
import WrapperLogout from "../logout/WrapperLogout";
const SideNav = () => {
  return (
    <nav className="hidden lg:visible h-screen overflow-x-hidden">
      <div
        className="bg-black flex flex-col space-between  min-h-100 py-20 z-2"
        style={{ paddingLeft: 20 }}
      >
        <div className="w-full flex flex-col gap-6" style={{ width: 230 }}>
          <div className="flex gap-20 color-white align-center">
            <BiCategoryAlt className="text-lg hover-scaleup transition cursor-pointer" />
            <Link
              to="/"
              className="color-purple text-lg font-bold hidden sm:visible"
            >
              Pyxis
            </Link>
          </div>
          <div
            className="flex flex-col color-gray gap-10"
            style={{ margin: "30px 0 20px 0" }}
          >
            <NavItem text="Home" icon={<RiHome5Fill />} link="/" />
            <NavItem text="Search" icon={<RiSearchEyeFill />} link="/search" />
            <NavItem
              text="My Library"
              icon={<BiLibrary />}
              link="/collection"
            />
          </div>
          <span className="text-xsm font-bold color-fade">#Collections</span>
          <div className="flex flex-col color-gray my-6 gap-10">
            <NavItem text="Liked" icon={<RiHeartFill />} link="/liked" />
            <NavItem
              text="Watchlist"
              icon={<MdSmartDisplay />}
              link="/watchlist"
            />
            <div className="flex gap-10 cursor-pointer">
              <span className="text-lg flex">
                <RiAddLine />
              </span>
              <CreateNewCollection
                label="Create Collection"
                classNames="font-semibold text-xsm"
              />
            </div>
            <div
              className="px-20 text-xsm font-semibold overflow-x-hidden scrollbar-on-hover"
              style={{
                maxHeight: 250,
                width: "80%",
              }}
            >
              <CollectionLists />
            </div>
          </div>
        </div>
        <div>
          <Avatar classes="text-sm" />
          <WrapperLogout>
            <NavItem
              text="Logout"
              icon={<RiLogoutCircleRLine />}
              link=""
              classes="color-red"
            />
          </WrapperLogout>
        </div>
      </div>
    </nav>
  );
};

export default SideNav;
