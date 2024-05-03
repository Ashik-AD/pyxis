import React, { FC, useEffect, useState } from "react";
import { IoPlay } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ax } from "../../../config/default";
import formatDate from "../../../utils/formatDate";
import { imageUrlWithSize } from "../../../utils/imageUrl";
import ProgressCircle from "../../progress/ProgressCircle";
import { HeadingPropTypes } from "../../types/Heading.type";
import Styles from "../style/HeadingDesktop.module.css";
import { RiArrowGoBackLine } from "react-icons/ri";
import Button from "../Button";
const HeadingDesktop: FC<HeadingPropTypes> = (props) => {
  const {
    backdrop_path,
    title,
    type,
    tagline,
    vote_average,
    vote_count,
    id,
    release_date,
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
        className={`desktop norepeat bg-cover relative flex content-bottom px-20 lg:px-50  relative ${Styles.Heading_overlay} overflow-hidden`}
        style={{
          maxHeight: 500,
          height: 450,
          background: `url(${imageUrlWithSize(
            slideIndex === 0 ? backdrop_path : backdrops[slideIndex].file_path,
            "1280"
          )})`,
          zIndex: 9999,
          transition: "background 1s ease",
        }}
      >
        <div className="flex flex-col w-full space-between relative z-1 max-w-1250 h-300 pb-50">
          <div className="flex space-between w-full align-center ">
            <div className={`flex flex-col`}>
              <div
                className="flex gap-20 font-bold color-white"
                style={{ fontSize: 25 }}
              >
                <Link to="../">
                  <Button styles="border-1 hover-bg-fade">
                    <RiArrowGoBackLine />
                  </Button>
                </Link>
                <div className="flex flex-col">
                  <span>{title}</span>
                  {tagline && (
                    <span className="color-white text-regular font-bold my-6">
                      &quot;{tagline}&quot;
                    </span>
                  )}
                </div>
              </div>
            </div>
            <article className="flex flex-col space-y-10 align-center color-white">
              <span>
                <span className="font-semibold uppercase bg-primary px-20 py-6 rounded-xlg">
                  {type}
                </span>
              </span>
              <span className="capitalize font-bold text-medium">
                {formatDate(release_date)}
              </span>
            </article>
          </div>
          <div className="flex space-between align-center color-white">
            <div className="flex gap-10 align-center">
              <ProgressCircle
                radius={50}
                strokeWidth={15}
                value={vote_average}
                labelStyles="text-lg"
              />
              <article className="flex flex-col font-bold">
                <span className="uppercase text-sm">
                  {vote_count > 1000
                    ? `${Math.floor(vote_count / 1000)}K votes`
                    : `${vote_count} Votes`}
                </span>
                {vote_count > 500 && vote_average > 6 && (
                  <span className="text-xsm bg-light">
                    Our Users Are Recommending It
                  </span>
                )}
              </article>
            </div>
            <div className="flex gap-20 align-center">
              <Link
                to={`trailer/${id}`}
                className="flex gap-20 color-white font-bold border-1  align-center px-20 py-14 rounded-xxlg border-gray"
              >
                <IoPlay color="purple" /> <span className="px-10">TRAILER</span>
              </Link>
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
      </div>
    </div>
  );
};

export default React.memo(HeadingDesktop);
