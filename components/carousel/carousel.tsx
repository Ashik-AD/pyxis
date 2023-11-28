'use client';
import {
  CSSProperties,
  Children,
  ReactNode,
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import style from './style.module.scss';
import { CControl, CProgress } from './control';

export interface CarouselProps {
  children: ReactNode;
  fade?: boolean;
  controls?: boolean;
  progress?: boolean;
  progressVariant?: 'line' | 'dot' | 'slider';
  activeIndex?: number;
  interval?: number;
  infinite?: boolean;
  className?: string;
  css?: CSSProperties;
  onSelect?: (activeIndex: number) => void;
  onSlide?: (activeIndex: number) => void;
}

export default function Carousel(props: CarouselProps) {
  const {
    children,
    fade,
    controls = true,
    progress = true,
    progressVariant = 'dot',
    infinite,
    interval,
    className,
    css,
  } = props;

  const [activeIndex, setActiveIndex] = useState(props.activeIndex ?? 0);

  const itemCount = useMemo(() => Children.count(children), [children]);

  const handleSideNext = useCallback(() => {
    if (infinite) {
      if (activeIndex == itemCount - 1) {
        setActiveIndex(0);
        return;
      }
      setActiveIndex((prevIndex) => prevIndex + 1);
      return;
    }

    if (activeIndex != itemCount - 1) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const handleSidePrev = () => {
    if (infinite) {
      if (activeIndex == 0) {
        setActiveIndex(itemCount - 1);
        return;
      }
      setActiveIndex((prevIndex) => --prevIndex);
      return;
    }

    if (activeIndex > 0) {
      setActiveIndex((prevIndex) => --prevIndex);
    }
  };

  useEffect(() => {
    let signature: any;
    if (interval) {
      signature = setInterval(handleSideNext, interval);
    }

    return () => {
      clearInterval(signature);
    };
  }, [interval, handleSideNext]);

  return (
    <section className={`${style.carousel}`}>
      <div
        className={`${style.carousel__list__wrapper} ${className ?? className}`}
        style={css}>
        <div
          className={`${style.carousel__list} ${
            fade ? style.carousel__list_fade : ''
          }`}
          style={
            !fade ? { transform: `translateX(-${activeIndex * 100}%)` } : {}
          }>
          {!fade
            ? children
            : Children.map(children, (item: any, idx) => {
                if (activeIndex == idx) {
                  let el = cloneElement(item, {
                    className: `${style.carousel__item_active}`,
                  });
                  return el;
                }
                return item;
              })}
        </div>
      </div>
      <CControl
        handleNextClick={handleSideNext}
        handlePreviousClick={handleSidePrev}
        showControl={controls}
      />
      <CProgress
        activeIndex={activeIndex}
        totalItem={itemCount}
        progress={progress}
        progressVariant={progressVariant}
      />
    </section>
  );
}
