import React from "react";
import "react-multi-carousel/lib/styles.css";
import useFetch from "../../hooks/useFetch";
import CardLarge from "../cards/CardLarge";
import { CardPropTypes } from "../types/movie";
import SliderLg from "./SliderLg";

const CardLargeSlider: React.FC<PropTypes> = (props) => {
  const { data, loading, error } = useFetch(props.url);
  if (loading) return null;
  if (!data) return null;
  if (error) return <h1>Something went wrong</h1>;
  return (
    <SliderLg>
      {data.results.map((el: CardPropTypes) => (
        <CardLarge
          imageStyle="h-200"
          key={el.id}
          {...el}
          url={`/${props.renderType}/info/${el.id}-${el.title.replaceAll(
            " ",
            "-"
          )}}`}
        />
      ))}
      {/* <SeeMore url={props.url} /> */}
    </SliderLg>
  );
};
interface PropTypes {
  readonly url: string;
  readonly renderType: string;
}
export default CardLargeSlider;
