import { PersonTypes } from './Person.type';

export interface TvFullPageSlideProps {
  id: string | number;
  title: string;
  desc: string;
  vote_average: number;
  release_date: string;
  poster: string;
  backdrop: string;
  country: string | string[];
  genre: string | string[number];
  url?: string;
}

export interface SeasonListTypes {
  id: string;
  name: string;
  episode_count: number;
}

export interface Episodes {
  id: string | number;
  name: string;
  overview: string;
  season_number: number;
  vote_average: number;
  still_path: string;
  episode_number: number;
  air_date: Date;
  crew?: {}[];
  guest_stars?: PersonTypes[];
  runtime: number;
}
