import ProfileImage from "../../image/default_avatar.jpg";
import UserDrpDown from "./components/UserDrpDown";
import SearchLabel from "./components/SearchLabel";
const MobileNav = () => {
  return (
    <nav
      aria-label="mobile-nav-bar"
      className="fixed top-0 left-0 w-screen align-center z-3  color-white px-10 bg-dark-fade glass-2"
    >
      <div className="grid col-4 py-10 align-center">
        <span className="font-bold" style={{ letterSpacing: 5 }}>
          PYXIS
        </span>
        <div className="flex span-3 gap-10">
          <SearchLabel />
          <div className="relative">
            <img
              src={ProfileImage}
              alt=""
              style={{ height: 35, width: 35 }}
              className="border-2 rounded-full profile-btn border-purple"
            />
            <UserDrpDown />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;
