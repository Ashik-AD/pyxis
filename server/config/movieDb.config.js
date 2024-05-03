import  {MovieDb}  from 'moviedb-promise';
import dotenv from 'dotenv'
dotenv.config();

const movieDb = new MovieDb(process.env.TMDB_API_KEY);
export default movieDb;
