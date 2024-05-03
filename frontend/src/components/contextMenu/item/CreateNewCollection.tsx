import { useState, useContext, FC, CSSProperties } from "react";
import { ax } from "../../../config/default";
import { StoreContext } from "../../../store/Store";
import ShowAlert from "../../alert/ShowAlert";
const CreateNewCollection: FC<PropsType> = ({
  title,
  label,
  styles,
  classNames,
  handleClick,
}) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const {
    store: { user, collections },
    dispatch,
  } = useContext(StoreContext);
  const handleCreateNewPlaylist = async () => {
    const playlistName = title
      ? title
      : `#New collection ${collections.length}`;
    try {
      const { status, data } = await ax.post(`/create-playlist/${user.id}`, {
        data: {
          playlistName: playlistName,
          description: "",
        },
      });
      if (status === 201) {
        const newCollection = collections;
        newCollection.push(data.playlist);
        handleClick && handleClick(data.playlist.playlist_id);
        dispatch({ type: "SET_COLLECTION", payload: newCollection });
        setSuccess(`New ${playlistName} collection is added`);
      }
    } catch (error) {
      console.log(error);
      setError("Ops! something went wrong!");
    }
  };
  const handleClearMessage = () => {
    setSuccess("");
    setError("");
  };
  return (
    <>
      <span
        className={`${classNames}`}
        style={{ ...styles }}
        onClick={handleCreateNewPlaylist}
      >
        {label ? label : "Add to new collection"}
      </span>
      <ShowAlert
        clearAlert={handleClearMessage}
        error={error}
        success={success}
      />
    </>
  );
};

interface PropsType {
  label?: string;
  title?: string;
  classNames?: string;
  handleClick?: (id?: any) => void;
  styles?: CSSProperties;
}

export default CreateNewCollection;
