import { FC, ReactNode } from "react";
import DropDown from "../../dropdown/DropDown";
import CollectionContextMenu from "../../contextMenu/CollectionContextMenu";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";

type PropsType = {
  drp_id: string | number;
  uid: string;
  collection_id: string;
  label?: ReactNode;
};

const CollectionDrpDown: FC<PropsType> = ({
  drp_id,
  uid,
  collection_id,
  label,
}) => {
  return (
    <DropDown
      drpId={drp_id.toString()}
      styles="bg-primary color-gray absolute z-2 rounded-lg w-200"
      label={
        label || (
          <button className="flex p-0 border-0">
            <IoEllipsisHorizontalSharp
              className={`text-lg color-white cursor-pointer`}
            />
          </button>
        )
      }
    >
      <CollectionContextMenu uid={uid} collection_id={collection_id} />
    </DropDown>
  );
};
export default CollectionDrpDown;
