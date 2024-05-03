import { FC, useContext, useState } from "react";
import { ax } from "../../../config/default";
import { ItemPropsTypes } from "./itemTypes";
import ShowAlert from "../../alert/ShowAlert";
import { CollectionContext } from "../../collection/CollectionItemLists";
const RemovedFromLiked: FC<PropsType> = ({
  uid,
  liked_id,
  handleClick,
  id,
  handleMouseOver,
}) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const ctx = useContext(CollectionContext);
  const handleRemoveLiked = async () => {
    try {
      const { data } = await ax.post(`${uid}/liked/delete`, {
        data: { likedId: liked_id },
      });
      setSuccess(data);
      ctx.updateCollection(id);
    } catch (error) {
      setError("Cant removed from your liked");
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
        handleRemoveLiked();
        handleClick && handleClick();
      }}
    >
      Remove from your liked
      <ShowAlert success={success} error={error} clearAlert={clearAlert} />
    </div>
  );
};

interface PropsType extends ItemPropsTypes {
  liked_id: string;
}

export default RemovedFromLiked;
