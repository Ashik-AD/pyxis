import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const SliderArrow = React.lazy(() => import("./SliderArrow"));
const SliderMain = (props: any) => {
  const settings = {
    dots: false,
    responsive: [
      {
        breakpoint: 3000,
        settings: {
          slidesToShow: 18,
          slidesToScroll: 18,
        },
      },
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
          slidesToShow: 9,
          slidesToScroll: 9,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 670,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
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
  return (
    <Slider
      {...settings}
      swipe={true}
      nextArrow={<SliderArrow />}
      prevArrow={<SliderArrow />}
    >
      {props.children}
    </Slider>
  );
};

export default SliderMain;
