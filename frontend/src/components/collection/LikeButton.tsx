import { FC, useEffect, useState } from 'react';
import { RiHeart2Fill, RiHeart2Line } from 'react-icons/ri';
import WithLiked from '../like/WithLiked';

const LikeButton: FC = (props: any) => {
  const [x, setX] = useState<boolean>();
  useEffect(() => {
    setX(props.isLiked ? true : false);
  }, [props.isLiked]);
  return x ? (
    <RiHeart2Fill
      className='text-medium sm:text-lg color-purple'
      onClick={() => {
        props.handleLike.remove() && setX(false);
        props.handleLikeAfter && props.handleLikeAfter();
      }}
    />
  ) : (
    <RiHeart2Line
      className='text-medium sm:text-lg'
      onClick={() => props.handleLike.add() && setX(true)}
    />
  );
};

export default WithLiked(LikeButton);
