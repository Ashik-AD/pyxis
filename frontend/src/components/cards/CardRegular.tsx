import { Link } from "react-router-dom";
import { imageUrl } from "../../utils/imageUrl";
import { noImage } from "../../utils/noImage";
import { CardPropTypes } from "../types/movie";
import formatDate from "../../utils/formatDate";
import Image from "../img/Image";
import Rating from "../rating/rating";

const CardRegular = (props: CardPropTypes) => {
  const {
    title,
    poster,
    url,
    containerStyle,
    imageStyle,
    vote_average,
    release_date,
  } = props;

  return (
    <Link
      to={url}
      className={`flex flex-col gap-10 cursor-pointer color-white overflow-x-hidden p-6 sm:p-10 hover-fade-half ${
        containerStyle ? containerStyle : ""
      }`}
      title={title}
    >
      <div
        className={`relative poster_wrapper w-full  overflow-hidden ${
          imageStyle && imageStyle
        }`}
      >
        <Image
          src={poster ? imageUrl(poster) : noImage.default}
          alt={title}
          className="h-full w-full"
        />

        <span
          className="absolute left-0 w-full h-100 z-0"
          style={{
            background: "linear-gradient(0deg, #000, transparent)",
            bottom: 0,
          }}
        ></span>
      </div>
      <div className="flex flex-col gap-10">
        <span className="font-medium truncate sm:text-sm text-xsm">
          {title}
        </span>
        <Rating rating={vote_average} />
        <span className="text-xsm font-semibold color-gray">
          {formatDate(release_date)}
        </span>
      </div>
    </Link>
  );
};

export default CardRegular;
