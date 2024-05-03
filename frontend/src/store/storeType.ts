export interface STORE_KEY {
  store_key:
    | 'popularMovie'
    | 'topMovie'
    | 'upcomingMovie'
    | 'playingMovie'
    | 'popularTv'
    | 'topTv'
    | 'playingTv'
    | 'tv_full'
    | 'movie_full';
}

export interface STORE_ITEM_TYPE {
  store_item_type:
    | 'SET_POPULAR_MOVIE'
    | 'SET_TOP_MOVIE'
    | 'SET_UPCOMING_MOVIE'
    | 'SET_PLAYING_MOVIE'
    | 'SET_POPULAR_TV'
    | 'SET_TOP_TV'
    | 'SET_PLAYING_TV'
    | 'SET_TV_FULL'
    | 'SET_MOVIE_FULL';
}
