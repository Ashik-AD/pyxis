export const noImage = (() => {
  const base = import.meta.env.DEV  ? import.meta.env.VITE_SERVER_DEVELOPMENT : import.meta.env.VITE_SERVER_PRODUCTION;
   
  return {
    female: `${base}/ks23zkdsiw32f.jpg`,
    male: `${base}/ks23zkdsiw32m.jpg`,
    collection: `${base}/t/q/collection.jpg`,
    watchList: `${base}/t/q/img_watch.jpg`,
    liked: `${base}/t/q/img_like_green.jpg`,
    default: `${base}/aq23lxze82dsa.jpg`,
    default_lg: `${base}/t/q/aq23lxze82dsalg.jpg`,
    banner: `${base}/t/b/banner.webp`
  };
})();
