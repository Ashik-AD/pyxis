import { Link } from "react-router-dom";
import { PersonCreditType } from "../types/Person.type";
import { imageUrlWithSize } from "../../utils/imageUrl";
import DisplayItem from "./DisplayItem";
import formatDate from "../../utils/formatDate";

const PersonAppearedLists: React.FC<PersonCreditType> = ({
  id,
  poster_path,
  character,
  title,
  release_date,
  first_air_date,
  name,
  media_type,
}) => {
  return (
    <Link
      className="w-full h-full flex flex-col gap-10 color-white hover-fade-half rounded-lg transition-1 overflow-x-hidden"
      to={`/${media_type}/info/${id}-${
        media_type === "movie"
          ? title.replaceAll(" ", "-")
          : name.replaceAll(" ", "-")
      }`}
      key={id}
      title={title}
      ariea-movie-name={title}
    >
      <img
        src={imageUrlWithSize(poster_path, "154")}
        alt={character}
        className="rounded-lg h-full"
      />
      <span className="text-sm truncate">
        {media_type === "movie" ? title : name}
      </span>
      {character && (
        <DisplayItem
          title="As: "
          value={character}
          className="color-gray text-xsm truncate"
        />
      )}
      <span className="text-xsm color-gray ">
        {media_type === "movie"
          ? formatDate(release_date)
          : formatDate(first_air_date)}
      </span>
    </Link>
  );
};
export default PersonAppearedLists;
