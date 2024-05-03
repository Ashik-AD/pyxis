import SkeletonElement from "./SkeletonElement";

const CardLg = () => {
  return (
    <div className="flex flex-col p-20 gap-20">
      <SkeletonElement classNames={`h-150 rounded-regular`} />
      <div className="flex flex-col gap-10">
        <SkeletonElement />
        <SkeletonElement css={{ width: "40%", height: 13 }} />
      </div>
    </div>
  );
};

export default CardLg;
