import React from "react";

import useFetch from "../../hooks/useFetch";
import { imageUrlWithSize } from "../../utils/imageUrl";
import PersonCard from "../cards/PersonCard";

const PersonSlide: React.FC<PropTypes> = (props) => {
  let { data, loading, error } = useFetch(props.url);
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Something went wrong</h1>;
  if (!data) return <h1>Something went wrong</h1>;
  if (!props.url) {
    data = props.items;
  }
  return (
    <div className="grid col-2  md:col-3 gap-20 row-gap-30">
      {data.map((el: any) => (
        <PersonCard
          id={el.id}
          person_name={el.name}
          profile_img={
            el.profile_path ? imageUrlWithSize(el.profile_path, "185") : ""
          }
          character={el.character}
          color={props.color}
          key={el.id}
          gender={el.gender}
        />
      ))}
    </div>
  );
};
interface PropTypes {
  url: string;
  color?: string;
  items?: any[];
}
export default PersonSlide;
