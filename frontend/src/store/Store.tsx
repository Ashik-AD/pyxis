import React, { useReducer } from 'react';
import { storeReducer } from './storeReducer';
const INITIAL_STATE = {
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

export const StoreContext = React.createContext<any>(null);

const Store = (props: any) => {
  const [state, dispatch] = useReducer<any>(storeReducer, INITIAL_STATE);
  return (
    <StoreContext.Provider value={{ store: state, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default Store;
