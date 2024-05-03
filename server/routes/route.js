import {
  signUp,
  signIn,
  updateEmail,
  changePassword,
  deleteAccountPermanent,
} from '../controller/auth.js';
import passport from 'passport';
import passportConfig from '../config/passport.config.js';
import User from '../model/user.js';
import { allCountry, searchCountry } from '../controller/country.js';
import {
  latestMovie,
  movieCredit,
  movieDetails,
  movieExternalIds,
  movieImages,
  movieKeywords,
  movieLists,
  movieVideo,
  playingMovie,
  popularMovies,
  recommendedMovie,
  similarMovie,
  topRatedMovie,
  upcomingMovie,
} from '../controller/movie.js';
import {  topRatedTv,
  tvCredit,
  tvDetails,
  tvImages,
  tvKeywords,
  tvOnTheAir,
  tvSeasons,
  tvVideos,  similarTv,  recommendedTv,  popularTv,  episodeCast,

} from '../controller/tv.js';
import {  movieAndTvGenres,
} from '../controller/genreList.js';
import { singleTrailer } from '../controller/trailer.js';
import {   searchAll,
  searchForCollection,
  searchForPeople,   discoverMovieTvByGenres,
} from '../controller/search.js'; 
import {  personCombineCredits,
  personDetails} from '../controller/person.js';
import {
  addLike,
  addPlaylistItem,
  addWatchList,
  countItems,
  createPlaylist,
  getLiked,
  getLikedWithLimit,
  getPlaylist,
  getPlaylistItems,
  getWatchList,
  getWatchListLimit,
  removeLike,
  removePlaylist,
  removePlaylistItem,
  removePlaylistItemAll,
  removeWatchList,
  renamePlaylist,
  searchLiked,
} from '../controller/userMovie.js';
import { generateToken } from '../model/userToken.js';

// Init passport middleware
passportConfig();

const authenticate = passport.authenticate('jwt', { session: false });
const routes = (app) => {
  app.get("/", async(req, res) => {
    res.send("<h1>Welcome to the PYXIS 🥳😃</h1>");
  })
  app.post('/signup', signUp);
  app.post('/login', signIn);
  app.post('/account/update-email', authenticate, updateEmail);
  app.post('/security/update-auth/password', authenticate, changePassword);
  app.post('/account/delete/permanent', authenticate, deleteAccountPermanent);
  app.post('/get-user', authenticate, async (req, res, next) => {
    try {
      const { body } = req;
      const user = await User.findById(body.uid);
      if (!user) {
        return res.status(400).send('Are your f*king kidding me?');
      }
      const token = await generateToken(user);
      res.send({
        id: user.uid,
        full_name: user.user_name,
        country: user.country,
        email: user.email,
        date_of_birth: user.date_of_birth,
        joined_date: user.joined_date,
        liked_id: user._liked,
        playlists_id: user._playlists,
        token: token,
      });
    } catch (error) {
      res.status(404).send('User not found')
    }
  });
  app.get('/country/all', allCountry);
  app.get('/country/search/:c_name', searchCountry);

  app.get('/latest-movie', authenticate, latestMovie);
  app.get('/movie/popular', authenticate, popularMovies);
  app.get('/movie/top/:page?', authenticate, topRatedMovie);
  app.get('/movie/now-playing/:page?', authenticate, playingMovie);
  app.get('/movie/upcoming/:page?', authenticate, upcomingMovie);
  app.get('/movie/similar/:movie_id', authenticate, similarMovie);
  app.get('/movie/credit/:movie_id/:credit_type?', authenticate, movieCredit);
  app.get('/movie/:movie_id/images', authenticate, movieImages);
  app.get('/movie/recommended/:page?', authenticate, recommendedMovie);
  app.get('/movie/:movie_id/details', authenticate, movieDetails);
  app.get('/movie/:movie_id/video', authenticate, movieVideo);
  app.get('/movie/:movie_id/lists', authenticate, movieLists);
  app.get('/movie/:movie_id/external-ids', authenticate, movieExternalIds);
  app.get('/movie/:movie_id/keywords', authenticate, movieKeywords);

  app.get('/tv/:tv_id/details', authenticate, tvDetails);
  app.get('/tv/credit/:tv_id/:credit_type?', authenticate, tvCredit);
  app.get('/tv/:tv_id/images', authenticate, tvImages);
  app.get('/tv/:tv_id/recommended', authenticate, recommendedTv);
  app.get('/tv/similar/:tv_id/:page?', authenticate, similarTv);
  app.get('/tv/:tv_id/video', authenticate, tvVideos);
  app.get('/tv/top/:page?', authenticate, topRatedTv);
  app.get('/tv/popular/:page?', authenticate, popularTv);
  app.get('/tv/on-air/:page?', authenticate, tvOnTheAir);
  app.get('/tv/:tv_id/keywords/:page?', authenticate, tvKeywords);
  app.get('/tv/:tv_id/external-ids', authenticate, tvKeywords);
  app.get('/tv/season/:tv_id/:season_id', authenticate, tvSeasons);

  app.get('/single-trailer/:type/:id', authenticate, singleTrailer);
  app.get('/tv/:tv_id/:se_num/:ep_num/cast', authenticate, episodeCast);

  app.get('/person/:person_id', authenticate, personDetails);
  app.get(
    '/person/credits/:person_id/:type',
    authenticate,
    personCombineCredits
  );

  app.get('/discover/genre/', authenticate, movieAndTvGenres);
  app.get('/search/:key/', authenticate, searchAll);
  app.get('/search/people/:key/', authenticate, searchForPeople);
  app.get('/search/collection/:key/', authenticate, searchForCollection);
  app.get(
    '/discover/:type/by_genre/:genre_id/:page?',
    authenticate,
    discoverMovieTvByGenres
  );

  app.post('/create-playlist/:uid', authenticate, createPlaylist);
  app.get('/:uid/playlist', authenticate, getPlaylist);
  app.post('/:uid/update-playlist', authenticate, renamePlaylist);
  app.delete('/:uid/collection/:collection_id/remove', authenticate, removePlaylist);
  app.delete('/:uid/collection/:collection_id/remove/all', authenticate, removePlaylistItemAll);
  app.post('/:uid/playlist/add-item', authenticate, addPlaylistItem);
  app.get('/collection/:uid/:playlist_id/all', authenticate, getPlaylistItems);
  app.delete('/:uid/playlist-item/delete', authenticate, removePlaylistItem);
  app.get('/:uid/liked/all', authenticate, getLiked);
  app.get(
    '/liked/with-limit/:uid/:liked_id/:limit',
    authenticate,
    getLikedWithLimit
  );
  app.post('/:uid/liked/add', authenticate, addLike);
  app.post('/:uid/liked/delete', authenticate, removeLike);
  app.post('/liked/search', authenticate, searchLiked);

  app.post('/:uid/watch-list/add', authenticate, addWatchList);
  app.get('/:uid/watch-list/all', authenticate, getWatchList);
  app.get('/:uid/watch-list/:limit', authenticate, getWatchListLimit);
  app.delete('/:uid/watch-list/remove/:item_id', authenticate, removeWatchList);
  app.get('/:uid/count/:table', authenticate, countItems);
};
export default routes;
