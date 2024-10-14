import { Store } from "./Store";

export type STORE_KEY = keyof Omit<Store, "user" | "collections">;

export type STORE_ITEM_TYPE =
  | "SET_USER"
  | "SET_LIKED"
  | "ADD_LIKED_ITEM"
  | "REMOVE_LIKED"
  | "SET_WATCHLIST"
  | "ADD_WATCHLIST_ITEM"
  | "REMOVE_WATCHLIST_ITEM"
  | "GET_USER"
  | "CLEAR_USER"
  | "SET_COLLECTION"
  | "UPDATE_COLLECTION_ITEM_TOTALITEM"
  | "SET_POPULAR_MOVIE"
  | "SET_TOP_MOVIE"
  | "SET_MOVIE_FULL"
  | "SET_UPCOMING_MOVIE"
  | "SET_PLAYING_MOVIE"
  | "SET_POPULAR_TV"
  | "SET_TOP_TV"
  | "SET_PLAYING_TV"
  | "SET_TV_FULL"
  | "CLEAR_STORE";

// export enum ActionEnum {
//   SET_USER = "SET_USER"
//   SET_LIKED = ""
//   | "ADD_LIKED_ITEM"
//   | "REMOVE_LIKED"
//   | "SET_WATCHLIST"
//   | "ADD_WATCHLIST_ITEM"
//   | "REMOVE_WATCHLIST_ITEM"
//   | "GET_USER"
//   | "CLEAR_USER"
//   | "SET_COLLECTION"
//   | "SET_POPULAR_MOVIE"
//   | "SET_TOP_MOVIE"
//   | "SET_MOVIE_FULL"
//   | "SET_UPCOMING_MOVIE"
//   | "SET_PLAYING_MOVIE"
//   | "SET_POPULAR_TV"
//   | "SET_TOP_TV"
//   | "SET_PLAYING_TV"
//   | "SET_TV_FULL"
//   | "CLEAR_STORE"
// }
