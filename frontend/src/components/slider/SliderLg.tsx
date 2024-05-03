import React, { ReactElement } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const SliderArrow = React.lazy(() => import("./SliderArrow"));
const settings = {
  dots: false,
  responsive: [
    {
      breakpoint: 3000,
      settings: {
        slidesToShow: 12,
        slidesToScroll: 12,
      },
    },
    {
      breakpoint: 1920,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 7,
      },
    },
    {
      breakpoint: 1620,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 670,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 464,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const SliderLg: React.FC<{ children: ReactElement }> = (props) => {
  return (
    <Slider
      {...settings}
      nextArrow={<SliderArrow />}
      prevArrow={<SliderArrow />}
    >
      {props.children}
    </Slider>
  );
};

export default SliderLg;
