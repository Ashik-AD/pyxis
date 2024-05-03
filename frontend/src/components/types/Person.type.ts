export interface PersonCardTypes {
  id: string | number;
  person_name: string;
  cast_id?: string;
  profile_img?: string;
  character?: string;
  department?: string;
  color?: string;
  order?: number | 0;
  gender: number;
}

export interface PersonTypes {
  id: string | number;
  character: string;
  name: string;
  original_name: string;
  known_for_department: string;
  profile_path: string;
  job?: string;
  gender: number;
}

export interface PersonDetailsTypes {
  also_known_as: string[];
  adult: true | false;
  biography: string;
  birthday: Date;
  deathday: string | null;
  gender: 1 | 2;
  homepage: string | null;
  id: number | string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  profile_path: string;
  external_links: {
    facebook_id: string | null;
    twitter_id: string | null;
    instagram_id: string | null;
    imdb_id: string | null;
  };
}

export interface PersonCreditType {
  id: number;
  original_language: string;
  original_title: string;
  original_name: string;
  overview: string;
  vote_average: number;
  character: string;
  popularity: number;
  release_date: Date;
  first_air_date: Date;
  title: string;
  poster_path: string;
  name: string;
  media_type: string;
}
