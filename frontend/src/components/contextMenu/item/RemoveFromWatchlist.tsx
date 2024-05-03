import { FC, useContext, useState } from "react";
import { ItemPropsTypes } from "./itemTypes";
import ShowAlert from "../../alert/ShowAlert";
import { ax } from "../../../config/default";
import { CollectionContext } from "../../collection/CollectionItemLists";
const RemoveFromWatchlist: FC<PropsType> = ({
  handleClick,
  handleMouseOver,
  uid,
  watchlistItemId,
  id,
}) => {
  const ctx = useContext(CollectionContext);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const handleRemoveWatchListItem = async () => {
    try {
      const req = await ax.delete(
        `/${uid}/watch-list/remove/${watchlistItemId}`
      );
      if (req.status === 201) {
        ctx.updateCollection(id);
        setSuccess("Removed from your Watchlist");
        return;
      }
      setSuccess("Oppsi its not working");
    } catch (error: any) {
      setError(error);
      console.log(error);
    }
  };
  const clearAlert = () => {
    setSuccess("");
    setError("");
  };
  return (
    <div
      className="hover-bg-fade py-10 px-16 rounded-regular"
      onMouseOver={() => handleMouseOver && handleMouseOver()}
      onClick={() => {
        handleRemoveWatchListItem();
        handleClick && handleClick();
      }}
    >
      Remove from Watchlist
      <ShowAlert success={success} error={error} clearAlert={clearAlert} />
    </div>
  );
};

interface PropsType extends ItemPropsTypes {
  watchlistItemId: string;
}

export default RemoveFromWatchlist;
