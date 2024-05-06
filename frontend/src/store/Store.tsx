import React, { Dispatch, useReducer } from "react";
import { Collection, User } from "../types/global";
import { storeReducer } from "./storeReducer";

export type StoreType = {
  user: User | null;
  collections: Array<Collection> | null;
  topMovie: null;
  playingMovie: null;
  upcomingMovie: null;
  popularTv: null;
  popularMovie: null;
  topTv: null;
  playingTv: null;
  tv_full: null;
  movie_full: null;
};

export const INITIAL_STATE: StoreType = {
  user: null,
  collections: null,
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

export const StoreContext = React.createContext<{
  store: StoreType;
  dispatch: Dispatch<{ type: string; payload?: any }>;
}>({ store: INITIAL_STATE, dispatch: () => {} });

const Store = (props: any) => {
  const [state, dispatch] = useReducer(storeReducer, INITIAL_STATE);
  return (
    <StoreContext.Provider value={{ store: state, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default Store;
