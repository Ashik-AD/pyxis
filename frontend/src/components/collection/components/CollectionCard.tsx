import { Link } from "react-router-dom";
import { noImage } from "../../../utils/noImage";
import CollectionDrpDown from "../dropdown/CollectionDrpDown";

interface Props {
  playlist_id: string;
  playlist_name: string;
  full_name: string;
  uid: string;
  totalItem: number;
}

const CollectionCard = (props: Props) => {
  const { uid, playlist_id, playlist_name, full_name, totalItem } = props;

  return (
    <div className="relative flex flex-col bg-secondary p-6 lg:p-16 rounded-lg overflow-hidden z-0 visible-on-hover">
      <div className="child-hover absolute z-2 right-20 top-20 cursor-normal px-6 py-10 color-gray">
        <CollectionDrpDown
          drp_id={`drp-collection-${playlist_id}`}
          collection_id={playlist_id}
          uid={uid}
        />
      </div>
      <Link to={`${playlist_id}`} state={props}>
        <img
          src={noImage.collection}
          alt={playlist_name}
          className="w-full rounded-regular select-none"
          style={{ minHeight: 150 }}
        />
      </Link>
      <span
        className="truncate color-white font-semibold"
        style={{ marginTop: 10 }}
      >
        {playlist_name}
      </span>
      <div className="flex gap-10 space-between">
        <span className="color-gray my-6">
          By {full_name.split(" ").shift()}
        </span>
        <span className="color-gray my-6">{totalItem || 0} item(s)</span>
      </div>
    </div>
  );
};

export default CollectionCard;
