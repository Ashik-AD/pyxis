import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UpdateCollection from "./UpdateCollection";
import { ax } from "../../config/default";
import CollectionItemLists from "./CollectionItemLists";
import useUser from "../../hooks/useUser";
import { CollectionItem } from "./collection.type";

const CollectionInfo = () => {
  let params = useParams();
  const [collectionItems, setCollectionItems] = useState<CollectionItem[]>([]);

  const [updateCollection, setUpdateCollection] = useState(false);
  const user = useUser();

  const fetchCollectionItems = async () => {
    const { data } = await ax.get(`collection/${user?.id}/${params?.id}/all`);
    setCollectionItems(data);
  };

  useEffect(() => {
    fetchCollectionItems();
  }, [params?.id]);

  function handleCollection(items?: CollectionItem[]) {
    if (items) {
      setCollectionItems(items);
    }
  }

  return (
    <section className="w-full h-full">
      <CollectionItemLists
        items={collectionItems}
        handleCollection={handleCollection}
      />
      {updateCollection && (
        <UpdateCollection
          collection_id={params?.id || ""}
          handleClick={() => setUpdateCollection(false)}
        />
      )}
    </section>
  );
};

export default CollectionInfo;
