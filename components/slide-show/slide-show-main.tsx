import { Carousel, CarouselImage, CarouselItem } from '../carousel';
import style from './style.module.scss';

export type SlideShowProps = {
  id: string;
  title: string;
  banner: string;
  duration: number;
  vote: number;
};
export default function SlideShowMain({ list }: { list: SlideShowProps[] }) {
  return (
    <Carousel
      interval={5000}
      progressVariant='line'
      infinite
      css={{ borderRadius: 24 }}>
      {list.map((item) => (
        <CarouselItem key={item.id} className={style.item_height}>
          <CarouselImage src={item.banner} alt={item.title} />
          <article className={style.content}>
            <h3 className={style.content__title}>{item.title}</h3>
            <div className={style.btn_wrapper}>
              <button className={style.btn__watchlist}>Watchlist</button>
              <button className={style.btn__watch}>Watch Now</button>
            </div>
          </article>
        </CarouselItem>
      ))}
    </Carousel>
  );
}
