import React from "react";

import {
  RiFacebookFill,
  RiTwitterFill,
  RiInstagramFill,
  RiExternalLinkLine,
} from "react-icons/ri";

const SocialLink: React.FC<PropTypes> = ({
  web,
  facebook_id,
  instagram_id,
  twitter_id,
}) => {
  const classes =
    "flex content-center rounded-full bg-white text-lg color-info";
  const style = {
    height: 30,
    width: 30,
    color: "#000",
  };
  if (!facebook_id && !twitter_id && !instagram_id && !web)
    return <h4>Awe, no social links found 🙁🙁</h4>;
  return (
    <div className="flex gap-10">
      {facebook_id && (
        <a
          href={`https://facebook.com/${facebook_id}`}
          rel="noreferrer"
          target="_blank"
          className={classes}
          style={style}
        >
          <RiFacebookFill />
        </a>
      )}
      {twitter_id && (
        <a
          href={`https://twitter.com/${twitter_id}`}
          rel="noreferrer"
          target="_blank"
          className={classes}
          style={style}
        >
          <RiTwitterFill />
        </a>
      )}
      {instagram_id && (
        <a
          href={`https://instagram.com/${instagram_id}`}
          rel="noreferrer"
          target="_blank"
          className={classes}
          style={style}
        >
          <RiInstagramFill />
        </a>
      )}
      <span
        className="block bg-fade mx-20"
        style={{ width: 3, height: "5vh" }}
      ></span>
      <a
        href={web ? web : "#"}
        target="_blank"
        rel="noreferrer"
        className=" color-white"
        style={{ fontSize: 25 }}
      >
        <RiExternalLinkLine />
      </a>
    </div>
  );
};

interface PropTypes {
  web: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
}

export default SocialLink;
