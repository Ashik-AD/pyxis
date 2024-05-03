import { storage } from '../utils/storage';
export const storeReducer = (
  state: any,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case 'SET_USER':
      storage.setItems(action.payload);
      return { ...state, user: action.payload };
    case 'GET_USER':
      return state.user;
    case 'CLEAR_USER':
      storage.clearItems();
      return {};
    case 'SET_COLLECTION':
      return { ...state, collections: action.payload };
    case 'SET_POPULAR_MOVIE':
      return { ...state, popularMovie: action.payload };
    case 'SET_TOP_MOVIE':
      return { ...state, topMovie: action.payload };
    case 'SET_UPCOMING_MOVIE':
      return { ...state, upcomingMovie: action.payload };
    case 'SET_PLAYING_MOVIE':
      return { ...state, playingMovie: action.payload };
    case 'SET_POPULAR_TV':
      return { ...state, popularTv: action.payload };
    case 'SET_TOP_TV':
      return { ...state, topTv: action.payload };
    case 'SET_PLAYING_TV':
      return { ...state, playingTv: action.payload };
    case 'SET_TV_FULL':
      return { ...state, tv_full: action.payload };
    case 'SET_MOVIE_FULL':
      return { ...state, movie_full: action.payload };
    // Clear whole store
    case 'CLEAR_STORE':
      return {};
    default:
      return state;
  }
};
