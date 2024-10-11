import { NavLink, Route, Routes } from "react-router-dom";
import UpdatePassword from "../../components/profile/UpdatePassword";
import DeleteAccount from "../../components/profile/DeleteAccount";
import Container from "../../components/layout/container";
import Like from "../liked/Like";
import Profile from "../profile/Profile";
import WatchList from "../watchList/WatchList";

const Users = () => {
  return (
    <>
      <TopNav />
      <Container>
        <div className="w-full py-20 sm:bg-secondary">
          <Routes>
            <Route caseSensitive path="/profile/*" element={<Profile />} />
            <Route path="/liked" element={<Like />} />
            <Route path="/collections" element={<UpdatePassword />} />
            <Route path="/watch-list" element={<WatchList />} />
            <Route path="/settings" element={<DeleteAccount />} />
          </Routes>
        </div>
      </Container>
    </>
  );
};

export default Users;

const routes = [
  { id: "profile", title: "Profile" },
  { id: "collections", title: "Collections" },
  { id: "watch-list", title: "Watchlist" },
  { id: "liked", title: "liked" },
  { id: "settings", title: "Settings" },
];

const TopNav = () => {
  return (
    <div
      className="w-full flex bg-secondary flex-col rounded-lg color-white pt-100"
      style={{ borderLeft: "2px" }}
    >
      <div className="flex w-full gap-30 content-center">
        {routes.map((route) => (
          <NavLink
            key={route.id}
            to={route.id}
            className="color-white font-medium py-10"
            style={({ isActive }) =>
              isActive ? { color: "#d1004d", borderBottom: `2px solid` } : {}
            }
          >
            {route.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
