import { FC, CSSProperties } from "react";
import An from "./Animate.module.css";
const SkeletonElement: FC<{ classNames?: string; css?: CSSProperties }> = ({
  classNames,
  css,
}): JSX.Element => {
  return (
    <div
      className={`${An.SkeletonAnimate}  ${classNames} w-full  h-1`}
      style={css}
    ></div>
  );
};
export default SkeletonElement;
