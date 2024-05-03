import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../store/Store";
import SkeletonElement from "../../skeleton/SkeletonElement";

const CollectionLists: FC = () => {
  const {
    store: { collections },
  } = useContext(StoreContext);
  if (!collections) {
    return (
      <div className="flex flex-col gap-10">
        <SkeletonElement css={{ height: 13 }} />
        <SkeletonElement css={{ height: 15 }} />
        <SkeletonElement css={{ height: 13 }} />
        <SkeletonElement css={{ height: 13 }} />
        <SkeletonElement css={{ height: 13 }} />
        <SkeletonElement css={{ height: 13 }} />
      </div>
    );
  }
  return (
    <div className="w-full font-medium color-gray overflow-y-scroll overflow-x-hidden scrollbar-on-hover">
      <ul className="space-y-10 overflow-x-hidden">
        {collections.map((el: CollectionItem) => (
          <li
            key={el.playlist_id}
            className="truncate"
            title={el.playlist_name}
          >
            <Link to={`collection/${el.playlist_id}`}>{el.playlist_name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
type CollectionItem = {
  playlist_id: string;
  playlist_name: string;
  uid: string;
};
export default CollectionLists;
