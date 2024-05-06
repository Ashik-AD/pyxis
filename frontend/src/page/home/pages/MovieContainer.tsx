import { FC } from "react";
import FullPageSlide from "../../../components/slider/FullPageSlide";
import CardLargeSliderWithStore from "../../../components/slider/CardLargeSliderWithStore";
import CardRegularSliderWithStore from "../../../components/slider/CardRegularSliderWithStore";
import Title from "../../../components/cards/Title";
const MovieContainer: FC = () => {
  return (
    <div className="movie_container flex flex-col">
      <FullPageSlide
        url="/movie/popular"
        media_type="movie"
        store_key="movie_full"
      />
      <div
        className="pl-10 sm:px-20"
        style={{
          background: "linear-gradient(0deg, transparent, #010018)",
          paddingTop: 40,
        }}
      >
        <CardLargeSliderWithStore
          media_type="movie"
          url="/movie/top"
          storeItemType="SET_TOP_MOVIE"
          storeKey="topMovie"
        />
      </div>
      <div className="container flex flex-col sm:px-20">
        <div className="my-20">
          <Title title="Movies in theater" />
          <CardRegularSliderWithStore
            url="/movie/now-playing/"
            media_type="movie"
            storeItem="SET_PLAYING_MOVIE"
            storeKey="playingMovie"
          />
        </div>
        <div className="my-20">
          <Title title="Upcoming Movies" />
          <CardRegularSliderWithStore
            url="/movie/upcoming/"
            media_type="movie"
            storeItem="SET_UPCOMING_MOVIE"
            storeKey="upcomingMovie"
          />
        </div>
      </div>
    </div>
  );
};

export default MovieContainer;
