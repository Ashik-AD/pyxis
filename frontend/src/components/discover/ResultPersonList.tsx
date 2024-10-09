import React from "react";
import { Link } from "react-router-dom";
import { imageUrl } from "../../utils/imageUrl";
import { noImage } from "../../utils/noImage";
import Image from "../img/Image";

const ResultPersonList: React.FC<PropTypes> = (props) => {
  const { id, name, profile_path, known_for_department, gender } = props;
  return (
    <Link
      to={`/person/${name?.replaceAll(" ", "-")}-${id}`}
      key={id}
      title={name}
      className="flex flex-col items-center gap-20 color-white hover-bg-fade p-6 rounded-regular bg-secondary overflow-hidden"
    >
      <div className="h-70 w-70px sm:h-150 sm:w-150 bg-center bg-cover rounded-full overflow-hidden">
        <Image
          src={
            profile_path
              ? imageUrl(profile_path)
              : gender === 1
              ? noImage.female
              : noImage.male
          }
          alt={`picture of ${name}`}
          className="h-full w-full "
          styles={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-col gap-10 w-full px-10">
        <div className="flex flex-col">
          <span className="font-semibold text-xsm sm:text-regular truncate">
            {name}
          </span>
          <span className="capitalize text-xsm font-semibold my-6">
            {known_for_department?.toLowerCase() === "acting"
              ? "Artist"
              : known_for_department}
          </span>
        </div>
      </div>
    </Link>
  );
};

interface PropTypes {
  id: number | string;
  name: string;
  profile_path: string;
  count: string;
  known_for_department: string;
  gender: 1 | 2;
}

export default ResultPersonList;
