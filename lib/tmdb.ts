import { MovieDb } from 'moviedb-promise';

if (!process.env.TMDB_KEY) {
  throw new Error(`Missing/invalid TMDB api key: "TMDB_KEY"`);
}

let movieClient = new MovieDb(process.env.TMDB_KEY);

export default movieClient;
