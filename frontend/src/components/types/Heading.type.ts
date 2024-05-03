export interface HeadingPropTypes {
  readonly title: string;
  readonly tagline: string;
  readonly spoken_languages: [];
  readonly production_countries: {name: string}[];
  readonly release_date: Date | null;
  readonly status: string;
  readonly vote_average: number;
  readonly id: string;
  readonly poster_path: string;
  readonly backdrop_path: string;
  readonly color: string;
  readonly genres: {id: number, name: string}[];
  readonly type: 'movie' | 'tv';
  readonly vote_count: number;
  readonly overview: string;
  readonly runtime: number;
}

export interface TvHeadingPropTypes extends HeadingPropTypes {
  readonly season_count: number;
  readonly episode_count: number;
  readonly first_air_date?: Date | null;
  readonly last_air_date?: Date | null;
  readonly certificates: {rating: string};
  readonly next_episode_to_air?: {
    air_date: Date;
    episode_number: number;
    name: string;
  };
}
