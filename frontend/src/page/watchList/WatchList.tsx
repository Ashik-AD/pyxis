import { useContext, FC, useEffect, useState } from "react";
import CollectionItemLists from "../../components/collection/CollectionItemLists";
import CollectionHeading from "../../components/heading/CollectionHeading";
import SkeletonTable from "../../components/skeleton/SkeletonTable";
import { ax } from "../../config/default";
import { StoreContext } from "../../store/Store";
import myAppTitle from "../../utils/appTitle";
import { noImage } from "../../utils/noImage";
const WatchList: FC = () => {
  const [watchList, setWatchList] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const {
    store: { user },
  } = useContext(StoreContext);
  useEffect(() => {
    document.title = "Pyxis - Watch List";
    return () => {
      document.title = myAppTitle();
    };
  }, []);
  useEffect(() => {
    let fetchWatchList = null;
    fetchWatchList = async () => {
      const { data } = await ax.get(`${user.id}/watch-list/all`);
      console.log(data);
      setWatchList(data);
      setLoading(false);
    };
    fetchWatchList();
    return () => {
      fetchWatchList = null;
    };
  }, [user.id]);
  return (
    <div className="">
      <CollectionHeading
        title="Watch Lists"
        banner_url={noImage.watchList}
        color={["#c44f01", "#5d1e00"]}
        total_item={watchList ? watchList.length : 0}
      />
      {loading ? (
        <SkeletonTable rowCount={5} />
      ) : (
        watchList && (
          <CollectionItemLists
            items={watchList}
            collectionName="watchlist"
            handleCollection={setWatchList}
          />
        )
      )}
    </div>
  );
};

export default WatchList;
