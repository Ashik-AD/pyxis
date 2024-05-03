import { FC, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AlertShow from "../../context/AlertContext";
import { StoreContext } from "../../store/Store";
import CollectionCard from "./components/CollectionCard";
import UpdateCollection from "./UpdateCollection";

const Collections: FC = () => {
  const {
    store: { user, collections },
  } = useContext(StoreContext);
  const [updatModal, setUpdateModal] = useState(false);
  let routeState: any = useLocation().state;
  useEffect(() => {
    if (routeState && collections) {
      if (routeState["playlist_id"]) {
        setUpdateModal(true);
      }
    }
  }, [routeState]);
  useEffect(() => {
    return () => clearRouteState();
  }, []);

  const clearRouteState = () => {
    routeState = {};
    setUpdateModal(false);
  };
  return (
    <section className="grid col-2 sm:col-5 gap-20 py-50 px-10 sm:px-50">
      <AlertShow>
        {collections &&
          collections.map((el: CollectionData) => (
            <CollectionCard
              {...el}
              full_name={user.full_name}
              key={el.playlist_id}
              uid={user.id}
            />
          ))}
      </AlertShow>
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

type CollectionData = {
  uid: string;
  playlist_name: string;
  playlist_id: string;
  description: string;
  total_item: number;
  created_date: string;
};

export default Collections;
