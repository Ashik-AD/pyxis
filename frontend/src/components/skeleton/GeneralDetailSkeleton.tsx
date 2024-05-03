import SkeletonElement from "./SkeletonElement";
const GeneralDetailSkeleton = () => {
  const h = { reg: 10, md: 15, lg: 20 };
  return (
    <div className="flex flex-col w-full gap-40">
      <div className="headding flex align-center gap-30">
        <SkeletonElement classNames="w-150 h-190" />
        <div className="flex flex-col gap-20 space-between h-full">
          <div className="flex flex-col gap-10">
            <SkeletonElement classNames="w-300 " css={{ height: h.md }} />
            <SkeletonElement classNames="w-200 " css={{ height: h.lg }} />
          </div>
          <div className="flex gap-20" style={{ marginTop: 30 }}>
            <SkeletonElement classNames="w-150 h-50 rounded-xxlg" />
            <SkeletonElement
              classNames="h-50 rounded-xxlg"
              css={{ width: 50 }}
            />
            <SkeletonElement
              classNames="h-50 rounded-xxlg"
              css={{ width: 50 }}
            />
          </div>
        </div>
      </div>
      <div className="content flex gap-30 py-20">
        <div className="w-150 space-y-10">
          <SkeletonElement classNames="w-100" css={{ height: h.md }} />
          <SkeletonElement classNames="w-120" css={{ height: h.md }} />
        </div>
        <div className="flex flex-col gap-20">
          <SkeletonElement classNames="w-100" />
          <div className="flex flex-col gap-10">
            <SkeletonElement classNames="w-400" css={{ height: h.reg }} />
            <SkeletonElement classNames="w-300" css={{ height: h.reg }} />
            <SkeletonElement classNames="w-400" css={{ height: h.reg }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralDetailSkeleton;
