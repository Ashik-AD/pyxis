import { BiSolidCollection } from "react-icons/bi";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import CollectionList from "../../components/collection/collection-list";
import CollectionInfo from "../../components/collection/CollectionInfo";
import CreateNewCollection from "../../components/contextMenu/item/CreateNewCollection";
import Button from "../../components/details/Button";
import useStore from "../../hooks/useStore";

export default function Collections() {
  return (
    <section className="flex flex-col gap-20">
      <div className="flex space-between">
        <div className="flex gap-10 align-bottom">
          <i className="flex">
            <BiSolidCollection size={28} />
          </i>
          <span className="text-medium">Collections</span>
          <CollectionName />
        </div>
        <CreateNewCollection
          label={
            <Button
              styles="bg-purple text-medium rounded-regular py-10 px-16"
              title="Add new"
            />
          }
        />
      </div>
      <Routes>
        <Route index element={<CollectionList />} />
        <Route path="/:id" element={<CollectionInfo />} />
      </Routes>
    </section>
  );
}

function CollectionName() {
  const location = useLocation();
  const store = useStore();
  let collectionID = location.pathname.split("/").pop();

  let collection = store.collections?.find(
    (item) => item.playlist_id == collectionID,
  );
  if (!collection) {
    return null;
  }
  return (
    <div className="flex gap-10">
      <Link to={"/user/collections"} className="font-bold color-success">
        /
      </Link>
      <Link to={`./${collection?.playlist_id}`} className="color-pink">
        {collection?.playlist_name}
      </Link>
    </div>
  );
}
