export default interface FullPagePropsType {
  id: number | string;
  title: string;
  release_date: Date | string;
  vote_average: number;
  poster: string;
  backdrop: string;
  desc: string;
  media_type: 'movie' | 'tv';
  detail_url: string;
  trailer_url:string;
}

// export interface FPagePropTypes extends FPageTypes {}
