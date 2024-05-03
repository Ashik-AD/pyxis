import { useContext, FC } from "react";
import { StoreContext } from "../../store/Store";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
const CollectionHeading: FC<HeadingPropsType> = ({
  banner_url,
  total_item,
  color,
  title,
}) => {
  const {
    store: { user },
  } = useContext(StoreContext);
  return (
    <div
      className="w-screen flex flex-col content-center sm:content-normal px-20 sm:px-50 gap-20 sm:align-bottom relative z-1"
      style={{
        background: `linear-gradient(0deg, ${color[1]}, ${color[0]})`,
        maxHeight: 650,
        zIndex: 3,
      }}
    >
      <div
        className="flex align-center gap-10 w-full py-20 color-white text-semi font-bold"
        style={{ color: "#EAEAEA" }}
      >
        <Link to="../" className="text-lg flex color-white font-bold">
          <IoArrowBack />
        </Link>
        <span className="truncate">{title}</span>
      </div>
      <div className="flex flex-col align-center sm:flex-row gap-40 w-full">
        <img
          src={banner_url}
          alt="like_banner"
          className="w-200 sm:w-250 rounded-xxlg sm:rounded-regular my-20"
          style={{ filter: `drop-shadow(0px 0px 25px rgba(0, 0, 0, 0.25))` }}
        />
        <div className="flex flex-col gap-10 text-center sm:text-left">
          <span className="uppercase text-xsm sm:text-sm font-bold color-white">
            Collection
          </span>
          <span className="hidden sm:visible text-lg sm:text-heading-lg font-bold color-white">
            {title}
          </span>
          <div className="color-white text-medium sm:text-regular font-semibold my-10">
            <span>{user.full_name.split(" ").shift()} </span>
            {total_item > 0 && <span>• {total_item} Movie/Tv</span>}
          </div>
        </div>
        <div
          className="w-full h-100 absolute left-0"
          style={{
            background: `linear-gradient(0deg, #00000000, ${color[1]})`,
            top: "100%",
          }}
        ></div>
      </div>
    </div>
  );
};
interface HeadingPropsType {
  banner_url: string;
  color: string[];
  total_item: number;
  title: string;
}
export default CollectionHeading;
