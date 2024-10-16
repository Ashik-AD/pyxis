import { useContext } from "react";
import DrpItem from "../dropdown/DrpItem";
import { HiOutlineTrash } from "react-icons/hi";
import { CgRename } from "react-icons/cg";
import { MdOutlineDeleteSweep } from "react-icons/md";

import {
  deleteCollection,
  deleteCollectionContents,
} from "../collection/components/action/deleteCollection";
import { AlertContext } from "../../context/AlertContext";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import useStore from "../../hooks/useStore";
import useDispatch from "../../hooks/useDispatch";

type Props = {
  uid: string;
  collection_id: string;
};

const CollectionContextMenu = ({ uid, collection_id }: Props) => {
  const { collections } = useStore();
  const dispatch = useDispatch();
  const { setAlert } = useContext(AlertContext);
  const location = useLocation();

  const handleDeleteCollection = async () => {
    const { status } = await deleteCollection(uid, collection_id);
    if (status === 200) {
      const newCollection = collections?.filter(
        (el: any) => el.playlist_id !== collection_id,
      );
      dispatch({ type: "SET_COLLECTION", payload: newCollection });
    }
  };
  const handleRemoveItems = async () => {
    const { status } = await deleteCollectionContents(uid, collection_id);
    if (status === 200) {
      const newCollection = collections?.map((el: any) => {
        if (el.playlist_id === collection_id) {
          el.total_items = 0;
        }
        return el;
      });
      setAlert(`Items removed success`, "success");
      dispatch({ type: "SET_COLLECTION", payload: newCollection });
    } else if (status === 206) {
      setAlert("Probably this collection is empty", "success");
    } else {
      setAlert("Ops something went wrong. Please try again.", "error");
    }
  };

  useEffect(() => {
    location.state = {};
  }, []);

  return (
    <ul className="font-medium text-xsm sm:text-sm bg-primary color-gray rounded-lg p-10">
      <Link to={"/collection"} state={{ playlist_id: collection_id }}>
        <DrpItem
          icon={<CgRename />}
          text="Rename"
          classes="gap-10 hover-bg-fade py-6 px-6 rounded-regular"
          iconStyles="text-regular sm:text-lg"
        />
      </Link>
      <DrpItem
        icon={<HiOutlineTrash />}
        text="Delete"
        classes="gap-10 hover-bg-fade py-6 px-6 rounded-regular"
        iconStyles="text-regular sm:text-lg"
        handleClick={handleDeleteCollection}
      />
      <DrpItem
        icon={<MdOutlineDeleteSweep />}
        text="Clear all items"
        classes="gap-10 hover-bg-fade py-6 px-6 rounded-regular"
        iconStyles="text-regular sm:text-lg"
        handleClick={handleRemoveItems}
      />
    </ul>
  );
};

export default CollectionContextMenu;
