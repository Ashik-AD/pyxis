import Image from 'next/image';
import style from './style.module.scss';

export default function CImage({
  src,
  alt,
  height,
  width,
}: {
  src: string;
  alt?: string;
  height?: string | number;
  width?: string | number;
}) {
  return (
    <Image
      className={style.carousel__banner}
      src={src}
      alt={alt || 'carousel image'}
      fill={true}
      objectFit='cover'
      objectPosition='center'
    />
  );
}
