import { FC, useEffect } from "react";
import ProfileSideBar from "../../components/profile/ProfileSideBar";
import { Link, Route, Routes } from "react-router-dom";
import Index from "../../components/profile/Index";
import ProfileNavMobile from "../../components/profile/ProfileNavMobile";
import useFetch from "../../hooks/useFetch";
import UpdateEmail from "../../components/profile/UpdateEmail";
import UpdatePassword from "../../components/profile/UpdatePassword";
import DeleteAccount from "../../components/profile/DeleteAccount";
import { RiArrowLeftLine } from "react-icons/ri";
import useUser from "../../hooks/useUser";

const Profile: FC = () => {
  const user = useUser()

  useEffect(() => {
    document.title = `Pyxis • ${user?.full_name}`;
  }, [user]);

  const likedCount = useFetch(`${user?.id}/count/liked`);
  const watchlistCount = useFetch(`${user?.id}/count/watchlist`);
  return (
    <section
      className="fixed left-0 h-screen w-screen overflow-hidden flex content-center bg-primary absolute sm:p-20"
      style={{ zIndex: 999 }}
    >
      <div className="flex h-screen w-full xl:w-75 gap-20 overflow-hidden py-20">
        <ProfileNavMobile />
        <div className="hidden sm:visible">
          <ProfileSideBar />
        </div>
        <div className="w-full overflow-y-scroll px-20 sm:bg-secondary rounded-lg scrollbar-on-hover">
          <Routes>
            <Route
              caseSensitive
              path="/overview/*"
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
      <div className="fixed  hidden xl:visible" style={{ left: 50, top: 20 }}>
        <Link
          to="../"
          className=" color-white top-10 left-100 bg-fade p-20 rounded-full flex text-lg cursor-pointer hover-fade-half"
        >
          <RiArrowLeftLine />
        </Link>
      </div>
    </section>
  );
};

export default Profile;
