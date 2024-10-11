import { FC, useState } from "react";
import { ax } from "../../../config/default";
import useDispatch from "../../../hooks/useDispatch";
import ShowAlert from "../../alert/ShowAlert";
import { WatchListPropsType } from "../../watchList/watchlist.type";
import { ItemPropsTypes } from "./itemTypes";

const AddToWatchlist: FC<PropsType> = ({
  uid,
  handleClick,
  handleMouseOver,
  average_vote,
  duration,
  item_key,
  media_type,
  poster_path,
  release_date,
  title,
  is_liked,
}) => {
  const storeDispatch = useDispatch();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const handleAddWatchlist = async () => {
    try {
      let item = {
        item_key,
        title,
        release_date,
        poster_path,
        media_type,
        duration,
        average_vote,
        is_liked,
      };
      const { data } = await ax.post(`${uid}/watch-list/add`, {
        data: item,
      });
      storeDispatch({ type: "ADD_WATCHLIST_ITEM", payload: item });
      setSuccess(data);
    } catch (error: any) {
      console.log(error);
      setError(error.msg);
    }
  };
  const clearMsg = () => {
    setSuccess("");
    setError("");
  };
  return (
    <div
      className="hover-bg-fade py-10 px-16 rounded-regular"
      onMouseOver={() => handleMouseOver && handleMouseOver()}
      onClick={() => {
        handleAddWatchlist();
        handleClick && handleClick();
      }}
    >
      Add this to Watchlist
      <ShowAlert error={error} success={success} clearAlert={clearMsg} />
    </div>
  );
};

interface PropsType extends ItemPropsTypes, WatchListPropsType {
  itemId: string;
}

export default AddToWatchlist;
