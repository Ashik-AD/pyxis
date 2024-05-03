import { FC } from "react";
import { convertRuntime } from "../../utils/Duration";
import formatDate from "../../utils/formatDate";
import { imageUrlWithSize } from "../../utils/imageUrl";
import { HeadingPropTypes } from "../types/Heading.type";
import ItemLike from "../like/ItemLike";
import WatchListAdd from "../watchList/WatchListAdd";
import Button from "./Button";
import DropDown from "../dropdown/DropDown";
import ContextPlaylist from "../contextMenu/ContextPlaylist";
import { BsBookmarkPlus } from "react-icons/bs";
import Image from "../img/Image";
const DetailGeneral: FC<HeadingPropTypes> = (props) => {
  const {
    poster_path,
    release_date,
    title,
    genres,
    runtime,
    id,
    vote_average,
    type,
    overview,
  } = props;
  return (
    <div className="hidden sm:visible">
      <div className="flex flex-col">
        <div className="flex color-white  gap-20">
          <article className="w-150 ">
            <Image
              src={imageUrlWithSize(poster_path, "154")}
              className="rounded-lg h-200"
              alt="movie_poster"
            />
          </article>
          <div className="flex flex-col gap-10">
            <span className="text-xlg font-bold color-light">{title}</span>
            <div className="genre_list flex wrap gap-10 my-10">
              {genres.map((el: any) => (
                <span
                  className="px-20 py-6 color-gray text-sm font-medium border-1 border-gray rounded-xlg "
                  key={el.id}
                >
                  {el.name}
                </span>
              ))}
            </div>
            <div className="flex align-center gap-10 my-20">
              <WatchListAdd
                average_vote={vote_average}
                duration={runtime}
                media_type={type}
                item_key={id}
                release_date={release_date}
                title={title}
                poster_path={poster_path}
                styles={{
                  background: "#a30254",
                  border: 0,
                  padding: "16px 40px",
                  fontSize: 17,
                }}
              />
              <article>
                <ItemLike
                  color="#ca2845"
                  id={id}
                  duration={runtime}
                  posterPath={poster_path}
                  title={title}
                  release_date={release_date}
                  media_type="movie"
                />
              </article>
              <Button color="#ca2845" styles="drp-collection relative">
                <>
                  <BsBookmarkPlus className="drp-collection" />
                  <div className="absolute bg-primary">
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
            </div>
          </div>
        </div>
        <div className="flex nowrap py-20 color-white gap-20 my-20">
          <div
            className="flex flex-col gap-10 color-white text-lg font-semibold w-20"
            style={{ minWidth: 150 }}
          >
            <span>{formatDate(release_date)?.split(" ").pop()}</span>
            <span className="uppercase">{convertRuntime(runtime)}</span>
          </div>
          <div className="w-75 relative">
            <p className="uppercase font-bold text-sm">Storyline</p>
            <p className="my-20 font-medium text-semi color-gray line-space-2">
              {overview}
            </p>
            <div
              className="absolute w-full left-0 bottom-10 h-100"
              style={{
                background: "linear-gradient(0deg, #000, transparent)",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailGeneral;
