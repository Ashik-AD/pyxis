import Link from 'next/link';
import Image from 'next/image';
import RatingStar from '../rating/rating-star';
import IIcon from '../icon';

import style from './regular-card.module.scss';
import { tmdb_src } from '@/lib/resolve-image';

export type RegularCardProps = {
  id: string;
  poster: string;
  title: string;
  media_type: 'movie' | 'tv-show';
  rating: number;
};
export default function RegularCard({
  id,
  title,
  media_type,
  rating,
  poster,
}: RegularCardProps) {
  return (
    <Link href={`/details/${media_type}/${id}`} key={id}>
      <article key={id} className={style.card} title={title}>
        <div className={style.card__content}>
          <div className={style.card__details}>
            <span className={style.card__title}>{title}</span>
          </div>
          <div className={style.card__action}>
            <div className={style.card__meta}>
              <span className={style.card__type}>{media_type}</span>
              <RatingStar rating={rating!!} />
            </div>
            <button className={style.btn__action_add}>
              <IIcon icon='majesticons:plus' />
            </button>
          </div>
        </div>
        <Image
          src={`${tmdb_src}${poster}`}
          alt={title!!}
          layout='fill'
          objectFit='cover'
          className={style.card__poster}
        />
      </article>
    </Link>
  );
}
