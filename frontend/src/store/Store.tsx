import { createContext, Dispatch, Reducer, useReducer } from "react";
import { Collection, LikedItem, User, WatchListItem } from "../types/global";
import type { STORE_ITEM_TYPE } from "./storeType";
import { storage } from "../utils/storage";

export type Store = {
  user: User | null;
  collections: Array<Collection> | null;
  watchList: WatchListItem[] | null;
  liked: LikedItem[] | null;
  topMovie: Array<any> | null;
  playingMovie: Array<any> | null;
  upcomingMovie: Array<any> | null;
  popularTv: Array<any> | null;
  popularMovie: Array<any> | null;
  topTv: Array<any> | null;
  playingTv: Array<any> | null;
  tv_full: Array<any> | null;
  movie_full: Array<any> | null;
};

export const initialState: Store = {
  user: null,
  collections: null,
  watchList: null,
  liked: null,
  popularMovie: null,
  topMovie: null,
  playingMovie: null,
  upcomingMovie: null,
  popularTv: null,
  topTv: null,
  playingTv: null,
  tv_full: null,
  movie_full: null,
};

export const StoreContext = createContext<{
  store: Store;
  dispatch: Dispatch<{ type: STORE_ITEM_TYPE; payload?: any }>;
}>({ store: initialState, dispatch: () => {} });

type StoreAction = { type: STORE_ITEM_TYPE; payload?: any };

const reducer: Reducer<Store, StoreAction> = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      storage.setItems(action.payload);
      return { ...state, user: action.payload };
    case "CLEAR_USER":
      storage.clearItems();
      return { ...state, user: null };
    case "SET_WATCHLIST": {
      return { ...state, watchList: action.payload };
    }
    case "ADD_WATCHLIST_ITEM": {
      let newWatchlist = [action.payload].concat(state.watchList);
      return {
        ...state,
        watchList: newWatchlist,
      };
    }
    case "REMOVE_WATCHLIST_ITEM": {
      return {
        ...state,
        watchList: state.watchList?.filter(
          (item) => item.item_key != action.payload,
        ),
      };
    }
    case "SET_LIKED": {
      return { ...state, liked: action.payload };
    }
    case "ADD_LIKED_ITEM": {
      return {
        ...state,
        liked: state.liked?.unshift(action.payload),
      };
    }
    case "REMOVE_LIKED": {
      return {
        ...state,
        liked: state.liked?.filter((item) => item.liked_id != action.payload),
      };
    }
    case "SET_COLLECTION":
      return { ...state, collections: action.payload };
    case "UPDATE_COLLECTION_ITEM_TOTALITEM": {
      return {
        ...state,
        collections: state.collections?.map((item) => {
          if (item.playlist_id == action.payload.pid) {
            item.total_items = action.payload.total_item;
          }
          return item;
        }),
      };
    }
    case "SET_POPULAR_MOVIE":
      return { ...state, popularMovie: action.payload };
    case "SET_TOP_MOVIE":
      return { ...state, topMovie: action.payload };
    case "SET_UPCOMING_MOVIE":
      return { ...state, upcomingMovie: action.payload };
    case "SET_PLAYING_MOVIE":
      return { ...state, playingMovie: action.payload };
    case "SET_POPULAR_TV":
      return { ...state, popularTv: action.payload };
    case "SET_TOP_TV":
      return { ...state, topTv: action.payload };
    case "SET_PLAYING_TV":
      return { ...state, playingTv: action.payload };
    case "SET_TV_FULL":
      return { ...state, tv_full: action.payload };
    case "SET_MOVIE_FULL":
      return { ...state, movie_full: action.payload };
    // Clear whole store
    case "CLEAR_STORE":
      return initialState;
    default:
      return state;
  }
};

const Store = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ store: state, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default Store;
