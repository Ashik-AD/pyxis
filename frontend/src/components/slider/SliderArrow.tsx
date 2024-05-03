import { FC } from "react";

const SliderArrow: FC = (props: any) => {
  const pos =
    props.className.toString().search("slick-next") > 0
      ? { right: 0 }
      : { left: 0 };
  return (
    <div
      className={`${props.className} z-1 flex`}
      style={{
        ...props.style,
        ...pos,
        borderRadius: "50%",
      }}
      onClick={props.onClick}
    />
  );
};

export default SliderArrow;
