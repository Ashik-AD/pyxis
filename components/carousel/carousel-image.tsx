import Image from 'next/image';
import style from './style.module.scss';

export default function CImage({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt='carousel image'
      className={style.carousel__banner}
      fill={true}
      style={{
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
      }}
    />
  );
}
