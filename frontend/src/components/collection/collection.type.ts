export type CollectionItem = {
  uid: string;
  id: string;
  added_date: Date | string;
  duration: number;
  is_liked: boolean;
  title: string;
  media_type: "movie" | "tv";
  playlist_id: string;
  poster_url: string;
  released_date: Date;
};
