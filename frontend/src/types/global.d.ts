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
