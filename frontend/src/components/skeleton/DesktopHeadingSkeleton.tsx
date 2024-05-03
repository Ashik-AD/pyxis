import { FC } from "react";
import Animate from "./Animate.module.css";

const DesktopHeadingSkeleton: FC = () => {
  const h = { regular: 10, medium: 15, lg: 20 };
  const thumbnails = Array(4)
    .fill(0)
    .map((_, index: number) => (
      <span
        key={index}
        className={Animate.SkeletonAnimate + " bg-fade rounded-lg"}
        style={{ width: 70, height: 40 }}
      ></span>
    ));
  return (
    <div
      className={`flex content-center w-full`}
      style={{
        maxHeight: 400,
        height: 370,
      }}
    >
      <div className="flex flex-col w-full space-between relative z-1 max-w-1250 h-250  pb-50">
        <div className="flex space-between w-full align-center">
          <article className={`flex flex-col gap-10`}>
            <span
              className={Animate.SkeletonAnimate + " w-300 bg-fade rounded-xlg"}
              style={{ height: 20 }}
            ></span>
            <span
              className={Animate.SkeletonAnimate + " w-200 bg-fade rounded-xlg"}
              style={{ height: 12 }}
            ></span>
          </article>
          <article className="flex flex-col gap-10 content-right">
            <span
              className={Animate.SkeletonAnimate + " bg-fade py-6 rounded-xlg"}
              style={{ height: 20, width: 80 }}
            ></span>
            <span
              className={Animate.SkeletonAnimate + " bg-fade py-6 rounded-xlg"}
              style={{ height: 10, width: 150 }}
            ></span>
          </article>
        </div>
        <div className="flex space-between align-center color-white">
          <div className="flex gap-10 align-center">
            <span
              className={
                "rounded-full bg-fade overflow-hidden " +
                Animate.SkeletonAnimate
              }
              style={{ width: 60, height: 60 }}
            ></span>
            <article className="flex flex-col gap-10">
              <span
                className={
                  Animate.SkeletonAnimate + " bg-fade rounded-lg w-150"
                }
                style={{ height: h.medium }}
              ></span>

              <span
                className={
                  Animate.SkeletonAnimate + " bg-fade w-200 rounded-lg"
                }
                style={{ height: h.regular }}
              ></span>
            </article>
          </div>
          <div className="flex gap-20 align-center">
            <span
              className={
                Animate.SkeletonAnimate + " w-150 bg-fade rounded-xxlg"
              }
              style={{ height: 50 }}
            ></span>
          </div>
          <div className="flex gap-10">{thumbnails}</div>
        </div>
      </div>
    </div>
  );
};

export default DesktopHeadingSkeleton;
