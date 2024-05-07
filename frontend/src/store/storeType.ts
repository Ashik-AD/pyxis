import { StoreType } from "./Store";

export type STORE_KEY = keyof Omit<StoreType, "user" | "collections">;

export type STORE_ITEM_TYPE =
  | "SET_USER"
  | "GET_USER"
  | "CLEAR_USER"
  | "SET_COLLECTION"
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
