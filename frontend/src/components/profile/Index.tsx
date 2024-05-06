import { FC, useContext } from "react";
import { StoreContext } from "../../store/Store";
import defaultAvatar from "../../image/default_avatar.jpg";
import "../skeleton/Skeleton.css";
import { Link } from "react-router-dom";

const Index: FC<PropsType> = ({ total_liked, total_watchlist }) => {
  const {
    store: { user, collections },
  } = useContext(StoreContext);
  return (
    <div className="w-full flex flex-col w-full gap-50 px-20 py-20">
      <div
        className="flex content-center w-full flex-col gap-20"
        style={{ paddingTop: 50 }}
      >
        <img
          src={defaultAvatar}
          alt="user_profile"
          className="border-5 rounded-full border-fade h-150 w-150"
        />
        <div className="sm:grid col-2 color-white text-right col-gap-50  space-y-10 sm:text-regular">
          <div className="hidden sm:visible color-gray text-right">
            Full Name
          </div>{" "}
          <div className="font-medium text-center sm:text-left text-lg sm:text-regular capitalize">
            {user?.full_name}
          </div>
          <div className="hidden sm:visible color-gray">Email</div>{" "}
          <div className="font-medium text-center sm:text-left">
            {user?.email}
          </div>
          {user?.country && (
            <>
              <div className="hidden sm:visible color-gray">Country</div>{" "}
              <div className="font-medium text-center sm:text-left">
                {user.country}
              </div>
            </>
          )}
        </div>
      </div>
      {((collections && collections.length > 0) || total_watchlist > 0) && (
        <div className="flex flex-col" style={{ marginTop: 50 }}>
          <span className="text-regular color-light-gray font-semibold my-20">
            Your Movie/TV lists
          </span>
          <div className="grid col-2 sm:col-3 wrap  gap-20 content-center">
            <CountCard
              count={collections && collections.length}
              label="Collection"
              url="/collection"
            />
            <CountCard count={total_liked} label="Liked" url="/like" />
            <CountCard
              count={total_watchlist}
              label="Watchlist"
              url="/watch-list"
            />
          </div>
        </div>
      )}
    </div>
  );
};
const CountCard: FC<{ count: number | null; label: string; url: string }> = ({
  count,
  label,
  url,
}) => {
  if (count === null)
    return (
      <div className="flex flex-col gap-20 content-center py-20 bg-secondary color-white w-full rounded-lg ">
        <span
          className="w-33 bg-dark rounded-lg SkeletonAnimate"
          style={{ height: 20 }}
        ></span>
        <span
          className="w-60 bg-dark rounded-lg SkeletonAnimate"
          style={{ height: 10 }}
        ></span>
      </div>
    );
  if (count === 0) return null;
  return (
    <Link
      to={url}
      className="flex flex-col gap-6 content-center py-20 color-white w-full rounded-lg"
      style={{ background: `#7606AA` }}
    >
      <span className="text-heading font-semibold">{count}</span>
      <span className="text-regular font-medium">{label}</span>
    </Link>
  );
};

interface PropsType {
  total_liked: number;
  total_watchlist: number;
}

export default Index;
