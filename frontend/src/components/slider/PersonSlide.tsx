import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const SliderArrow = React.lazy(() => import("./SliderArrow"));

import useFetch from "../../hooks/useFetch";
import { imageUrlWithSize } from "../../utils/imageUrl";
import PersonCard from "../cards/PersonCard";
export const settings = {
  dots: false,
  responsive: [
    {
      breakpoint: 1920,
      settings: {
        slidesToShow: 12,
        slidesToScroll: 12,
      },
    },
    {
      breakpoint: 1620,
      settings: {
        slidesToShow: 10,
        slidesToScroll: 10,
      },
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 670,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 464,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};
const PersonSlide: React.FC<PropTypes> = (props) => {
  let { data, loading, error } = useFetch(props.url);
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Something went wrong</h1>;
  if (!data) return <h1>Something went wrong</h1>;
  if (!props.url) {
    data = props.items;
  }
  return (
    <Slider
      {...settings}
      nextArrow={<SliderArrow />}
      prevArrow={<SliderArrow />}
    >
      {data.map((el: any) => (
        <PersonCard
          id={el.id}
          person_name={el.name}
          profile_img={
            el.profile_path ? imageUrlWithSize(el.profile_path, "154") : ""
          }
          character={el.character}
          color={props.color}
          key={el.id}
          gender={el.gender}
        />
      ))}
    </Slider>
  );
};
interface PropTypes {
  url: string;
  color?: string;
  items?: any[];
}
export default PersonSlide;
