import { CardPropTypes } from "../types/movie";
import { Link } from "react-router-dom";
import { noImage } from "../../utils/noImage";
import { imageUrlWithSize } from "../../utils/imageUrl";
import formatDate from "../../utils/formatDate";
import BackgroundImage from "../img/BackgroundImage";
import Rating from "../rating/rating";

const CardLarge = (props: CardPropTypes) => {
  const { title, url, backdrop, release_date, vote_average } = props;
  return (
    <Link
      to={url}
      className="flex cursor-pointer rounded- color-white overflow-hidden mx-6 sm:mx-10"
      title={title}
    >
      <div className="poster_wrapper flex w-full h-150 sm:h-200 rounded-xlg bg-center bg-cover no-repeat relative overflow-hidden hover-fade-half transition ">
        <BackgroundImage
          src={backdrop ? imageUrlWithSize(backdrop, "342") : noImage.default}
        />
        {/* semi-transparent black overlaye */}
        <div
          className="absolute h-full w-full z-1 bottom-0 left-0"
          style={{ background: "linear-gradient(0deg, #000 10%, transparent)" }}
        ></div>
        <div
          className="absolute flex content-bottom w-full bottom-0 left-0 px-20 z-1"
          style={{
            height: "50%",
            paddingBottom: 10,
          }}
        >
          <div className="flex w-full flex-col sm:flex-row  sm:align-center">
            <div className="flex flex-col sm:px-10 overflow-hidden">
              <span className="text-regular font-medium py-6 truncate sm:text-medium">
                {title}
              </span>
              <Rating rating={vote_average} />
              <span className="capitalize font-bold color-gray text-xsm sm:text-sm">
                {formatDate(release_date)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardLarge;
