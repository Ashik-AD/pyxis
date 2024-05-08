import React from "react";
import { Link } from "react-router-dom";
import { imageUrlWithSize } from "../../utils/imageUrl";
import { noImage } from "../../utils/noImage";
import Image from "../img/Image";

const SeasonLists: React.FC<PropTypes> = ({ season_lists }) => {
  if (season_lists.length <= 0) return null;
  return (
    <div className="grid col-1 sm:col-3 gap-20">
      {season_lists.map((el: items) => (
        <Link
          to={`season/${el.season_number}`}
          key={el.id}
          className="relative flex align-bottom gap-20 w-300 sm:w-250 lg:w-300"
        >
          <span className="img_container sm:w-full">
            <Image
              className="rounded-lg w-full"
              src={
                el.poster_path
                  ? imageUrlWithSize(el.poster_path, "300")
                  : noImage.default
              }
              alt={el.name}
            />
          </span>
          <div
            className="absolute bottom-0 left-0 w-full h-full flex content-bottom gap-10 py-10 p-20 pb-50 rounded-lg"
            style={{
              background: "linear-gradient(transparent 30%, #00072c 90%)",
              backdropFilter: "blur(0.8px)",
            }}
          >
            <div className="w-full flex flex-col gap-10">
              <span className="text-lg font-semibold truncate color-white">
                {el.name}
              </span>
              <span className=" font-semibold text-sm color-gray">
                {el.episode_count} Episodes
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
interface PropTypes {
  season_lists: items[];
}
type items = {
  air_date: Date;
  episode_count: number;
  id: number;
  name: string;
  poster_path: string;
  season_number: number;
};
export default SeasonLists;
