import { CSSProperties } from "react";
import animStyles from "./Animate.module.css";

type Props = {
  classNames?: string;
  css?: CSSProperties;
  disableAnimate?: boolean;
};
const SkeletonElement = ({ classNames, css, disableAnimate }: Props) => {
  return (
    <div
      className={`${!disableAnimate ? animStyles.container_animate : ""} ${animStyles.container} ${classNames} w-full  h-1`}
      style={css}
    ></div>
  );
};
export default SkeletonElement;
