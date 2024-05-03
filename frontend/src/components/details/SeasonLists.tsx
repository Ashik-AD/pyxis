import React from "react";
import { RiArrowRightLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { imageUrl } from "../../utils/imageUrl";
import { noImage } from "../../utils/noImage";
import Image from "../img/Image";

const SeasonLists: React.FC<PropTypes> = ({ season_lists }) => {
  if (season_lists.length <= 0) return null;
  return (
    <div className="grid col-1 sm:col-2 gap-20">
      {season_lists.map((el: items) => (
        <Link
          to={`season/${el.season_number}`}
          key={el.id}
          className="flex align-bottom gap-20"
        >
          <span className="img_container">
            <Image
              className="rounded-lg"
              src={el.poster_path ? imageUrl(el.poster_path) : noImage.default}
              alt={el.name}
              styles={{ width: 100 }}
            />
          </span>
          <div className="meta flex flex-col gap-10 py-10 color-white">
            <span className="text-medium font-semibold truncate">
              {el.name}
            </span>
            <span className="font-bold text-sm color-gray">
              {formatDate(el.air_date)}
            </span>
            <span className=" font-semibold text-sm">
              {el.episode_count} Episodes
            </span>
            <Link
              to={`season/${el.season_number}`}
              className="color-gray font-bold text-lg color-gray"
            >
              <RiArrowRightLine />
            </Link>
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
