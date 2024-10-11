import { Route, Routes } from "react-router-dom";
import Index from "../../components/profile/Index";
import useFetch from "../../hooks/useFetch";
import UpdateEmail from "../../components/profile/UpdateEmail";
import UpdatePassword from "../../components/profile/UpdatePassword";
import DeleteAccount from "../../components/profile/DeleteAccount";
import useUser from "../../hooks/useUser";

const Profile = () => {
  const user = useUser();
  const likedCount = useFetch(`${user?.id}/count/liked`);
  const watchlistCount = useFetch(`${user?.id}/count/watchlist`);
  return (
    <div className="flex h-screen w-full xl:w-75 gap-20 overflow-hidden py-20">
      <div className="w-full overflow-y-scroll px-20 sm:bg-secondary rounded-lg scrollbar-on-hover">
        <Routes>
          <Route
            caseSensitive
            path="/"
            element={
              <Index
                total_liked={likedCount.data}
                total_watchlist={watchlistCount.data}
              />
            }
          />
          <Route path="/update-email/*" element={<UpdateEmail />} />
          <Route path="/security/*" element={<UpdatePassword />} />
          <Route path="/ac-delete/*" element={<DeleteAccount />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
