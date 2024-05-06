import React, { useContext, useEffect } from "react";

import { STORE_KEY } from "../../store/storeType";
import { cleanupTv } from "../../utils/cleanupTv";
import { TvFullPageSlideProps } from "../types/tv.type";
import { StoreContext } from "../../store/Store";
import { ax } from "../../config/default";
import FullPage from "../mainSlide/FullPage";
import FullPagePropsType from "../types/fullpage";
const SkeletonFullSlideHeading = React.lazy(
  () => import("../skeleton/SkeletonFullSlideHeading"),
);

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

var settings = {
  dots: true,
  autoplay: true,
  autoplaySpeed: 5000,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  arrows: false,
};

const getDetailUrl = (
  id: number | string,
  media_type: string,
  title: string,
): string => {
  return `${media_type}/info/${id}-${title.replaceAll(" ", "-")}`;
};

type Props = {
  url: string;
  media_type: "movie" | "tv";
  store_key: STORE_KEY;
}
const FullPageSlide = ({ url, store_key, media_type }: Props) => {
  const { store, dispatch } = useContext(StoreContext);

  useEffect(() => {
    let fetchItems = null;
    if (!store[store_key]) {
      fetchItems = async () => {
        const { data } = await ax.get(url);
        dispatch({
          type: media_type === "movie" ? "SET_MOVIE_FULL" : "SET_TV_FULL",
          payload: data,
        });
      };
      fetchItems();
    }
    return () => {
      fetchItems = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!store[store_key]) {
    return <SkeletonFullSlideHeading />;
  }
  const items = () => {
    return media_type === "movie"
      ? store?.movie_full?.map((movie: FullPagePropsType) => (
          <FullPage
            {...movie}
            key={movie?.id}
            media_type="movie"
            detail_url={getDetailUrl(movie?.id, media_type, movie?.title)}
            trailer_url={`trailer/${media_type}/${movie?.id}`}
          />
        ))
      : store?.tv_full
        ? cleanupTv(store?.tv_full)?.map((tv: TvFullPageSlideProps) => (
            <FullPage
              {...tv}
              key={tv.id}
              media_type="tv"
              backdrop={tv.backdrop}
              detail_url={getDetailUrl(tv.id, media_type, tv.title)}
              trailer_url={`trailer/${media_type}/${tv.id}`}
            />
          ))
        : null;
  };
  return <Slider {...settings}>{items()}</Slider>;
};
export default FullPageSlide;
