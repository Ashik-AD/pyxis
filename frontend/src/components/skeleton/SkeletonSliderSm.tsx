import DeviceType from "../../utils/targetDevice";
import CardSm from "./CardSm";
const SkeletonSliderSm = () => {
  return (
    <div className="grid col-2 sm:col-6 sm:gap-10" style={{ minWidth: "100%" }}>
      {DeviceType() === "mobile" ? (
        <>
          <CardSm />
          <CardSm />
        </>
      ) : (
        <>
          <CardSm />
          <CardSm />
          <CardSm />
          <CardSm />
          <CardSm />
          <CardSm />
        </>
      )}
    </div>
  );
};

export default SkeletonSliderSm;
