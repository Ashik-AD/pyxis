import SkeletonElement from "./SkeletonElement";
import "./Skeleton.css";

export default function SkeletonCard({
  count,
  bannerClassName,
}: {
  count: number;
  bannerClassName?: string;
}) {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, idx) => (
          <div key={idx} className="flex flex-col gap-10">
            <SkeletonElement classNames={`h-300 ${bannerClassName || ""}`} />
            <SkeletonElement />
            <SkeletonElement classNames="w-75" />
            <div className="flex gap-10">
              <SkeletonElement css={css} disableAnimate={true} />
              <SkeletonElement css={css} disableAnimate={true} />
              <SkeletonElement css={css} disableAnimate={true} />
              <SkeletonElement css={css} disableAnimate={true} />
              <SkeletonElement css={css} disableAnimate={true} />
            </div>
          </div>
        ))}
    </>
  );
}

let css = {
  width: 18,
  height: 18,
  borderRadius: 36,
};
