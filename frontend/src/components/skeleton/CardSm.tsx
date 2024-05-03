import SkeletonElement from "./SkeletonElement";
const CardSm = () => {
  return (
    <div className="flex flex-col p-10 gap-20">
      <SkeletonElement
        classNames={`image_place_holder w-full bg-dark rounded-lg h-150 sm:h-200`}
      />
      <div className="flex flex-col gap-10">
        <SkeletonElement />
        <SkeletonElement css={{ width: "60%", height: 10 }} />
      </div>
    </div>
  );
};

export default CardSm;
