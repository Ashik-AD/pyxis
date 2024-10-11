import { useEffect, useState } from "react";
import { ax } from "../../config/default";
import useUser from "../../hooks/useUser";
import CardRegular from "../../components/cards/CardRegular";
import ItemLike from "../../components/like/ItemLike";
import useStore from "../../hooks/useStore";
import useDispatch from "../../hooks/useDispatch";
import SkeletonCard from "../../components/skeleton/SkeletonCard";

const Like = () => {
  const { liked } = useStore();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const user = useUser();

  useEffect(() => {
    let fetchLiked = null;
    if (!liked || liked?.length == 0) {
      fetchLiked = async () => {
        try {
          const { data } = await ax.get(`${user?.id}/liked/all`);
          if (data) {
            dispatch({ type: "SET_LIKED", payload: data });
          }
        } catch {
        } finally {
          setLoading(false);
        }
      };
      fetchLiked();
    }
    return () => {
      fetchLiked = null;
    };
  }, [user]);

  if (loading) {
    return (
      <div className="grid gap-20 col-2 sm:col-3 md:col-4 lg:col-6">
        <SkeletonCard count={12} bannerClassName="h-200 sm:h-300" />;
      </div>
    );
  }
  return (
    <div className="grid col-2 sm:col-3 md:col-4 lg:col-7">
      {liked?.map((item) => (
        <div key={item.liked_id} className="relative overflow-hidden">
          <CardRegular
            key={item.liked_id}
            title={item.title}
            poster={item.poster_url}
            id={item.liked_id}
            release_date={item.released_date as Date}
            url={`/${item.media_type}/info/${item.liked_id}-${item.title}`}
            vote_average={item.vote_average || 1}
          />
          <div className="absolute bottom-20 right-10">
            <ItemLike
              isLiked={true}
              posterPath={item.poster_url}
              title={item.title}
              id={item.liked_id}
              release_date={item.released_date as Date}
              media_type={item.media_type}
              duration={item.duration}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Like;
