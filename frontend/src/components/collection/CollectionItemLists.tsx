import React from "react";
import { RiMoreFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { convertRuntime, duration } from "../../utils/Duration";
import formatDate from "../../utils/formatDate";
import { imageUrl } from "../../utils/imageUrl";
import { CollectionItem } from "./collection.type";
import CollectionDrpAction from "./CollectionDrpAction";
import LikeButton from "./LikeButton";

export const CollectionContext = React.createContext<any>(null);

type Props = {
  items: CollectionItem[];
  collectionName?: string;
  handleCollection?: (items?: CollectionItem[]) => void;
};

const CollectionItemLists = ({
  items,
  collectionName,
  handleCollection,
}: Props) => {
  const updateItemList = (itemId: string) => {
    const updatedItem = items.filter((item) => item.id !== itemId);
    handleCollection && handleCollection(updatedItem);
  };

  const updateLikedStatus = (itemId: string) => {
    const updatedItem = items.map((el) => {
      if (el.id === itemId) {
        el.is_liked = true;
      }
      return el;
    });
    handleCollection && handleCollection(updatedItem);
  };

  if (items.length <= 0) return null;

  return (
    <CollectionContext.Provider
      value={{
        updateCollection: updateItemList,
        updateLikeStatus: updateLikedStatus,
      }}
    >
      <div className="px-10 sm:px-20 pt-10 relative">
        <div className="flex flex-col gap-20">
          {items.map((el, index) => (
            <div
              className="sm:grid col-8 items-center color-gray font-medium hover-bg-fade rounded-xlg py-10 mx-6 bg-secondary sm:bg-primary px-10"
              title={el.title}
              key={el.id}
            >
              <div className="flex-col sm:flex sm:flex-row items-center gap-20 span-4  overflow-hidden">
                <span className="text-regular font-semibold">{index + 1}</span>
                <img
                  src={imageUrl(el.poster_url)}
                  alt={el.title}
                  className="rounded-lg w-full sm:w-auto h-190 sm:h-100 object-cover sm:object-nofill "
                />
                <div className="flex flex-col gap-10 h-full overflow-hidden">
                  <div className="flex space-between align-center">
                    <span className="text-xsm sm:text-sm capitalize font-semibold">
                      {el.media_type}
                    </span>
                    <div className="flex gap-10 text-lg align-center content-right sm:content-center sm:hidden">
                      <LikeButton
                        color=""
                        duration={el.duration}
                        id={el.id}
                        posterPath={el.poster_url}
                        title={el.title}
                        isLiked={el?.is_liked}
                        media_type={el.media_type}
                        release_date={el.released_date}
                        handleLikeAfter={() => {
                          if (collectionName === "liked") {
                            updateItemList(el.id);
                            return;
                          }
                          return;
                        }}
                      />
                      <span
                        className="drp_more_option flex items-center"
                        data-set={el.id}
                        data-index={index}
                      >
                        <RiMoreFill
                          className="drp_more_option"
                          data-id={el.id}
                          data-index={index}
                        />
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/${el.media_type}/info/${el.id}`}
                    className="color-white text-xsm md:text-sm sm:text-regular font-medium"
                    style={{ paddingRight: 20 }}
                  >
                    {el.title}
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-10 capitalize font-semibold text-sm hidden sm:visible">
                {convertRuntime(el.duration)}
              </div>
              <div className="">{formatDate(el.released_date)}</div>
              <div className="">{duration(el.added_date)}</div>
              <div className="flex items-center content-right gap-10 text-lg text-center">
                <LikeButton
                  duration={el.duration}
                  id={el.id}
                  posterPath={el.poster_url}
                  title={el.title}
                  isLiked={el?.is_liked}
                  media_type={el.media_type}
                  release_date={el.released_date}
                  handleLikeAfter={() => {
                    if (collectionName === "liked") {
                      updateItemList(el.id);
                      return;
                    }
                    return;
                  }}
                />
                <button
                  className="drp_more_option flex color-white border-0 p-8 hover-bg-fade rounded-xxlg"
                  data-set={el.id}
                  data-index={index}
                >
                  <RiMoreFill
                    className="flex"
                    size={20}
                    style={{ pointerEvents: "none" }}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
        <CollectionDrpAction
          items={items}
          drpId="drp_more_option"
          itemName={collectionName}
        />
      </div>
    </CollectionContext.Provider>
  );
};

export default CollectionItemLists;
