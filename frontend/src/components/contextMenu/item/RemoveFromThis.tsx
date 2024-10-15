import { useContext, useState } from "react";
import { ax } from "../../../config/default";
import ShowAlert from "../../alert/ShowAlert";
import { ItemPropsTypes } from "./itemTypes";
import { CollectionContext } from "../../collection/CollectionItemLists";
import useDispatch from "../../../hooks/useDispatch";

interface Props extends ItemPropsTypes {
  playlistId: string;
  itemId: string;
  uid: string;
}

const RemoveFromThis = ({
  uid,
  playlistId,
  itemId,
  handleClick,
  handleMouseOver,
  id,
}: Props) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const ctx = useContext(CollectionContext);
  const dispatch = useDispatch();
  const handleRemoveItemFromCollection = async () => {
    try {
      const { status, data } = await ax.delete(`/${uid}/playlist-item/delete`, {
        data: {
          playlistId,
          itemsId: itemId,
        },
      });
      if (status == 200) {
        setSuccess("Removed from you this collection");
        dispatch({
          type: "UPDATE_COLLECTION_ITEM_TOTALITEM",
          payload: {
            pid: playlistId,
            total_item: data.total_item,
          },
        });
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

export default RemoveFromThis;
