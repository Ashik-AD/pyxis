import { FC, useContext, useState } from "react";
import { RiAddFill } from "react-icons/ri";
import { ax } from "../../config/default";
import { StoreContext } from "../../store/Store";
import ShowAlert from "../alert/ShowAlert";
import { WatchListPropsType } from "./watchlist.type";

const WatchListAdd: FC<WatchListPropsType> = (props) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const {
    store: { user },
  } = useContext(StoreContext);
  const handleWatchListAdd = async () => {
    try {
      const request = await ax.post(`/${user.id}/watch-list/add`, {
        data: {
          average_vote: props.average_vote,
          duration: props.duration,
          item_key: props.item_key,
          released_date: props.release_date,
          title: props.title,
          poster_path: props.poster_path,
          mediaType: props.media_type,
        },
      });
      setSuccess(request.data);
    } catch (error: any) {
      setError("Something went wrong");
    }
  };
  const clearMsg = () => {
    setSuccess("");
    setError("");
  };
  return (
    <>
      <button
        onClick={handleWatchListAdd}
        style={props.styles}
        className={`flex items-center gap-10 uppercase py-10 border-1 border-gray rounded-xxlg text-xsm font-bold color-white hover-bg-fade ${
          props.classNames ? props.classNames : ""
        }`}
      >
        <RiAddFill className="text-lg" />{" "}
        {!props!.hideLabel ? "Watchlist" : " "}
      </button>
      <ShowAlert clearAlert={clearMsg} success={success} error={error} />
    </>
  );
};

export default WatchListAdd;
