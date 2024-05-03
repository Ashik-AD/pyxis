import { FC, useContext, useState } from "react";
import { ax } from "../../config/default";
import { StoreContext } from "../../store/Store";
import Alert from "../alert/Alert";
import CreateNewCollection from "./item/CreateNewCollection";

const ContextPlaylist: FC<PropTypes> = ({
  playlistItemId,
  playlistItemName,
  posterURL,
  duration,
  releaseDate,
  mediaType,
  styles,
}) => {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const {
    store: { collections, user },
  } = useContext(StoreContext);

  if (!user) return null;
  const requestAddItem = async (pid: string) => {
    const request = await ax.post(`/${user.id}/playlist/add-item`, {
      data: {
        playlistId: pid,
        playlistItemId,
        playlistItemName,
        posterURL,
        duration,
        releaseDate,
        mediaType,
      },
    });
    return request;
  };
  const handleAddItemToPlaylist = async (pid: string) => {
    try {
      const addItem = await requestAddItem(pid);
      if (addItem.status === 200) {
        setError(addItem.data.msg);
        return;
      }
      setSuccess(`${playlistItemName} added to your collection`);
    } catch (error) {
      setError("Cant add item to collection");
    }
  };
  /**
   * Create new collection
   * Add item to collection
   *
   * @returns (response as message)
   *
   */

  const clearInfoState = () => {
    setSuccess(null);
    setError(null);
  };

  return (
    <div className={`flex my-20 animation-1 `}>
      <div
        className={`flex flex-col w-full cursor-default py-10 px-6 color-gray rounded-lg shadow-lg ${
          styles && styles
        }`}
        style={{ background: "#1d1d1d", minWidth: 250 }}
      >
        <CreateNewCollection
          title={playlistItemName}
          classNames="flex hover-bg-fade py-10 px-10 font-semibold text-regular"
          handleClick={handleAddItemToPlaylist}
        />
        <div className="w-full bg-fade" style={{ height: 1 }}></div>
        {collections &&
          collections.map((el: any) => (
            <span
              key={el.playlist_id}
              onClick={() => handleAddItemToPlaylist(el.playlist_id)}
              className="hover-bg-fade py-10 px-10 text-xsm font-semibold rounded-regular"
              style={{ textAlign: "left" }}
            >
              {el.playlist_name}
            </span>
          ))}
      </div>
      {(error || success) && (
        <Alert handleAlert={clearInfoState}>
          <div
            className={`error absolute bottom-20 flex ${
              success ? "bg-info" : "bg-primary"
            } color-white py-10 px-20 rounded-lg text-regular animate-fade`}
            style={{ left: "45%" }}
          >
            {success ? success : error}
          </div>
        </Alert>
      )}
    </div>
  );
};

interface PropTypes {
  playlistItemId: string | number;
  playlistItemName: string;
  posterURL: string;
  duration: number;
  mediaType: "tv" | "movie";
  releaseDate: Date | null;
  styles?: string | null;
}

export default ContextPlaylist;
