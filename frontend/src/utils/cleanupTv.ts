import { TvFullPageSlideProps } from '../components/types/tv.type';
export const cleanupTv = (array: {}[]) => {
  return array.map(
    (el: any): TvFullPageSlideProps => ({
      id: el.id,
      title: el.name,
      desc: el.overview,
      poster: el.poster_path,
      backdrop: el.backdrop_path,
      vote_average: el.vote_average,
      release_date: el.first_air_date,
      country: el.origin_country,
      genre: el.genre_id,
    })
  );
};
