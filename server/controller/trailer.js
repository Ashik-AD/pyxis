import mdb from "../config/movieDb.config.js";
  // Movie / Single trailer
  export const singleTrailer = async (req, res, next) => {
    try {
      const { id, type } = req.params;
      if (type !== 'movie' && type !== 'tv') {
        res.status(404).send(`Can't find trailer`);
        return;
      }
      let data;
  
      if (type === 'movie') {
        data = await mdb.movieVideos({ id });
      } else {
        data = await mdb.tvVideos({ id });
      }
      res.send(data.results[0]);
    } catch (err) {
      res.status(400).send('Something went wrong');
    }
  };
  