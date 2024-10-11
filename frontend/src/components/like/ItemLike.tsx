import { FC, useContext, useEffect, useState } from "react";
import { ax } from "../../config/default";
import Button from "../details/Button";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { StoreContext } from "../../store/Store";
import WithLiked, { WithLikedProps } from "./WithLiked";

import styles from "./styles.module.css";

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
      styles={`${styles.btn_like} rounded-full flex ${isLiked ? "color-purple" : ""}`}
    >
      {isLiked ? <RiHeartFill size={24} /> : <RiHeartLine size={24} />}
    </Button>
  );
};

interface PropsType extends WithLikedProps {
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

//@ts-ignore-next
export default WithLiked(ItemLike);
