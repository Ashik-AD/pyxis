import { FC, useEffect, useState } from "react";
import { ax } from "../../config/default";
import Button from "../details/Button";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import WithLiked, { WithLikedProps } from "./WithLiked";

import styles from "./styles.module.css";
import useRenderAuthForm from "../../hooks/useRenderAuthForm";
import useUser from "../../hooks/useUser";

const ItemLike: FC<PropsType> = (props) => {
  const user = useUser();
  const { AuthFormHook, showForm } = useRenderAuthForm();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  useEffect(() => {
    if (user) {
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
    }
  }, [user, props?.id]);

  const handleAddRemoveLike = async () => {
    if (!user) {
      showForm();
      return;
    }
    if (isLiked) {
      props.handleLike.remove();
      setIsLiked(false);
    } else {
      props.handleLike.add();
      setIsLiked(true);
    }
  };
  return (
    <>
      <Button
        handleClick={handleAddRemoveLike}
        color={!isLiked ? props.color : ""}
        styles={`${styles.btn_like} rounded-full flex ${isLiked ? "color-pink" : ""}`}
      >
        {isLiked ? <RiHeartFill size={24} /> : <RiHeartLine size={24} />}
      </Button>
      <AuthFormHook />
    </>
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
