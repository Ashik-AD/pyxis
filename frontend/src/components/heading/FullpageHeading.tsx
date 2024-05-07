import React from "react";
import { imageUrlWithSize } from "../../utils/imageUrl";

import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import FullPagePropsType from "../types/fullpage";
import BackgroundImage from "../img/BackgroundImage";
import Rating from "../rating/rating";
import Container from "../layout/container";

const FullPageHeading: React.FC<FullPagePropsType> = (props) => {
  const {
    title,
    release_date,
    backdrop,
    detail_url,
    media_type,
    desc,
    vote_average,
  } = props;
  return (
    <div className="relative flex bg-cover  w-full h-full">
      <BackgroundImage src={imageUrlWithSize(backdrop, "1280")} />
      <div
        className="flex content-bottom relative w-full h-full color-white z-1"
        style={{
          paddingTop: 50,
          background:
            "linear-gradient(0deg,rgba(1, 0, 32, 0.75) 20%, #2222226b)",
        }}
      >
        <Container>
          <div className="info_wrapper flex flex-col sm:flex-row items-center gap-20 w-full ">
            {/*  */}
            <div
              className="hidden sm:visible w-full"
              style={{ maxWidth: 1350 }}
            >
              <div className="grid col-4 w-full pb-50">
                {/* Title and Date */}
                <div
                  className="flex span-3 text-left content-bottom pb-50"
                  style={{ paddingRight: 20 }}
                >
                  <div className="flex flex-col gap-20 lg:gap-40">
                    <span className="text-heading font-semibold">{title}</span>
                    <Rating rating={vote_average} />
                    <p className="font-medium text-sm" style={{ width: "90%" }}>
                      {desc}
                    </p>
                    <div className="flex flex-col gap-40">
                      <div className="flex gap-20">
                        <span className="text-medium lg:text-medium font-medium">
                          {formatDate(new Date(release_date))}
                        </span>
                        <span
                          className="uppercase font-bold text-msm p-6 rounded-regular px-10"
                          style={{ background: "#AB075A" }}
                        >
                          {media_type}
                        </span>
                      </div>
                      <Link
                        to={detail_url}
                        className="color-white align-center text-regular font-semibold gap-10 px-50 py-14 border-1 rounded-xxlg"
                        style={{ width: "fit-content" }}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div
        className="hidden sm:visible w-screen absolute bottom-0 left-0 z-0"
        style={{
          height: "50%",
          background: "linear-gradient(0deg, #000, transparent)",
        }}
      ></div>
    </div>
  );
};

export default FullPageHeading;
