//@TODO: - fetch collection id if the item belongs
import React, { FC, useEffect, useState } from "react";
import { IoPlay, IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ax } from "../../../config/default";
import formatDate from "../../../utils/formatDate";
import { imageUrlWithSize } from "../../../utils/imageUrl";
import { HeadingPropTypes } from "../../types/Heading.type";
import Styles from "../style/HeadingDesktop.module.css";
import Button from "../Button";
import Container from "../../layout/container";
import Rating from "../../rating/rating";
import { convertRuntime } from "../../../utils/Duration";
import WatchListAdd from "../../watchList/WatchListAdd";
import ItemLike from "../../like/ItemLike";
import { BsBookmarkPlus } from "react-icons/bs";
import DropDown from "../../dropdown/DropDown";
import ContextPlaylist from "../../contextMenu/ContextPlaylist";

const HeadingDesktop: FC<HeadingPropTypes> = (props) => {
  const {
    backdrop_path,
    title,
    type,
    vote_average,
    id,
    release_date,
    overview,
    production_countries,
    spoken_languages,
    runtime,
    poster_path,
    genres,
  } = props;

  const [backdrops, setBackdrops] = useState<{ file_path: string }[]>([]);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    let fetchSlides = null;

    fetchSlides = async () => {
      const { data } = await ax.get(`${type}/${id}/images`);
      setBackdrops(data.backdrops.splice(0, 5));
    };

    fetchSlides();

    return () => {
      fetchSlides = null;
    };
  }, []);

  const handleSetSlide = (slideNum: number) => {
    setSlideIndex(slideNum);
  };

  return (
    <div className="hidden sm:visible">
      <div
        className={`desktop norepeat bg-cover flex content-bottom relative ${Styles.Heading_overlay}`}
        style={{
          minHeight: "100dvh",
          background: `url(${imageUrlWithSize(
            slideIndex === 0 ? backdrop_path : backdrops[slideIndex].file_path,
            "1280",
          )})`,
          transition: "background 1s ease",
        }}
      >
        <Container>
          <div className="flex w-full content-bottom relative z-1 pb-50">
            <div className="flex space-between align-center">
              <div className={`flex flex-col gap-30`}>
                <div className="flex flex-col gap-20 color-white">
                  <Link to="../">
                    <Button styles="font-semibold text-small">
                      <>
                        <IoChevronBack className="text-sm font-bold" />
                        <span className="text-regular">Go Back</span>
                      </>
                    </Button>
                  </Link>
                  <div className="genre_list flex wrap gap-10 my-10">
                    {genres.map((el: any) => (
                      <span
                        className="px-10 py-4 text-sm font-bold border-2 border-gray"
                        key={el.id}
                        style={{
                          borderTopRightRadius: 12,
                          borderBottomLeftRadius: 12,
                        }}
                      >
                        {el.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col gap-40">
                    <h1 className="font-semibold text-heading">{title}</h1>
                    <Rating rating={vote_average} />
                  </div>
                  <p className="font-medium lg:w-75">{overview}</p>
                </div>
                <div
                  className="grid col-2 gap-10"
                  style={{ width: "min-content" }}
                >
                  <span className="color-gray font-medium">Country:</span>
                  <span className="color-white font-semibold word-nowrap">
                    {production_countries.map((country) => country.name)}
                  </span>
                  <span className="color-gray font-medium">Language:</span>
                  <span className="color-white font-semibold word-nowrap">
                    {spoken_languages.map((lang) => lang.english_name + ", ")}
                  </span>
                  <span className="color-gray font-medium">Duration:</span>
                  <span className="color-white font-semibold word-nowrap">
                    {convertRuntime(runtime)}
                  </span>
                  <span className="color-gray font-medium">Released:</span>
                  <span className="color-white font-semibold word-nowrap">
                    {formatDate(release_date)}
                  </span>
                </div>
                <div className="flex items-center gap-20">
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
                  <Button styles="flex items-center bg-purple px-10 rounded-xxlg">
                    <>
                      <ItemLike
                        id={id}
                        duration={runtime}
                        posterPath={poster_path}
                        title={title}
                        release_date={release_date!!}
                        media_type={type}
                      />
                      |
                      <DropDown
                        label={
                          <Button>
                            <BsBookmarkPlus
                              className="drp-collection hover-fade-half"
                              size={20}
                            />
                          </Button>
                        }
                        drpId="drp-collection"
                      >
                        <ContextPlaylist
                          id={id}
                          playlist_id=""
                          title={title}
                          posterURL={poster_path ? poster_path : ""}
                          releaseDate={release_date!}
                          duration={runtime}
                          mediaType={type}
                        />
                      </DropDown>
                    </>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-30 color-white">
              <div className="relative overflow-hidden">
                <img
                  src={imageUrlWithSize(poster_path, "342")}
                  className="w-full h-250"
                  alt={title}
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    opacity: 0.8,
                  }}
                />
                <div
                  className="absolute flex content-bottom left-0 top-0 w-full h-full"
                  style={{
                    background: "linear-gradient(transparent, #060034 80%)",
                  }}
                >
                  <div className="h-half w-full flex flex-col content-center space-between pb-20">
                    <span>
                      <Button styles="bg-fade rounded-full">
                        <IoPlay className="text-heading color-black" />
                      </Button>
                    </span>
                    <span className="font-semibold text-center text-medium">
                      Watch Trailer
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex align-center gap-10">
                {backdrops.map((el: any, index: number) => (
                  <span
                    key={index}
                    className="overflow-hidden rounded-lg hover-shadow "
                    onClick={() => handleSetSlide(index)}
                  >
                    <img
                      src={imageUrlWithSize(el.file_path, "1280")}
                      className="rounded-lg md:w-40px lg:w-70px hover-scaleup transition"
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default React.memo(HeadingDesktop);
