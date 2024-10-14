import { AxiosError } from "axios";
import { useState } from "react";
import { ax } from "../../config/default";
import useDispatch from "../../hooks/useDispatch";
import useStore from "../../hooks/useStore";
import useUser from "../../hooks/useUser";
import Alert from "../alert/Alert";
import AlertText from "../alert/AlertText";
import CreateNewCollection from "./item/CreateNewCollection";

import { BiRadioCircleMarked } from "react-icons/bi";

type Props = {
  id: string;
  title: string;
  posterURL: string;
  duration: number;
  mediaType: "tv" | "movie";
  releaseDate: Date;
  playlist_id: string;
  styles?: string;
};

const ContextPlaylist = ({
  id,
  playlist_id,
  title,
  posterURL,
  duration,
  releaseDate,
  mediaType,
  styles,
}: Props) => {
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  let { collections } = useStore();
  let dispatch = useDispatch();
  let user = useUser();

  const handleAddItemToPlaylist = async (pid: string) => {
    try {
      let { data } = await ax.post(`/${user?.id}/playlist/add-item`, {
        data: {
          id,
          playlistId: pid,
          title,
          posterURL,
          duration,
          releaseDate,
          mediaType,
        },
      });
      setSuccess(`${title} added to your collection`);
      dispatch({
        type: "UPDATE_COLLECTION_ITEM_TOTALITEM",
        payload: { pid, total_item: data.totalItems },
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message);
        return;
      }
      setError("Can't add item to collection");
    }
  };

  const clearInfoState = () => {
    setSuccess("");
    setError("");
  };

  if (!user) return null;

  return (
    <div className={`flex my-20 animation-1`}>
      <div
        className={`flex flex-col w-full cursor-default py-10 px-6 color-gray rounded-lg shadow-lg ${
          styles && styles
        }`}
        style={{ background: "#1d1d1d", width: "max-content" }}
      >
        <CreateNewCollection
          title={title}
          classNames="flex hover-bg-fade py-10 px-10 font-semibold text-regular"
          handleClick={handleAddItemToPlaylist}
        />
        {collections &&
          collections.map((item) => (
            <span
              key={item.playlist_id}
              onClick={() => handleAddItemToPlaylist(item.playlist_id)}
              className="flex items-center hover-bg-fade py-10 px-10 text-sm font-semibold rounded-regular cursor-pointer"
              style={{ textAlign: "left", gap: 6 }}
            >
              <i className="flex">
                <BiRadioCircleMarked
                  size={24}
                  className={`color-success ${playlist_id == item.playlist_id ? "visiblity-visible" : "visibility-hidden"}`}
                />
              </i>
              {item.playlist_name}
            </span>
          ))}
      </div>
      {(error || success) && (
        <Alert handleAlert={clearInfoState}>
          <AlertText type={error ? "warn" : "info"} text={error || success} />
        </Alert>
      )}
    </div>
  );
};

export default ContextPlaylist;
