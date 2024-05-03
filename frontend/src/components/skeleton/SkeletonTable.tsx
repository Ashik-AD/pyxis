import { FC } from "react";
import "./Skeleton.css";
import SkeletonTableRow from "./SkeletonTableRow";
const SkeletonTable: FC<PropType> = ({ rowCount }) => {
  return (
    <div className="w-full flex flex-col gap-20">
      {Array(rowCount)
        .fill(0)
        .map((_, index: number) => (
          <SkeletonTableRow key={index} />
        ))}
    </div>
  );
};
type PropType = {
  rowCount: number;
};
export default SkeletonTable;
