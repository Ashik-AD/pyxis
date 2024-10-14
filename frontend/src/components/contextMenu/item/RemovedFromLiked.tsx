import { FC, useState } from "react";
import { ax } from "../../../config/default";
import { ItemPropsTypes } from "./itemTypes";
import ShowAlert from "../../alert/ShowAlert";
import useDispatch from "../../../hooks/useDispatch";
const RemovedFromLiked: FC<PropsType> = ({
  uid,
  liked_id,
  handleClick,
  handleMouseOver,
}) => {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleRemoveLiked = async () => {
    try {
      const { data } = await ax.post(`${uid}/liked/delete`, {
        data: { likedId: liked_id },
      });
      dispatch({ type: "REMOVE_LIKED", payload: liked_id });
      setSuccess(data);
    } catch (error) {
      setError("Can't removed from liked");
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
      Remove from like
      <ShowAlert success={success} error={error} clearAlert={clearAlert} />
    </div>
  );
};

interface PropsType extends ItemPropsTypes {
  liked_id: string;
}

export default RemovedFromLiked;
