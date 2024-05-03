import { RiArrowLeftLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import profileRoutes from "./ProfileRoutes";
const ProfileSideBar = () => {
  return (
    <div
      className="h-full w-250 flex top-0 bg-secondary flex-col rounded-lg p-20 color-white "
      style={{ borderLeft: "2px" }}
    >
      <div className="flex gap-20 align-center text-lg font-semibold letter-2 ">
        <Link to="../" className="xl:hidden flex color-white ">
          <RiArrowLeftLine />
        </Link>
        <span>PROFILE</span>
      </div>
      <div className="flex flex-col gap-30 my-100">
        {profileRoutes.map((route) => (
          <NavLink
            key={route.id}
            to={route.id}
            className="color-white text-sm font-medium"
            style={({ isActive }) => (isActive ? { color: "#d1004d" } : {})}
          >
            {route.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ProfileSideBar;
