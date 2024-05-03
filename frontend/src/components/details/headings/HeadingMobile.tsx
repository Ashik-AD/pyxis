import { FC } from "react";
import { HeadingPropTypes } from "../../types/Heading.type";
import WatchListAdd from "../../watchList/WatchListAdd";
import ItemLike from "../../like/ItemLike";
import DropDown from "../../dropdown/DropDown";
import ContextPlaylist from "../../contextMenu/ContextPlaylist";
import { imageUrlWithSize } from "../../../utils/imageUrl";
import formatDate from "../../../utils/formatDate";
import { convertRuntime } from "../../../utils/Duration";
import Button from "../Button";
import { BsBookmarkPlus } from "react-icons/bs";

const HeadingMobile: FC<HeadingPropTypes> = (props) => {
  const {
    poster_path,
    title,
    genres,
    vote_average,
    release_date,
    id,
    runtime,
  } = props;
  return (
    <div
      className="relative visible sm:hidden"
      style={{ zIndex: 999, minHeight: "100%" }}
    >
      <div
        className="top-0 left-0 w-full bg-cover relative no-repeat"
        style={{
          backgroundImage: `url(${imageUrlWithSize(poster_path, "original")})`,
          minHeight: "400px",
        }}
      >
        <div
          className="absolute h-full w-full top-0 left-0"
          style={{ background: "linear-gradient(0deg, #060034, transparent)" }}
        ></div>
      </div>
      <div
        className="w-full bottom-0 left-0 flex flex-col gap-10 px-20"
        style={{
          background: "linear-gradient(#060034, rgb(0 0 0 / 94%) 100%)",
        }}
      >
        <span className="color-white text-lg font-bold">{title}</span>
        <div
          className="flex gap-10 nowrap color-white font-semibold text-xsm overflow-x-scroll scrollbar-on-hover"
          style={{ marginBottom: 5 }}
        >
          {genres.map((el: { id: number; name: string }) => (
            <span
              key={el.id}
              style={{ paddingTop: 3, paddingBottom: 3 }}
              className="bg-dark-fade px-6 rounded-regular border-1 border-success"
            >
              {el.name}
            </span>
          ))}
        </div>
        <div className="flex gap-10 color-gray font-semibold text-semi uppercase">
          <span>{formatDate(release_date)?.split(" ").pop()}</span>•
          <span>{convertRuntime(runtime)} </span>
        </div>
        <div className="flex content-center gap-10" style={{ marginTop: 30 }}>
          <WatchListAdd
            title={title}
            item_key={id}
            average_vote={vote_average}
            media_type="movie"
            poster_path={poster_path}
            release_date={release_date}
            duration={runtime}
            styles={{ backgroundColor: "#CA2845", border: 0, width: "70%" }}
            classNames="shadow-lg text-regular font-medium letter-space-1 px-20 py-16 content-center"
          />
        </div>
      </div>
      <div className="absolute flex gap-10 top-0 right-0 py-20 px-20 color-white">
        <span>
          <ItemLike
            color="#CA2845"
            id={id}
            duration={runtime}
            posterPath={poster_path}
            title={title}
            release_date={release_date}
            media_type="movie"
          />
        </span>
        <span>
          <Button color={"#CA2845"} styles="drp-collection">
            <>
              <BsBookmarkPlus className="drp-collection" />
              <div className="absolute">
                <DropDown label="" drpId="drp-collection">
                  <ContextPlaylist
                    playlistItemId={id}
                    playlistItemName={title}
                    posterURL={poster_path ? poster_path : ""}
                    releaseDate={release_date}
                    duration={runtime}
                    mediaType="movie"
                  />
                </DropDown>
              </div>
            </>
          </Button>
        </span>
      </div>
    </div>
  );
};

export default HeadingMobile;
