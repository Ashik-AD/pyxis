import React from "react";
import useFetch from "../../hooks/useFetch";
import CardRegular from "../cards/CardRegular";
import Slider from "./Slider";
import { CardPropTypes } from "../types/movie";

const CardSlider: React.FC<PropTypes> = (props) => {
  const { data, error, loading } = useFetch(props.url);
  if (loading) return null;
  if (!data) return null;
  if (error) return <h1>Something went wrong </h1>;
  return (
    <Slider>
      {data.results!.map((el: CardPropTypes) => (
        <CardRegular
          key={el.id}
          {...el}
          url={`/${props.renderType}/info/${el.id}-${el.title.replaceAll(
            " ",
            "-"
          )}`}
        />
      ))}
      {/* <SeeMore
        url={props.url}
        className="flex content-center color-info text-regular font-semibold h-full w-100"
      /> */}
    </Slider>
  );
};
interface PropTypes {
  readonly url: string;
  readonly renderType: "movie" | "tv";
}

export default CardSlider;
