import mdb from "../config/movieDb.config.js";
import { getNecessaryFiled } from '../utils/normalized.js';

export const searchAll = async (req, res, next) => {
    try {
      const { key } = req.params;
      const { results, total_pages, page } = await mdb.searchMulti({
        query: key,
        include_adult: false,
      });
      if (!results) {
        res.status(404).send('Nothing found');
        return;
      }
      const normalized = getNecessaryFiled(results);
      res.send({ results: normalized, page, total_pages, search_query: key });
    } catch (err) {
      res.status(400).send('Something went wrong');
    }
  };
  
  // search People
  export const searchForPeople = async (req, res, next) => {
    try {
      const { key } = req.params;
      const { results } = await mdb.searchPerson({
        query: key,
        include_adult: false,
      });
      res.send(results);
    } catch (err) {
      res.status(400).send('Something went wrong');
    }
  };
  
  // Search Collections
  export const searchForCollection = async (req, res, next) => {
    try {
      const { key } = req.params;
      const { results } = await mdb.searchCollection({ query: key });
      res.send(results);
    } catch (err) {
      res.status(400).send('Something went wrong');
    }
  };
  
  // Search movie by genre
  export const discoverMovieTvByGenres = async (req, res, next) => {
    try {
      const { genre_id, page, type } = req.params;
      let data = {total_page: 0, results: null};
      if (type === 'movie') {
        const {results, total_pages} = await mdb.discoverMovie({
          with_genres: genre_id,
          sort_by: 'popularity.desc',
          page: page,
          include_adult: false,
        });
        data.results = results;
        data.total_page = total_pages / 2;
      } else if (type === 'tv') {
        const {results, total_pages} = await mdb.discoverTv({
          with_genres: genre_id,
          sort_by: 'popularity.desc',
          page: page,
          include_adult: false,
        });
        data.results = results;
        data.total_page = total_pages / 2;
      }
      res.send({ results: getNecessaryFiled(data.results), total_pages: data.total_page });
    } catch (err) {
      res.status(400).send('Something went wrong');
    }
  };