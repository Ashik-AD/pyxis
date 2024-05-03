const extractPoster = (items: any[]) => {
  if (items.length === 1) {
    return [items[0].poster_url];
  }
  const banner = items.map((el) => el.poster_url);
  return banner;
};
export default extractPoster;
