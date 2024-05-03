import DesktopHeadingSkeleton from "../skeleton/DesktopHeadingSkeleton";
import GeneralDetailSkeleton from "../skeleton/GeneralDetailSkeleton";
import SkeletonCardDetails from "../skeleton/SkeletonCardDetails";

const DetailLoading = () => {
  return (
    <section className="flex flex-col px-50">
      <DesktopHeadingSkeleton />
      <div className="flex space-between">
        <GeneralDetailSkeleton />
        <SkeletonCardDetails />
      </div>
    </section>
  );
};

export default DetailLoading;
