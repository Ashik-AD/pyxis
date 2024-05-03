import DeviceType from "../../utils/targetDevice";
import CardLg from "./CardLg";
const SkeletonSliderLg = () => {
  return (
    <div className="grid sm:col-3">
      {DeviceType() === "mobile" ? (
        <CardLg />
      ) : DeviceType() === "tablet" ? (
        <>
          {" "}
          <CardLg />
          <CardLg />
        </>
      ) : (
        <>
          <CardLg />
          <CardLg />
          <CardLg />
        </>
      )}
    </div>
  );
};

export default SkeletonSliderLg;
