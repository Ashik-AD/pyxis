import React from "react";
import { imageUrl } from "../../utils/imageUrl";
import { PersonDetailsTypes } from "../types/Person.type";
import DisplayItem from "./DisplayItem";
import RenderLists from "./RenderLists";
import SocialLink from "./SocialLink";
// import { useColor } from 'color-thief-react';
import { noImage } from "../../utils/noImage";
import { calcAge } from "../../utils/Duration";
const PersonHeading: React.FC<PersonDetailsTypes> = (props) => {
  const {
    name,
    profile_path,
    known_for_department,
    birthday,
    also_known_as,
    homepage,
    place_of_birth,
    gender,
    external_links,
  } = props;
  // const { data } = useColor(imageUrl(profile_path), 'rgbArray', {
  //   crossOrigin: 'anonymous',
  // });
  const salutation = () => {
    return known_for_department.toLowerCase() === "acting"
      ? gender === 1
        ? "Actress"
        : "Actor"
      : known_for_department;
  };
  // const rgb = data && `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
  const rgb = "#ffff";
  const colors = `#161616`;
  return (
    <div
      className="flex flex-col sm:flex-row items-center px-20 sm:px-50 py-20 gap-20"
      style={{
        background: `linear-gradient(0deg, ${colors})`,
      }}
    >
      <img
        src={
          profile_path
            ? imageUrl(profile_path)
            : gender === 1
            ? noImage.female
            : noImage.male
        }
        alt={name}
        className="w-300 rounded-lg"
        style={{ boxShadow: `0 0 10px rgb(${rgb})` }}
      />
      <div className="meta flex flex-col gap-20 sm:mx-20">
        <div className="flex flex-col my-10" style={{ lineHeight: 1 }}>
          <span className="color-white text-lg font-bold">{salutation()}</span>
          <span className="text-heading-lg font-bold color-white">{name}</span>
        </div>
        {also_known_as.length > 0 && (
          <RenderLists title="Also Known" items={also_known_as} />
        )}
        <DisplayItem
          title="Born in:"
          value={`${birthday} (Age ${calcAge(birthday)})`}
        />
        <DisplayItem title="Country:" value={place_of_birth} />
        <SocialLink {...external_links} web={homepage} />
      </div>
    </div>
  );
};

export default PersonHeading;
