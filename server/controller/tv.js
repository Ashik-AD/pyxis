import mdb from "../config/movieDb.config.js";
import sortItem from "../utils/sortItem.js";
import { forTv, extractCreditInfo } from '../utils/normalized.js';


export const tvDetails = async (req, res, next) => {
    try {
      const { tv_id } = req.params;
      const details = await mdb.tvInfo({ id: tv_id});
      const certificates = await mdb.tvContentRatings({id: tv_id});
      const { facebook_id, instagram_id, twitter_id, imdb_id } =
        await mdb.tvExternalIds({ id: tv_id });
      details.external_links = { facebook_id, instagram_id, twitter_id, imdb_id };
      details.certificates = certificates.results[0];
      res.send(details);
    } catch (err) {
      res.status(400).send('Something went wrong');
    }
  };
  
  // Tv cast, crew
  export const tvCredit = async (req, res, next) => {
    try {
      const { tv_id, credit_type } = req.params;
      const details = await mdb.tvCredits({ id: tv_id });
      const result = extractCreditInfo(details, credit_type);
      res.send(result);
    } catch (err) {
      res.status(400).send('Something went wrong');
    }
  };
  
  // Tv images
  export const tvImages = async (req, res, next) => {
    try {
      const { tv_id } = req.params;
      const { backdrops, posters } = await mdb.tvImages({ id: tv_id });
      const sortedPosters = sortItem(posters, 'vote_average', 'desc').splice(0, 10);
      const sortedBackdrops = sortItem(backdrops, 'vote_average', 'desc').splice(0, 10);
      res.send({ posters: sortedPosters, backdrops: sortedBackdrops });
    } catch (err) {
      res.status(400).send('Something went wrong');
    }
  };
  
  // Recommended Tv series
  export const recommendedTv = async (req, res, next) => {
    try {
      const { tv_id } = req.params;
      const { results } = await mdb.tvRecommendations({ id: tv_id });
      res.send(results);
    } catch (err) {
      res.status(400).send('Something went wrong');
    }
  };
  
  // Similar Tv lists
  export const similarTv = async (req, res, next) => {
    try {
      const { tv_id, page } = req.params;
      const { results } = await mdb.tvSimilar({ id: tv_id, page });
      res.send({ results: forTv(results), page });
    } catch (err) {
      res.status(400).send('Something went wrong');
    }
  };
  
  // Tv videos
  export const tvVideos = async (req, res, next) => {
    try {
      const { tv_id } = req.params;
      const { results } = await mdb.tvVideos({ id: tv_id });
      res.send({ results: results.splice(0, 6) });
    } catch (err) {
      res.status(400).send('Something went wrong');
    }
  };
  
  // Top rated Tv
  export const topRatedTv = async (req, res, next) => {
    try {
      const { page } = req.params;
      const results = await mdb.tvTopRated({ page });
      const mv = forTv(results.results);
      res.send({ results: mv, page });
    } catch (err) {
      res.status(400).send('Something went wrong');
    }
  };
  
  // Popular Tv
  export const popularTv = async (req, res, next) => {
    try {
      const { page } = req.params;
      const { results } = await mdb.tvPopular({ page });
      res.send(results);
    } catch (err) {
      res.status(400).send('Something went wrong');
    }
  };
  // Tv on the air
  export const tvOnTheAir = async (req, res, next) => {
    try {
      const { page } = req.params;
      const { results } = await mdb.tvOnTheAir({ page });
      res.send({ results: forTv(results) });
    } catch (err) {
      res.status(400).send('Something went wrong');
    }
  };
  
  // Tv keywords
  export const tvKeywords = async (req, res, next) => {
    try {
      const { tv_id } = req.params;
      const { results } = await mdb.tvKeywords({ id: tv_id });
      res.send(results);
    } catch (err) {
      res.status(400).send('Something went wrong');
    }
  };
  
  export const tvSeasons = async (req, res, next) => {
    try {
      const { tv_id, season_id } = req.params;
      const fs = await mdb.seasonInfo({ id: tv_id, season_number: season_id });
      res.send(fs);
    } catch (err) {
      res.status(400).send(err.response.data);
      console.log(err.response);
    }
  };
  
  // tv social/official links
  export const tvExternalLinks = async (req, res, next) => {
    try {
      const { tv_id } = req.params;
      const ids = await mdb.tvExternalIds({ id: tv_id });
      res.send(ids);
    } catch (err) {
      res.status(400).send('Something went wrong');
    }
  };
  
  // Cast from episode
  export const episodeCast = async (req, res, next) => {
    try {
      const { tv_id, se_num, ep_num } = req.params;
      const { cast } = await mdb.episodeCredits({
        id: tv_id,
        season_number: se_num,
        episode_number: ep_num,
      });
      res.send(cast);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };
  