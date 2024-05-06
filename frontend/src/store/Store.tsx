import React, { Dispatch, useReducer } from "react";
import { Collection, User } from "../types/global";
import { storeReducer } from "./storeReducer";

export type StoreType = {
  user: User | null;
  collections: Array<Collection> | null;
  topMovie: Array<any> | null 
  playingMovie: Array<any> | null;
  upcomingMovie: Array<any> | null;
  popularTv: Array<any> | null;
  popularMovie: Array<any> | null;
  topTv: Array<any> | null;
  playingTv: Array<any> | null;
  tv_full: Array<any> | null;
  movie_full: Array<any> | null;
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
