import { FC, useContext, useEffect, useState } from "react";
import { ax } from "../../config/default";
import Button from "../details/Button";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { StoreContext } from "../../store/Store";
import WithLiked from "./WithLiked";
const ItemLike: FC<PropsType> = (props) => {
  const {
    store: { user },
  } = useContext(StoreContext);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const { data } = await ax.post("/liked/search", {
        data: {
          uid: user?.id,
          item_id: props?.id,
        },
      });
      if (data) {
        setIsLiked(data.isLiked);
      }
    })();
  }, [user?.id, props?.id]);

  const handleAddRemoveLike = async () => {
    if (isLiked) {
      props.handleLike.remove();
      setIsLiked(false);
    } else {
      props.handleLike.add();
      setIsLiked(true);
    }
  };
  return (
    <Button
      handleClick={handleAddRemoveLike}
      color={!isLiked ? props.color : ""}
      styles={`rounded-full ${isLiked ? "bg-purple" : ""}`}
    >
      {isLiked ? <RiHeartFill /> : <RiHeartLine />}
    </Button>
  );
};

interface PropsType {
  id: string;
  posterPath: string;
  title: string;
  duration: number;
  color: string;
  handleLike: {
    add: () => void;
    remove: () => void;
  };
}

export default WithLiked(ItemLike);
