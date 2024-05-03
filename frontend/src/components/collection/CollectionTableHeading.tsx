import { RiTimeLine } from "react-icons/ri";
const CollectionTableHeading = () => {
  return (
    <div
      className="sm:grid col-8 py-10 px-10 uppercase color-white text-xsm font-semibold"
      style={{ borderBottom: "1.5px solid #5b5b5b" }}
    >
      <p className="span-4">
        #<span className="mx-20">Title</span>
      </p>
      <p className="text-lg">
        <RiTimeLine />
      </p>
      <p>Release Date</p>
      <p className="hidden sm:visible">Date Added</p>
      <p className="text-center">:)</p>
    </div>
  );
};

export default CollectionTableHeading;
