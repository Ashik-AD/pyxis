export type User = {
  id: string;
  full_name: string;
  email: string;
  date_of_birth?: string;
  country?: string;
  liked_id: string;
  playlists_id: string;
};

export type Collection = {
  uid: string;
  playlist_name: string;
  playlist_id: string;
  description: string;
  total_item: number;
  created_date: string;
};

export type LikedItem = {
  liked_id: string;
  title: string;
  poster_url: string;
  vote_average: number;
  media_type: "movie" | "tv";
  uid: string;
  duration: number;
  liked_date: string;
  released_date: Date | string;
};

export type WatchListItem = {
  item_key: number;
  title: string;
  poster_url: string;
  uid: string;
  media_type: "movie" | "tv";
  is_liked: boolean;
  average_vote: number;
  released_date: Date;
  duration: number;
  _id: string;
};
