import { FC } from "react";
import formatDate from "../../utils/formatDate";
import { Link } from "react-router-dom";
import { imageUrlWithSize } from "../../utils/imageUrl";
import { ellipsisText } from "../../utils/ellipsisText";
import Image from "../img/Image";
const FullpageHeadingMobile: FC<PropsType> = ({
  release_date,
  title,
  id,
  poster,
  detail_path,
  desc,
  media_type,
}) => {
  return (
    <div className="absolute flex left-0 top-0 z-1 w-full h-full content-bottom py-20">
      <div className="flex flex-col z-1 w-full px-20 gap-10 z-3">
        <div className="flex align-center gap-10">
          <span className="font-semibold text-center text-medium color-white">
            {formatDate(new Date(release_date))?.split(",").pop()}
          </span>
          <span
            className="bg-fade color-dark font-semibold px-6 text-msm uppercase rounded-regular"
            style={{ paddingTop: 3, paddingBottom: 3 }}
          >
            {media_type}
          </span>
        </div>
        <span className="text-medium font-semibold z-1 color-white">
          {title}
        </span>
        <p className="color-white text-xsm font-semibold ">
          {ellipsisText(desc, 130)}
        </p>

        <div className="flex space-between my-20">
          <Link
            to={`movie/trailer/${id}`}
            className="flex align-center gap-10 px-20 py-10 color-red text-regular font-semibold  border-1 rounded-xxlg"
          >
            Play Trailer
          </Link>
          <Link
            to={detail_path}
            className="flex content-center bg-dark-fade px-20 py-10 font-semibold text-sm color-white capitalize rounded-xxlg"
          >
            view info
          </Link>
        </div>
      </div>
      <Image
        src={`${imageUrlWithSize(poster, "780")}`}
        alt="media_banner"
        className="absolute w-full z-0"
        styles={{ height: "100%" }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-full z-1"
        style={{
          background: "linear-gradient(0deg, #010018 10%, transparent)",
        }}
      ></div>
    </div>
  );
};

interface PropsType {
  title: string;
  desc: string;
  detail_path: string;
  id: string;
  poster: string;
  media_type: "tv" | "movie";
  release_date: Date | string;
  vote_average: number;
}
export default FullpageHeadingMobile;
