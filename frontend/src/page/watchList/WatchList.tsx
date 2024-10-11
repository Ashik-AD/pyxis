import { ReactNode, useEffect, useState } from "react";
import ShowAlert from "../../components/alert/ShowAlert";
import CardRegular from "../../components/cards/CardRegular";
import { ax } from "../../config/default";
import { AxiosError } from "axios";
import useUser from "../../hooks/useUser";
import SkeletonCard from "../../components/skeleton/SkeletonCard";
import ItemLike from "../../components/like/ItemLike";
import useStore from "../../hooks/useStore";
import useDispatch from "../../hooks/useDispatch";
import { IoIosClose } from "react-icons/io";

import styles from "./styles.module.css";

function WatchList() {
  const { watchList } = useStore();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useUser();

  useEffect(() => {
    let fetchWatchList = null;
    if (!watchList || watchList?.length <= 0) {
      fetchWatchList = async () => {
        setLoading(true);
        const { data } = await ax.get(`${user?.id}/watch-list/all`);
        dispatch({ type: "SET_WATCHLIST", payload: data });
        setLoading(false);
      };
      fetchWatchList();
    }
    return () => {
      fetchWatchList = null;
    };
  }, [user?.id]);

  if (loading) {
    return (
      <div className="grid gap-20 col-2 sm:col-3 md:col-4 lg:col-6">
        <SkeletonCard count={12} bannerClassName="h-200 sm:h-300" />;
      </div>
    );
  }
  return (
    <div>
      {watchList && (
        <div className="grid col-2 sm:col-3 md:col-4 lg:col-7">
          {watchList.map((item) => (
            <WithRemove
              itemId={item.item_key.toString()}
              key={item.item_key}
              uid={user?.id!!}
            >
              <CardRegular
                title={item.title}
                id={item._id}
                poster={item.poster_url}
                url={`/${item.media_type}/info/${item.item_key}`}
                vote_average={item.average_vote}
                release_date={item.released_date}
              />
              <div className="absolute bottom-20 right-10">
                <ItemLike
                  isLiked={item.is_liked}
                  posterPath={item.poster_url}
                  title={item.title}
                  id={item.item_key.toString()}
                  release_date={item.released_date}
                  media_type={item.media_type}
                  duration={item.duration}
                />
              </div>
            </WithRemove>
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchList;

function WithRemove({
  itemId,
  children,
  uid,
}: {
  itemId: string;
  children?: ReactNode;
  uid: string;
}) {
  const storeDispatch = useDispatch();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleRemoveWatchListItem = async () => {
    try {
      await ax.delete(`/${uid}/watch-list/remove/${itemId}`);
      setSuccess("One item removed from the watchlist");
      storeDispatch({ type: "REMOVE_WATCHLIST_ITEM", payload: itemId });
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err?.response?.data?.message);
        return;
      }
      setError("Can't remove item from watchlist");
      console.log(error);
    }
  };

  const clearAlert = () => {
    setSuccess("");
    setError("");
  };

  return (
    <div className={`${styles.remove_container} relative overflow-hidden`}>
      {children}
      <button
        aria-labelledby="remove from watchlist"
        className={`${styles.btn_close} bg-white flex rounded-full absolute top-20 right-20`}
        style={{ padding: 0, border: 0 }}
        onClick={handleRemoveWatchListItem}
      >
        <IoIosClose size={24} />
      </button>
      <ShowAlert success={success} error={error} clearAlert={clearAlert} />
    </div>
  );
}
