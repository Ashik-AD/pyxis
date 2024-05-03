import mdb from "../config/movieDb.config.js";

export const personDetails = async (req, res, next) => {
    try {
      const { person_id } = req.params;
      const details = await mdb.personInfo({ id: person_id });
      const { facebook_id, instagram_id, imdb_id, twitter_id } =
        await mdb.personExternalIds({ id: person_id });
      details.external_links = { facebook_id, instagram_id, imdb_id, twitter_id };
      res.send(details);
    } catch (err) {
      res.status(400).send('Something went wrong');
    }
  };
  
  // Person credits
  export const personCombineCredits = async (req, res, next) => {
    try {
      const { person_id, type } = req.params;
      let credits = null;
      if (type === 'movie') {
        credits = await (await mdb.personMovieCredits({ id: person_id })).cast;
      } else if (type === 'tv') {
        credits = await (await mdb.personTvCredits({ id: person_id })).cast;
      } else {
        credits = {
          message: "The person you're looking for is not found",
          status: 404,
        };
      }
      res.send(credits);
    } catch (err) {
      res
        .status(400)
        .send({ status: err.response.status, message: err.response.data });
      console.log(err.response);
    }
  };
  