import { useEffect, useState } from "react";
import CollectionItemLists from "../../components/collection/CollectionItemLists";
import CollectionHeading from "../../components/heading/CollectionHeading";
import SkeletonTable from "../../components/skeleton/SkeletonTable";
import { noImage } from "../../utils/noImage";
import { ax } from "../../config/default";
import useUser from "../../hooks/useUser";

const Like = () => {
  const [likedItem, setLikedItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const user = useUser()

  useEffect(() => {
    document.title = "Pyxis - Liked";
  }, []);

  useEffect(() => {
    let fetchLiked = null;
    fetchLiked = async () => {
      const { data } = await ax.get(`${user?.id}/liked/all`);
      if (data) {
        setLikedItem(data);
      }
      setLoading(false);
    };
    fetchLiked();
    return () => {
      fetchLiked = null;
    };
  }, []);

  return (
    <div className="">
      <CollectionHeading
        title="Liked Movie/Tv"
        color={["#02661e", "#005314"]}
        total_item={likedItem ? likedItem.length : 0}
        banner_url={noImage.liked}
      />
      {loading ? (
        <SkeletonTable rowCount={8} />
      ) : (
        likedItem.length > 0 && (
          <CollectionItemLists
            items={likedItem}
            handleCollection={setLikedItem}
            collectionName="liked"
          />
        )
      )}
    </div>
  );
};

export default Like;
