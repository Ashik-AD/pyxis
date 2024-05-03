import React, { FC } from "react";
import { Link } from "react-router-dom";
import { noImage } from "../../../utils/noImage";
import CollectionDrpDown from "../dropdown/CollectionDrpDown";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import CollectionContextMenu from "../../contextMenu/CollectionContextMenu";

const CollectionCard: FC<PropsType> = (props) => {
  const { uid, playlist_id, playlist_name, full_name } = props;
  const contextRef = React.createRef<HTMLDivElement>();
  const hanldeContextMenu = (eve: React.SyntheticEvent) => {
    eve.preventDefault();
    document
      .querySelectorAll(".collection-context-menu")
      .forEach((el) => el.classList.add("hidden"));
    contextRef.current?.classList.toggle("hidden");
  };
  window.addEventListener("click", () => {
    contextRef.current?.classList.add("hidden");
  });
  return (
    <div
      key={playlist_id}
      className="relative flex flex-col bg-secondary p-6 lg:p-16 rounded-lg overflow-hidden z-0 visible-on-hover"
      onContextMenu={hanldeContextMenu}
    >
      <div className="content absolute z-2 right-10 top-0 cursor-normal px-6 py-10 color-gray visible-on-hover">
        <IoEllipsisHorizontalSharp
          className={`text-lg col0r-white cursor-pointer child-hover drp-collection-${playlist_id}`}
        />
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
      <span className="color-gray my-6">By {full_name.split(" ").shift()}</span>
      <div
        className="collection-context-menu absolute right-10 bottom-10 hidden"
        ref={contextRef}
      >
        <CollectionContextMenu collection_id={playlist_id} uid={uid} />
      </div>
    </div>
  );
};

interface PropsType {
  playlist_id: string;
  playlist_name: string;
  full_name: string;
  uid: string;
}

export default CollectionCard;
