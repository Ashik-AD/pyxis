import React from "react";
import useFetch from "../../hooks/useFetch";
import selectedPeople from "../../utils/selectedPeople";
import { imageUrlWithSize } from "../../utils/imageUrl";
import { noImage } from "../../utils/noImage";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RenderPersons } from "../person-list";

const Crew: React.FC<PropTypes> = ({ id, type }) => {
  const { data, loading, error } = useFetch(`${type}/credit/${id}/crew`);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Something went wrong</h1>;
  if (!data) return <h1>No data</h1>;

  const crew = selectedPeople(data).map((el) => ({
    id: el.id,
    name: el.original_name,
    profile_path: el.profile_path
      ? imageUrlWithSize(el.profile_path, "185")
      : el.gender === 2
        ? noImage.male
        : noImage.female,
    department: el.job,
    gender: el.gender,
  }));

  //@ts-ignore
  return <RenderPersons list={crew} />;
};
interface PropTypes {
  color: string;
  id: number;
  type: "tv" | "movie";
}
export default Crew;
