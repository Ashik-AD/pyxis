import React from "react";
import { imageUrlWithSize } from "../../utils/imageUrl";
import Image from "../img/Image";

const TopMovieTvCard: React.FC<PropTypes> = (props) => {
  const { poster, title, media_type, vote_average, release_date } = props;
  return (
    <>
      <Image
        src={imageUrlWithSize(poster, "185")}
        alt={title}
        className="w-full sm:w-200 sm:h-300 rounded-lg"
      />
      <div className="flex flex-col gap-20 meta sm:py-20">
        <div className="text-lg font-semibold">
          <p>{title}</p>
          <span
            className="bg-primary item-center uppercase font-semibold text-xsm px-10 py-6 rounded-xlg"
            style={{ letterSpacing: 1.5 }}
          >
            {media_type}
          </span>
        </div>
        <div className="flex flex-col gap-10 font-semibold color-gray">
          <span>{vote_average}</span>
          <span>Released: {release_date}</span>
        </div>
      </div>
    </>
  );
};
interface PropTypes {
  poster: string;
  title: string;
  vote_average: number;
  release_date: string;
  media_type: string;
}

export default TopMovieTvCard;
