import movieClient from '@/lib/tmdb';
import SlideShowMain from '@/components/slide-show/slide-show-main';

export default async function HomePage() {
  const movieList = (await movieClient.movieNowPlaying()).results
    ?.splice(0, 5)
    .map((movie) => ({
      id: movie.id,
      title: movie.title,
      banner: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
      mediaType: movie.media_type,
      category: movie.genre_ids,
      vote: movie.vote_average,
    }));

  return (
    <main>
      <SlideShowMain list={movieList} />
    </main>
  );
}
