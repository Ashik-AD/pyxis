// @TODO - rework on isLiked state
import { FC, useEffect, useState } from "react";
import { PiHeart, PiHeartFill } from "react-icons/pi";
import WithLiked from "../like/WithLiked";

const LikeButton: FC = (props: any) => {
  const [like, setLike] = useState<boolean>(props.isLiked);

  useEffect(() => {
    setLike(props.isLiked ? true : false);
  }, [props.isLiked]);

  return like ? (
    <PiHeartFill
      className="text-medium sm:text-lg color-purple"
      size={24}
      onClick={() => {
        props.handleLike.remove() && setLike(false);
        props.handleLikeAfter && props.handleLikeAfter();
      }}
    />
  ) : (
    <PiHeart
      className="text-medium sm:text-lg"
      onClick={() => props.handleLike.add() && setLike(true)}
    />
  );
};

export default WithLiked(LikeButton);
