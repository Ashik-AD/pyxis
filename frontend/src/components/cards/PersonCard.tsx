import React from "react";
import { Link } from "react-router-dom";
import { noImage } from "../../utils/noImage";
import { PersonCardTypes } from "../types/Person.type";
import Image from "../img/Image";

const PersonCard: React.FC<PersonCardTypes> = (props) => {
  const { id, character, person_name, profile_img, department, gender } = props;
  const avatar = profile_img
    ? profile_img
    : gender === 1
      ? noImage.female
      : noImage.male;
  return (
    <Link
      to={`/person/${person_name?.replaceAll(" ", "-")}-${id}`}
      className="w-full flex flex-col md:flex-row gap-10 sm:px-10"
    >
      <Image
        src={avatar}
        alt={`Profile picture of ${person_name}`}
        className="profile_wrapper  h-100 w-100 bg-center rounded-lg"
        styles={{ objectFit: "cover" }}
      />
      <div className="flex flex-col py-10 color-white gap-10">
        <span className="font-medium text-sm">{person_name}</span>
        {character && <strong className="text-sm color-purple">as</strong>}
        <span className="font-bold text-xsm color-white color-gray">
          {character ? character : department}
        </span>
      </div>
    </Link>
  );
};

export default PersonCard;
