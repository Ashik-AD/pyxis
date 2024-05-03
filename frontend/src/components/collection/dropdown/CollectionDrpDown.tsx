import { FC } from "react";
import DropDown from "../../dropdown/DropDown";
import CollectionContextMenu from "../../contextMenu/CollectionContextMenu";
const CollectionDrpDown: FC<PropsType> = ({ drp_id, uid, collection_id }) => {
  return (
    <DropDown
      label={""}
      drpId={drp_id.toString()}
      styles="bg-primary color-gray absolute z-2 rounded-lg w-150"
    >
      <CollectionContextMenu uid={uid} collection_id={collection_id} />
    </DropDown>
  );
};
type PropsType = {
  drp_id: string | number;
  uid: string;
  collection_id: string;
};
export default CollectionDrpDown;
