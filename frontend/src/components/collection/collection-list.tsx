import { useState } from "react";
import { useLocation } from "react-router-dom";
import AlertShow from "../../context/AlertContext";
import useStore from "../../hooks/useStore";
import CollectionCard from "./components/CollectionCard";
import UpdateCollection from "./UpdateCollection";

const CollectionList = () => {
  let { user, collections } = useStore();
  const [updatModal, setUpdateModal] = useState(false);
  let routeState: any = useLocation().state;

  const clearRouteState = () => {
    routeState = {};
    setUpdateModal(false);
  };

  return (
    <section className="flex flex-col gap-20">
      <section className="grid col-2 sm:col-5 gap-10">
        <AlertShow>
          {collections &&
            user &&
            collections.map((collection) => (
              <CollectionCard
                full_name={user?.full_name!}
                key={collection.playlist_id}
                uid={user?.id!}
                playlist_id={collection.playlist_id}
                playlist_name={collection.playlist_name}
                totalItem={collection.total_item}
              />
            ))}
        </AlertShow>
      </section>
      {updatModal && (
        <UpdateCollection
          collection_id={routeState.playlist_id ? routeState.playlist_id : ""}
          handleClick={() => {
            setUpdateModal(false);
            clearRouteState();
          }}
          onHandleCompletion={clearRouteState}
        />
      )}
    </section>
  );
};

export default CollectionList;
