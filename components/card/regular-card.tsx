import Link from 'next/link';
import Image from 'next/image';
import RatingStar from '../rating/rating-star';

import style from './regular-card.module.scss';
import { tmdb_src } from '@/lib/resolve-image';
import RegularCardDropdown from './regular-card-dropdown';

export type RegularCardProps = {
  id: string;
  poster: string;
  title: string;
  mediaType: 'movie' | 'tv-show';
  rating: number;
};

export default function RegularCard({
  id,
  title,
  mediaType,
  rating,
  poster,
}: RegularCardProps) {
  return (
    <Link href={`/${mediaType}/${id}`} key={id}>
      <article key={id} className={style.card} title={title}>
        <div className={style.card__content}>
          <div className={style.card__details}>
            <span className={style.card__title}>{title}</span>
          </div>
          <div className={style.card__action}>
            <div className={style.card__meta}>
              <span className={style.card__type}>{mediaType}</span>
              <RatingStar rating={rating!!} />
            </div>
            <RegularCardDropdown id={id} />
          </div>
        </div>
        <Image
          src={`${tmdb_src}${poster}`}
          alt={title!!}
          layout='fill'
          fill={true}
          // sizes=''
          objectFit='cover'
          className={style.card__poster}
        />
      </article>
    </Link>
  );
}
