'use client';
import { Icon } from '@iconify/react/dist/iconify.js';
import style from './rating.module.scss';

export default function RatingStar({ rating }: { rating: number }) {
  let starNo = Math.floor(rating / 2);
  let starRemain = Number((rating % 2).toFixed(1));
  return (
    <div className={style.vote}>
      {Array(starNo)
        .fill(0)
        .map((_, idx) => (
          <Icon icon='fluent:star-24-filled' key={idx} />
        ))}
      {starRemain != 0 ? (
        starRemain < 0.5 ? (
          <Icon icon='fluent:star-one-quarter-24-filled' />
        ) : starRemain == 0.5 ? (
          <Icon icon='fluent:star-half-24-filled' />
        ) : (
          <Icon icon='fluent:star-three-quarter-24-filled' />
        )
      ) : null}
    </div>
  );
}
