import React from "react";
import { PersonTypes } from "../types/Person.type";
import { imageUrl } from "../../utils/imageUrl";
import { noImage } from "../../utils/noImage";
import { Link } from "react-router-dom";

const PersonCardSm: React.FC<PersonTypes> = (props) => {
  const { profile_path, original_name, character, job, gender, id } = props;
  return (
    <Link
      to={`/person/${original_name.replaceAll(" ", "-")}-${id}`}
      className="flex flex-col content-center sm:content-normal sm:flex-row items-center gap-10 hover-bg-fade rounded-lg cursor sm:p-6 cursor-pointer"
    >
      <div
        style={{
          background: `url(${
            profile_path
              ? imageUrl(profile_path)
              : gender === 1
              ? noImage.female
              : noImage.male
          })`,
          backgroundPosition: "center",
          height: 80,
          width: 80,
        }}
        className="bg-cover rounded-full border-2 border-fade"
      />
      <div className="flex flex-col content-center text-center sm:text-left">
        <span className="text-regular font-medium w-full color-white">
          {original_name}
        </span>
        <span className="font-semibold text-xsm color-gray w-full my-6">
          {character ? character : job}
        </span>
      </div>
    </Link>
  );
};

export default PersonCardSm;
