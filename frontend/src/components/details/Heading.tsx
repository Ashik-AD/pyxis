import React, { useEffect } from "react";
import { HeadingPropTypes } from "../types/Heading.type";
import HeadingMobile from "./headings/HeadingMobile";
import HeadingDesktop from "./headings/HeadingDesktop";
import myAppTitle from "../../utils/appTitle";
const Heading: React.FC<HeadingPropTypes> = (props) => {
  const { title } = props;
  useEffect(() => {
    document.title = `${title}`;
    return () => {
      document.title = myAppTitle();
    };
  }, []);
  return (
    <div className="w-screen">
      <HeadingDesktop {...props} />
      <HeadingMobile {...props} />
    </div>
  );
};

export default Heading;
