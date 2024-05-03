import { useContext } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { StoreContext } from "../../../store/Store";
import { imageUrlWithSize } from "../../../utils/imageUrl";
import { noImage } from "../../../utils/noImage";
import Spinner from "../../loading/Spinner";
import DrpWrapper from "./DrpWrapper";

const WatchLists = () => {
  const {
    store: { user },
  } = useContext(StoreContext);
  const { data, loading } = useFetch(`${user.id}/watch-list/${6}`);

  return (
    <DrpWrapper title="My watch lists" link="/watch-list">
      {loading ? (
        <Spinner styles="h-400" />
      ) : (
        <div className="fade-in overflow-hidden">
          {data.map((lk: any) => (
            <Link
              to={`/${lk.media_type}/info/${lk.item_key}-${lk.title.replaceAll(
                " ",
                "-"
              )}`}
              key={lk.id}
              className="flex items-center color-gray gap-10 my-10 hover-bg-fade rounded-regular"
            >
              <img
                src={
                  lk.poster_url
                    ? imageUrlWithSize(lk.poster_url, "92")
                    : noImage.default
                }
                alt={lk.title}
                className="w-20 rounded-lg"
                style={{ height: 70 }}
              />
              <div className="w-full flex flex-col gap-10">
                <span className="text-sm font-medium truncate">{lk.title}</span>
                {lk.average_vote > 0 && (
                  <div
                    className="rounded-lg w-50 bg-fade"
                    style={{ height: 2 }}
                  >
                    <div
                      className="h-full rounded-lg"
                      style={{
                        width: `${lk.average_vote * 10}%`,
                        background:
                          "linear-gradient(61deg, rgba(248,229,250,0.8253676470588236) 0%, rgba(194,111,255,1) 73%)",
                      }}
                    ></div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </DrpWrapper>
  );
};

export default WatchLists;
