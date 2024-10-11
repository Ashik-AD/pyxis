import { FC, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UpdateCollection from "./UpdateCollection";
import { ax } from "../../config/default";
import CollectionItemLists from "./CollectionItemLists";
import useUser from "../../hooks/useUser";

const CollectionInfo: FC = () => {
  let { pathname } = useLocation();
  const playlist_id = pathname.split("/").pop();
  const [collectionItems, setCollectionItems] = useState<any>([]);

  const [updateCollection, setUpdateCollection] = useState(false);
  const user = useUser();

  const fetchCollectionItems = async () => {
    const { data } = await ax.get(`collection/${user?.id}/${playlist_id}/all`);
    setCollectionItems(data);
  };

  useEffect(() => {
    fetchCollectionItems();
  }, [playlist_id]);

  return (
    <section className="w-full h-full">
      <CollectionItemLists
        items={collectionItems}
        handleCollection={setCollectionItems}
      />
      {updateCollection && (
        <UpdateCollection
          collection_id={playlist_id ? playlist_id : ""}
          handleClick={() => setUpdateCollection(false)}
        />
      )}
    </section>
  );
};

export default CollectionInfo;
