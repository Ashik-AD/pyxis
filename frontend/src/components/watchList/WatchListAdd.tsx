import { FC, useState } from "react";
import ShowAlert from "../alert/ShowAlert";
import { ax } from "../../config/default";
import type { WatchListPropsType } from "./watchlist.type";

import useUser from "../../hooks/useUser";
import useDispatch from "../../hooks/useDispatch";
import useRenderAuthForm from "../../hooks/useRenderAuthForm";

const WatchListAdd: FC<WatchListPropsType> = (props) => {
  const user = useUser();
  const storeDispatch = useDispatch();
  const { AuthFormHook, showForm } = useRenderAuthForm();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleWatchListAdd = async () => {
    if (!user) {
      showForm();
      return;
    }
    try {
      let data = {
        average_vote: props.average_vote,
        duration: props.duration,
        item_key: props.item_key,
        released_date: props.release_date,
        title: props.title,
        poster_path: props.poster_path,
        media_type: props.media_type,
      };
      const request = await ax.post(`/${user?.id}/watch-list/add`, {
        data,
      });

      storeDispatch({
        type: "ADD_WATCHLIST_ITEM",
        payload: { ...data, poster_url: data.poster_path },
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
        className={`flex items-center gap-10 py-10 border-1 border-gray rounded-xxlg text-xsm font-bold color-white hover-bg-fade ${
          props.classNames ? props.classNames : ""
        }`}
      >
        Add to watchlist
      </button>
      <ShowAlert clearAlert={clearMsg} success={success} error={error} />
      <AuthFormHook />
    </>
  );
};

export default WatchListAdd;
