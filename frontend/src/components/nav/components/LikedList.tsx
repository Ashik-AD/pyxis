import { Link } from "react-router-dom";
import DrpWrapper from "./DrpWrapper";
import useFetch from "../../../hooks/useFetch";
import { imageUrlWithSize } from "../../../utils/imageUrl";
import Spinner from "../../loading/Spinner";
import useUser from "../../../hooks/useUser";

type LikedTypes = {
  id: string;
  liked_id: string;
  media_type: string;
  poster_url: string;
  title: string;
}

const LikedList = () => {
  const user = useUser();

  const { data, loading } = useFetch(
    `/liked/with-limit/${user?.id}/${user?.liked_id}/6`,
  );

  return (
    <DrpWrapper title="Liked" link="/like">
      {loading ? (
        <Spinner styles="h-400" />
      ) : (
        <div className="fade-in">
          {data.map((lk: LikedTypes) => (
            <Link
              to={`/${lk.media_type}/info/${lk.liked_id}-${lk.title.replaceAll(
                " ",
                "-",
              )}`}
              key={lk.id}
              className="flex items-center color-gray gap-10 my-10 hover-bg-fade rounded-regular"
            >
              <img
                src={imageUrlWithSize(lk.poster_url, "92")}
                alt={lk.title}
                className="w-20 rounded-lg"
                style={{ height: 70 }}
              />
              <span className="text-sm font-medium truncate">{lk.title}</span>
            </Link>
          ))}
        </div>
      )}
    </DrpWrapper>
  );
};

export default LikedList;
