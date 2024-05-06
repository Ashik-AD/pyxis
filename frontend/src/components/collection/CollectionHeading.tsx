import { FC, useContext, useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { StoreContext } from "../../store/Store";
import { noImage } from "../../utils/noImage";
import UpdateCollection from "./UpdateCollection";

interface CollectionType {
  playlist_id: string;
  playlist_name: string;
  total_items: number;
  description: string;
  uid: string;
}

const CollectionHeading: FC = () => {
  let { pathname } = useLocation();
  const playlist_id = pathname.split("/").pop()!;

  const [updateCollection, setUpdateCollection] = useState(false);
  const [collection, setCollection] = useState<Partial<CollectionType>>({});

  const {
    store: { user, collections },
  } = useContext(StoreContext);

  useEffect(() => {
    const findCollection =
      collections &&
      collections?.find((cl: any) => cl?.playlist_id === playlist_id);
    setCollection(findCollection || {});
  }, [pathname, collections]);

  useEffect(() => {
    collection && (document.title = `Pyxis • ${collection.playlist_name}`);
  }, [collection]);

  const collectionInputRef = useRef<HTMLInputElement>(null);
  const handleUpdateCollectionPopUp = () => {
    collectionInputRef.current?.select();
    setUpdateCollection(true);
  };

  if (!collection) return <h1>LOading</h1>;
  return (
    <section className="w-full">
      <div
        className="relative flex flex-col sm:flex-row gap-20 w-full h-half px-20 sm:px-50 pt-50 sm:align-bottom"
        style={{ background: "#57405b" }}
      >
        <img
          src={noImage.collection}
          alt="collection"
          className="shadow-lg cursor-pointer hover-fade-half w-full sm:w-200"
          onClick={handleUpdateCollectionPopUp}
        />
        <div className="flex flex-col py-10">
          <span className="uppercase text-xsm font-bold color-white">
            Collection
          </span>
          <span
            className="text-lg sm:text-heading-lg font-bold color-white my-10 cursor-pointer hover-fade-half"
            onClick={handleUpdateCollectionPopUp}
          >
            {collection.playlist_name}
          </span>
          <div className="flex gap-10 text-xsm  sm:text-sm color-light-gray font-bold">
            <span>{user && user.full_name}</span> •
            <span>{collection.total_items} Movie/Tv</span>
          </div>
        </div>
        <div
          className="absolute w-full h-100 left-0 bg-white"
          style={{
            top: "100%",
            background: "linear-gradient(0deg, transparent, #57405b)",
          }}
        ></div>
      </div>
      {updateCollection && (
        <UpdateCollection
          collection_id={collection.playlist_id ? collection.playlist_id : ""}
          handleClick={() => setUpdateCollection(false)}
        />
      )}
    </section>
  );
};

export default CollectionHeading;
