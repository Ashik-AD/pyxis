import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import formatDate from "../../utils/formatDate";
import { imageUrl, imageUrlWithSize } from "../../utils/imageUrl";
import { noImage } from "../../utils/noImage";
import PersonCardSm from "../cards/PersonCardSm";
import { PersonTypes } from "../types/Person.type";
import { Episodes } from "../types/tv.type";
import DisplayItem from "./DisplayItem";
import MyDiv from "./MyDiv";
const EpisodeDetails: React.FC<PropTypes> = ({
  tv_id,
  episode,
  season_number,
}) => {
  const params: any = useParams();
  const { data } = useFetch(`tv/${tv_id}/${season_number}/${params.id}/cast`);
  const currentEpisode = episode.filter(
    (el) => el!.episode_number === parseInt(params.id)
  )[0];
  if (!currentEpisode) return <h1>Something went wrong</h1>;
  const styles = "grid col-2 sm:col-4 gap-20";
  return (
    <section className="fixed content-center w-screen h-full bg-primary top-0 left-0 overflow-y-scroll z-3">
      <div
        className="header bg-cover bg-center bg-center"
        style={{
          background: `url(${
            currentEpisode.still_path
              ? imageUrlWithSize(currentEpisode.still_path, "1280")
              : noImage.default
          })`,
        }}
      >
        <div
          className="w-full h-full flex flex-col sm:flex-row content-bottom px-20 lg:px-100 gap-40 py-50"
          style={{ background: "linear-gradient(0deg, #0e0e0e, transparent)" }}
        >
          <div className="img_container w-200 hidden sm:visible pt-50">
            <img
              src={
                currentEpisode.still_path
                  ? imageUrl(currentEpisode.still_path)
                  : noImage.default
              }
              alt={currentEpisode.name}
              className="w-full h-full shadow-lg rounded-lg"
            />
          </div>
          <div className="meta flex flex-col w-full sm:w-75 gap-10 pt-50">
            <span className="text-lg sm:text-heading font-bold">
              {currentEpisode.name}
            </span>
            <DisplayItem
              title="Released Date: "
              value={formatDate(currentEpisode.air_date)?.toString()}
            />
            <DisplayItem title="Vote: " value={currentEpisode.vote_average} />
            <span className="text-regular font-medium line-1/5 color-white  w-full">
              {currentEpisode.overview}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-20 py-20 sm:p-40">
        <MyDiv title="Cast">
          <div className={styles}>
            {data &&
              data.map((el: PersonTypes) => (
                <PersonCardSm {...el} key={el.id} />
              ))}
          </div>
        </MyDiv>
        {currentEpisode.guest_stars!.length > 0 && (
          <MyDiv title="Guest Staring">
            <div className={styles}>
              {currentEpisode.guest_stars?.map((el) => (
                <PersonCardSm {...el} key={el.id} />
              ))}
            </div>
          </MyDiv>
        )}
        {currentEpisode.crew!.length > 0 && (
          <MyDiv title="Crews">
            <div className={styles}>
              {currentEpisode.crew?.map((el: any) => (
                <PersonCardSm {...el} key={el.id} />
              ))}
            </div>
          </MyDiv>
        )}
      </div>
    </section>
  );
};

interface PropTypes {
  tv_id: string | number;
  season_number: string | number;
  episode: Episodes[];
}

export default EpisodeDetails;
