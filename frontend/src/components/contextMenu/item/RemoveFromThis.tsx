import { FC, useContext, useState } from "react";
import { ax } from "../../../config/default";
import ShowAlert from "../../alert/ShowAlert";
import { ItemPropsTypes } from "./itemTypes";
import { CollectionContext } from "../../collection/CollectionItemLists";
const RemoveFromThis: FC<PropsTypes> = ({
  uid,
  playlistId,
  itemId,
  handleClick,
  handleMouseOver,
  id,
}) => {
  const ctx = useContext(CollectionContext);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const handleRemoveItemFromCollection = async () => {
    try {
      const requestRemove = await ax.delete(`/${uid}/playlist-item/delete`, {
        data: {
          playlistId,
          itemsId: itemId,
        },
      });
      if (requestRemove.status === 201) {
        setSuccess("Removed from you this collection");
        ctx.updateCollection(id);
        return;
      }
      setSuccess("Looks like something happened :)");
    } catch (error: any) {
      console.log(error);
      setError(error);
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
        handleRemoveItemFromCollection();
        handleClick && handleClick();
      }}
    >
      Remove from this collection
      <ShowAlert success={success} error={error} clearAlert={clearAlert} />
    </div>
  );
};

interface PropsTypes extends ItemPropsTypes {
  playlistId: string;
  itemId: string;
  uid: string;
}

export default RemoveFromThis;
