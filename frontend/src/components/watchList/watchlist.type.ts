import { CSSProperties } from 'react';

export interface WatchListPropsType {
  item_key: string | number;
  title: string;
  average_vote: number;
  media_type: 'tv' | 'movie';
  poster_path: string;
  duration: number;
  is_liked?: string | null;
  release_date: Date | string | null;
  classNames?: string;
  hideLabel?: boolean;
  styles?: CSSProperties;
}
