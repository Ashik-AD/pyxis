import SkeletonElement from "./SkeletonElement";
const SkeletonFullSlideHeading = () => {
  return (
    <div
      className="w-full relative grid sm:col-4 content-bottom gap-20 h-screen max-h-600 pb-50 px-50"
      style={{
        background: "linear-gradient(0deg,rgba(1, 0, 32, 0.75) 20%, #2222226b)",
      }}
    >
      <div className="span-3 space-y-20 z-1">
        <div className="flex w-50 gap-30 sm:hidden">
          <SkeletonElement />
          <SkeletonElement />
        </div>
        <SkeletonElement classNames="w-75 sm:w-50 h-50 rounded-regular" />
        <SkeletonElement classNames="h-150 opacity-half rounded-regular" />
        <div className="hidden sm:visible">
          <div className="flex gap-40 content-bottom w-full sm:w-50">
            <SkeletonElement classNames="opacity-half" />
            <SkeletonElement css={{ height: 20 }} classNames="opacity-half" />
            <SkeletonElement css={{ height: 25 }} classNames="opacity-half" />
          </div>
        </div>
        <div className="visible sm:hidden">
          <div className="flex gap-40">
            <SkeletonElement css={{ height: 40 }} />
            <SkeletonElement css={{ height: 40 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonFullSlideHeading;
