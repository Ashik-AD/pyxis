import React, { useContext, FC, useEffect } from "react";

import { STORE_KEY } from "../../store/storeType";
import { cleanupTv } from "../../utils/cleanupTv";
import { TvFullPageSlideProps } from "../types/tv.type";
import { StoreContext } from "../../store/Store";
import { ax } from "../../config/default";
import FullPage from "../mainSlide/FullPage";
import FullPagePropsType from "../types/fullpage";
const SkeletonFullSlideHeading = React.lazy(
  () => import("../skeleton/SkeletonFullSlideHeading")
);

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const FullPageSlide: FC<PropTypes> = ({ url, store_key, media_type }) => {
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
  if (!store[store_key]) {
    return <SkeletonFullSlideHeading />;
  }
  const items = () => {
    return media_type === "movie"
      ? store.movie_full.map((el: FullPagePropsType) => (
          <FullPage
            key={el.id}
            {...el}
            media_type="movie"
            detail_url={getDetailUrl(el.id, media_type, el.title)}
            trailer_url={`trailer/${media_type}/${el.id}`}
          />
        ))
      : cleanupTv(store.tv_full).map((el: TvFullPageSlideProps) => (
          <FullPage
            key={el.id}
            {...el}
            media_type="tv"
            backdrop={el.backdrop}
            detail_url={getDetailUrl(el.id, media_type, el.title)}
            trailer_url={`trailer/${media_type}/${el.id}`}
          />
        ));
  };
  return <Slider {...settings}>{items()}</Slider>;
};
const getDetailUrl = (
  id: number | string,
  media_type: string,
  title: string
): string => {
  return `${media_type}/info/${id}-${title.replaceAll(" ", "-")}`;
};
interface PropTypes extends STORE_KEY {
  url: string;
  media_type: "movie" | "tv";
}
export default FullPageSlide;
