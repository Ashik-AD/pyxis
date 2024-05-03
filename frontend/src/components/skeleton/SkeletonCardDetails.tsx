import { FC } from "react";
import Element from "./SkeletonElement";

const SkeletonCardDetails: FC<{ total?: number }> = ({
  total,
}): JSX.Element => {
  const Sketch = Array(total ? total : 5)
    .fill(0)
    .map((_, index) => (
      <div key={index} className="flex align-center gap-10">
        <Element classNames="rounded-regular" css={{ width: 70, height: 50 }} />
        <div className="flex flex-col w-250 gap-10">
          <Element css={{ height: 10 }} />
          <Element classNames="w-100" css={{ height: 10 }} />
        </div>
      </div>
    ));
  return (
    <div className="flex flex-col gap-20 w-300">
      <Element classNames="rounded-lg" css={{ height: 13 }} />
      <div className="flex flex-col gap-10">{Sketch}</div>
    </div>
  );
};

export default SkeletonCardDetails;
