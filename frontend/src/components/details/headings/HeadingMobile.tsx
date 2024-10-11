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
import Container from "../../layout/container";

const HeadingMobile: FC<HeadingPropTypes> = (props) => {
  const {
    poster_path,
    title,
    genres,
    vote_average,
    release_date,
    id,
    runtime,
    production_countries,
    spoken_languages,
    overview,
  } = props;
  return (
    <div className="visible sm:hidden">
      <div
        className="h-screen flex content-bottom top-0 left-0 bg-cover relative no-repeat pb-50"
        style={{
          backgroundImage: `url(${imageUrlWithSize(poster_path, "780")})`,
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute h-full w-full top-0 left-0"
          style={{ background: "linear-gradient(transparent, #000 90%)" }}
        ></div>
        <Container className="z-1">
          <div className="w-full bottom-0 left-0 flex flex-col gap-20">
            <span className="color-white text-xlg font-bold">{title}</span>
            <div className="flex gap-10 nowrap color-white font-semibold text-xsm overflow-x-scroll scrollbar-on-hover">
              {genres.map((el: { id: number; name: string }) => (
                <span
                  key={el.id}
                  style={{
                    paddingTop: 3,
                    paddingBottom: 3,
                    borderTopRightRadius: 12,
                  }}
                  className="bg-dark-fade px-6 rounded-regular border-1 border-gray"
                >
                  {el.name}
                </span>
              ))}
            </div>
            <p className="text-sm font-semibold">{overview}</p>
            <div
              className="grid col-2 gap-10 my-20 "
              style={{ width: "min-content" }}
            >
              <span className="color-gray font-medium text-sm">Country:</span>
              <span className="color-white font-semibold word-nowrap text-sm">
                {production_countries.map((country) => country.name)}
              </span>
              <span className="color-gray font-medium text-sm">Language:</span>
              <span className="color-white font-semibold word-nowrap text-sm">
                {spoken_languages.map((lang) => lang.english_name + ", ")}
              </span>
              <span className="color-gray font-medium text-sm">Duration:</span>
              <span className="color-white font-semibold word-nowrap text-sm">
                {convertRuntime(runtime)}
              </span>
              <span className="color-gray font-medium text-sm">Released:</span>
              <span className="color-white font-semibold word-nowrap text-sm">
                {formatDate(release_date)}
              </span>
            </div>
            <div className="flex content-center gap-10 ">
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
              <ItemLike
                color="#CA2845"
                id={id}
                duration={runtime}
                posterPath={poster_path}
                title={title}
                release_date={release_date as Date}
                media_type="movie"
              />
              <Button color={"#CA2845"} styles="drp-collection rounded-full">
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
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default HeadingMobile;
