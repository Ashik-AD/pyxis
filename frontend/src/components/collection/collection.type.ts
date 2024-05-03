interface CollectionType {
  playlist_items_id: string;
  playlist_id: string;
  uid: string;
  items_name: string;
  poster_url: string;
  added_date: string;
  duration: number;
  media_type: string;
  released_date: Date | null;
  is_liked: 'true' | 'false' | null;
  liked_id?: string;
  title?: string;
  liked_date?: Date | null;
  item_key?: string;
  id: string;
}
export default CollectionType;
