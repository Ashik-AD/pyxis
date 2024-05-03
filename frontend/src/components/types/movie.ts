export interface CardPropTypes {
  id: string | number;
  title: string;
  poster?: string;
  backdrop?: string;
  vote_average?: number;
  url: string;
  containerStyle?: string;
  imageStyle?: string;
  release_date: Date;
}
