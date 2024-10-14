import { useState, CSSProperties, ReactNode } from "react";
import { ax } from "../../../config/default";
import useDispatch from "../../../hooks/useDispatch";
import useStore from "../../../hooks/useStore";
import ShowAlert from "../../alert/ShowAlert";

type Props = {
  label?: ReactNode | string | number;
  title?: string;
  classNames?: string;
  handleClick?: (id?: any) => void;
  styles?: CSSProperties;
};

const CreateNewCollection = ({
  title,
  label,
  styles,
  classNames,
  handleClick,
}: Props) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { user, collections } = useStore();
  const dispatch = useDispatch();

  const handleCreateNewPlaylist = async () => {
    const playlistName = title
      ? title
      : `#New collection ${collections?.length}`;
    try {
      const { status, data } = await ax.post(`/create-playlist/${user?.id}`, {
        data: {
          playlistName: playlistName,
          description: "",
        },
      });
      if (status === 201) {
        const newCollection = collections || [];
        newCollection.push(data.playlist);
        handleClick && handleClick(data.playlist.playlist_id);
        dispatch({ type: "SET_COLLECTION", payload: newCollection });
        setSuccess(`New ${playlistName} collection is added`);
      }
    } catch (error) {
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
        className={`cursor-pointer ${classNames}`}
        style={styles}
        onClick={handleCreateNewPlaylist}
      >
        {label || "Add to new collection"}
      </span>
      <ShowAlert
        clearAlert={handleClearMessage}
        error={error}
        success={success}
      />
    </>
  );
};

export default CreateNewCollection;
