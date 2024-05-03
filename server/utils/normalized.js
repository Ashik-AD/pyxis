import { noimageUrl } from './noimageUrl.js';


export const forMovie = (arrayLists) => {
  if (!arrayLists) return null;
  return arrayLists.map((el) => ({
    id: el.id,
    poster: el.poster_path,
    title: el.title,
    vote_average: el.vote_average,
    backdrop: el.backdrop_path,
    duration: el.runtime,
    release_date: el.release_date,
  }));
};

export const forTv = (arrayLists) => {
  if (!arrayLists) return null;
  return arrayLists.map((el) => ({
    id: el.id,
    poster: el.poster_path,
    title: el.name,
    vote_average: el.vote_average,
    backdrop: el.backdrop_path,
    duration: el.runtime,
    release_date: el.first_air_date,
  }));
};
export const getNecessaryFiled = (arrayLists) => {
  if (!arrayLists) return null;
  return arrayLists.map((el) => ({
    id: el.id,
    poster: el.poster_path,
    title: el.title ? el.title : el.name,
    release_date: el.release_date ? el.release_date : el.first_air_date,
    vote_average: el.vote_average,
    media_type: el.media_type,
    duration: el.runtime,
  }));
};


export const extractCreditInfo = (result, type) => {
  if (type === 'cast') {
    return result.cast;
  }
  if (type === 'crew') {
    return result.crew;
  }
  const { cast, crew } = result;
  return { cast, crew };
};
