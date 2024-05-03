import { FC, useContext, useState } from "react";
import ShowAlert from "../../alert/ShowAlert";
import { ItemPropsTypes } from "./itemTypes";
import { ax } from "../../../config/default";
import { CollectionContext } from "../../collection/CollectionItemLists";
const AddToLiked: FC<PropsType> = (props) => {
  const {
    id,
    item_key,
    posterPath,
    title,
    duration,
    release_date,
    media_type,
    handleClick,
    handleMouseOver,
    uid,
  } = props;
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const ctx = useContext(CollectionContext);
  const handleAddLiked = async () => {
    try {
      const prepareLike = {
        liked_id: item_key,
        poster_url: posterPath,
        title,
        duration,
        release_date,
        media_type,
      };
      const { data, status } = await ax.post(`/${uid}/liked/add`, {
        data: prepareLike,
      });
      if (status === 200) {
        setError(data);
        return false;
      }
      ctx.updateLikeStatus(id);
      setSuccess(data.message);

      return true;
    } catch (error) {
      console.log(error);
      setError(`Can't add this to like`);
    }
  };

  const clearMsg = () => {
    setSuccess("");
    setError("");
  };
  return (
    <div
      className="hover-bg-fade py-10 px-16 rounded-regular"
      onMouseOver={() => handleMouseOver && handleMouseOver()}
      onClick={() => {
        handleAddLiked();
        handleClick && handleClick();
      }}
    >
      Save to this liked
      <ShowAlert error={error} success={success} clearAlert={clearMsg} />
    </div>
  );
};
interface PropsType extends ItemPropsTypes {
  item_key: string;
  posterPath: string;
  title: string;
  duration: number;
  release_date: Date | null;
  media_type: "tv" | "movie" | string;
}
export default AddToLiked;
