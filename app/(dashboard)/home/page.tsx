import { Carousel, CarouselItem, CarouselImage } from '@/components/carousel';

export default function HomePage() {
  return (
    <main>
      <Carousel interval={5000} infinite>
        <CarouselItem>
          <CarouselImage src='https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg' />
          <div>
            <h1>Carousel 1</h1>
          </div>
        </CarouselItem>
        <CarouselItem>
          <CarouselImage src='https://images.pexels.com/photos/402018/pexels-photo-402018.jpeg' />
          <div>
            <h1>Carousel 2</h1>
          </div>
        </CarouselItem>
        <CarouselItem>
          <CarouselImage src='https://images.pexels.com/photos/18925513/pexels-photo-18925513.jpeg' />
          <div>
            <h1>Carousel 3</h1>
          </div>
        </CarouselItem>
      </Carousel>
      <Carousel
        interval={5000}
        progressVariant='line'
        controls={false}
        progress={false}
        fade
        infinite>
        <CarouselItem>
          <CarouselImage src='https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg' />
          <div>
            <h1>Carousel 1</h1>
          </div>
        </CarouselItem>
        <CarouselItem>
          <CarouselImage src='https://images.pexels.com/photos/402018/pexels-photo-402018.jpeg' />
          <div>
            <h1>Carousel 2</h1>
          </div>
        </CarouselItem>
        <CarouselItem>
          <CarouselImage src='https://images.pexels.com/photos/18925513/pexels-photo-18925513.jpeg' />
          <div>
            <h1>Carousel 3</h1>
          </div>
        </CarouselItem>
      </Carousel>
    </main>
  );
}
