import React from "react";
import { imageUrlWithSize } from "../../utils/imageUrl";

import { RiPlayFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import FullPagePropsType from "../types/fullpage";
import { ellipsisText } from "../../utils/ellipsisText";
import BackgroundImage from "../img/BackgroundImage";

const FullPageHeading: React.FC<FullPagePropsType> = (props) => {
  const {
    title,
    release_date,
    backdrop,
    detail_url,
    trailer_url,
    media_type,
    desc,
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
        <div className="info_wrapper flex flex-col sm:flex-row items-center gap-20 w-full ">
          {/*  */}
          <div
            className="hidden sm:visible w-full px-50"
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
                  <p className="font-medium text-sm" style={{ width: "90%" }}>
                    {ellipsisText(desc, 270)}
                  </p>
                  <div className="flex gap-40 align-bottom">
                    <div className="flex gap-20">
                      <span className="text-medium lg:text-medium font-bold">
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
                      className="color-white flex align-center text-regular font-semibold gap-10 px-16 py-10 rounded-xxlg"
                      style={{ background: "#AB075A" }}
                    >
                      View Info
                    </Link>
                  </div>
                </div>
              </div>
              {/* Trailer button */}
              <span className="flex content-center w-full py-20">
                <Link
                  to={trailer_url}
                  className="flex align-center gap-20 lg:gap-40 bg-light border-1 border-gray color-white font-medium lg:text-lg px-20 py-10 lg:px-20  rounded-xxlg hover-bg-fade transition letter-space-1 uppercase"
                >
                  <span className="flex text-lg lg:text-xlg">
                    <RiPlayFill style={{ color: "#AB075A" }} />
                  </span>
                  Trailer
                </Link>
              </span>
            </div>
          </div>
        </div>
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
