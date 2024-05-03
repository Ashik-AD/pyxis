import { FC, useContext } from "react";
import FullPageSlide from "../../../components/slider/FullPageSlide";
import CardLargeSliderWithStore from "../../../components/slider/CardLargeSliderWithStore";
import CardRegularSliderWithStore from "../../../components/slider/CardRegularSliderWithStore";
import Title from "../../../components/cards/Title";
import { StoreContext } from "../../../store/Store";
const TvContainer: FC = () => {
  const {
    store: { movie_full, topMovie, playingMovie },
  } = useContext(StoreContext);
  if (!movie_full || !topMovie || !playingMovie) return null;
  return (
    <div className="tv-container flex flex-col">
      <FullPageSlide url="/tv/popular/" media_type="tv" store_key="tv_full" />
      <div
        className="pl-10 sm:px-20"
        style={{
          background: "linear-gradient(0deg, transparent, #010018)",
          paddingTop: 40,
        }}
      >
        <CardLargeSliderWithStore
          media_type="tv"
          url="tv/top/"
          store_item_type="SET_TOP_TV"
          store_key="topTv"
        />
      </div>
      <div className="container flex flex-col  pl-10 py-20 sm:px-20">
        <div>
          <Title title="Tv on the air" />
          <CardRegularSliderWithStore
            url="/tv/on-air/"
            media_type="tv"
            store_item_type="SET_PLAYING_TV"
            store_key="playingTv"
          />
        </div>
      </div>
    </div>
  );
};

export default TvContainer;
