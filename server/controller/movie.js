import mdb from '../config/movieDb.config.js';
import { forMovie, extractCreditInfo } from '../utils/normalized.js';

// Latest movies
export const latestMovie = async (_, res, next) => {
  try {
    const fetchLatestMovie = await mdb.movieLatest();
    res.send(fetchLatestMovie);
  } catch (err) {
    res.status(400).send(err.response);
  }
};

// Popular Movies
export const popularMovies = async (req, res, next) => {
  try {
    const { results } = await mdb.moviePopular();
    const mv = results.slice(0, 10).map((el) => ({
      id: el.id,
      title: el.title,
      release_date: el.release_date,
      vote_average: el.vote_average,
      poster: el.poster_path,
      backdrop: el.backdrop_path,
      desc: el.overview,
      duration: el.runtime,
      speak_lang: el.original_language,
    }));
    res.send(mv);
  } catch (error) {
    console.log(error)
    res.status(400).send("Something went wrong");
  }
};

// Top rated movie
export const topRatedMovie = async (req, res, next) => {
  try {
    const pg = req.params.page;
    const { results, page, total_pages } = await mdb.movieTopRated({
      page: pg,
    });
    const movie = forMovie(results);
    res.send({ results: movie, page, total_pages });
  } catch (err) {
    res.status(400).send(err);
  }
};

// Playing movie in theater
export const playingMovie = async (req, res, next) => {
  try {
    const pg = req.params.page;
    const { results, page } = await mdb.movieNowPlaying({ page: pg });
    const movie = forMovie(results);
    res.send({ results: movie, page });
  } catch (err) {
    res.status(400).send('Something went wrong');
  }
};

// Upcoming movie
export const upcomingMovie = async (req, res, next) => {
  try {
    const pg = req.params.page;
    const movie = await mdb.upcomingMovies({ page: pg });
    const results = forMovie(movie.results);
    res.send({ results, page: movie.page });
  } catch (err) {
    res.status(400).send('Something went wrong');
  }
};

// Movie details
export const movieDetails = async (req, res, next) => {
  try {
    const { movie_id } = req.params;
    const details = await mdb.movieInfo({ id: movie_id });
    const { facebook_id, instagram_id, twitter_id, imdb_id } =
      await mdb.movieExternalIds({ id: movie_id });
    details.external_links = { facebook_id, instagram_id, twitter_id, imdb_id };
    res.send(details);
  } catch (err) {
    res.status(400).send('Something went wrong');
  }
};

// Recommended movie
export const recommendedMovie = async (req, res, next) => {
  try {
    const cPage = req.params.page;
    const movie = await mdb.movieRecommendations({
      id: '122',
      page: cPage,
    });
    res.send(movie);
  } catch (err) {
    res.status(400).send('Something went wrong');
  }
};

// Movie video
export const movieVideo = async (req, res, next) => {
  try {
    const { movie_id } = req.params;
    const { id, results } = await mdb.movieVideos({ id: movie_id });
    res.send({ id, results: results.splice(0,6) });
  } catch (err) {
    console.log(err.response.data);
    res.status(400).send('Something went wrong');
  }
};

// Similar movie
export const similarMovie = async (req, res, next) => {
  try {
    const { movie_id } = req.params;
    const mv = await mdb.movieSimilar({ id: movie_id });
    const results = forMovie(mv.results);
    res.send({ results });
  } catch (err) {
    res.status(400).send('Something went wrong');
  }
};

// Movie cast
export const movieCredit = async (req, res, next) => {
  try {
    const { movie_id, credit_type } = req.params; // Type should be (cast | all)
    const credit = await mdb.movieCredits({ id: movie_id });
    const result = extractCreditInfo(credit, credit_type); // return either cast || {cast, crew}
    res.send(result);
  } catch (err) {
    res.status(400).send('Something went wrong');
  }
};

// Movie images
export const movieImages = async (req, res, next) => {
  try {
    const { movie_id } = req.params;
    const { posters, backdrops } = await mdb.movieImages({ id: movie_id });
    res.send({ posters, backdrops });
  } catch (err) {
    res.status(400).send('Something went wrong');
  }
};

// List belongs to that movie
export const movieLists = async (req, res, next) => {
  try {
    const { movie_id } = req.params;
    const { results } = await mdb.movieLists({ id: movie_id });
    res.send(results);
  } catch (err) {
    res.status(400).send('Something went wrong');
  }
};

// Movie external id's (fb, tw, ig, web)
export const movieExternalIds = async (req, res, next) => {
  try {
    const { movie_id } = req.params;
    const results = await mdb.movieExternalIds({ id: movie_id });
    res.send(results);
  } catch (err) {
    res.status(400).send('Something went wrong');
  }
};

// Keywords assign to that movie
export const movieKeywords = async (req, res, next) => {
  try {
    const { movie_id } = req.params;
    const { keywords } = await mdb.movieKeywords({ id: movie_id });
    res.send(keywords);
  } catch (err) {
    res.status(400).send('Something went wrong');
  }
};
