import React from "react";
import { TvHeadingPropTypes } from "../types/Heading.type";
import HeadingMobile from "./headings/HeadingMobile";
import HeadingDesktop from "./headings/HeadingDesktop";

const TvHeading: React.FC<TvHeadingPropTypes> = (props) => {
  return (
    <div className="w-full">
      <HeadingDesktop {...props} />
      <HeadingMobile {...props} />
    </div>
  );
};

export default React.memo(TvHeading);
