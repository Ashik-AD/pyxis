import { Icon } from '@iconify/react/dist/iconify.js';
import style from './style.module.scss';
import type { CarouselProps } from './carousel';

interface CarouselProgress
  extends Required<Pick<CarouselProps, 'progress' | 'progressVariant'>> {
  totalItem: number;
  activeIndex: number;
}
export function CProgress({
  progress = true,
  progressVariant,
  totalItem,
  activeIndex,
}: CarouselProgress) {
  if (!progress) return;

  return (
    <article
      className={`${style.carousel__progress} ${progressVariant ?? 'dot'}`}>
      {progressVariant != 'slider' ? (
        Array(totalItem)
          .fill(0)
          .map((_, idx) => (
            <span
              key={idx}
              className={`${
                progressVariant == 'line'
                  ? style.progress__line
                  : style.progress__dot
              } ${activeIndex == idx ? style.progress_active : ''}`}
            />
          ))
      ) : (
        <div className={style.progress__slider}>
          <span
            className={style.slider}
            style={{
              width: `${((activeIndex + 1) * 100) / totalItem}%`,
            }}
          />
        </div>
      )}
    </article>
  );
}

export function CControl({
  showControl,
  handleNextClick,
  handlePreviousClick,
}: {
  showControl: boolean;
  handleNextClick: () => void;
  handlePreviousClick: () => void;
}) {
  if (!showControl) return;
  return (
    <article className={style.carousel__control}>
      <button onClick={handlePreviousClick}>
        <Icon icon='pepicons-pop:angle-left' />
      </button>
      <button onClick={handleNextClick}>
        <Icon icon='pepicons-pop:angle-right' />
      </button>
    </article>
  );
}
