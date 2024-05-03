import React, { FC, useEffect, useState } from "react";
import { RiMoreFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { convertRuntime, duration } from "../../utils/Duration";
import formatDate from "../../utils/formatDate";
import { imageUrl } from "../../utils/imageUrl";
import CollectionType from "./collection.type";
import CollectionDrpAction from "./CollectionDrpAction";
import CollectionTableHeading from "./CollectionTableHeading";
import LikeButton from "./LikeButton";

export const CollectionContext = React.createContext<any>(null);

const CollectionItemLists: FC<{
  items: CollectionType[];
  collectionName?: string;
  handleCollection?: (items?: any[]) => void;
}> = ({ items, collectionName, handleCollection }) => {
  const [deviceType, setDeviceType] = useState("");

  const updateItemList = (itemId: string) => {
    const updatedItem = items.filter((item) => item.id !== itemId);
    handleCollection && handleCollection(updatedItem);
  };
  useEffect(() => {
    if (window.matchMedia("(min-width: 640px)").matches) {
      setDeviceType("desktop");
    } else {
      setDeviceType("mobile");
    }
  }, []);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 640px)").matches) {
        if (deviceType !== "desktop") {
          setDeviceType("desktop");
        }
      } else {
        if (deviceType !== "mobile") {
          setDeviceType("mobile");
        }
      }
    });
  }, [deviceType]);
  const updateLikedStatus = (itemId: string) => {
    const updatedItem = items.map((el) => {
      if (el.id === itemId) {
        el.is_liked = "true";
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
      <div className="px-10 sm:px-20 md:px-30 lg:px-50 pt-50 relative">
        <div className="flex flex-col gap-20">
          <div className="sm:visible hidden">
            <CollectionTableHeading />
          </div>
          {deviceType === "desktop" &&
            items.map((el, index) => (
              <div
                className="sm:grid col-8 items-center color-gray font-medium hover-bg-fade rounded-xlg py-10 mx-6 overflow-hidden bg-secondary sm:bg-primary px-6"
                title={el.items_name}
                key={
                  el.playlist_items_id
                    ? el.playlist_items_id
                    : el.item_key
                    ? el.item_key
                    : el.liked_id
                }
              >
                <div className="flex-col sm:flex sm:flex-row items-center gap-20 span-4  overflow-hidden">
                  <span className="text-regular font-semibold">
                    {index + 1}
                  </span>
                  <img
                    src={imageUrl(el.poster_url)}
                    alt={el.items_name}
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
                          id={
                            el.liked_id
                              ? el.liked_id
                              : el.item_key
                              ? el.item_key
                              : el.playlist_items_id
                          }
                          posterPath={el.poster_url}
                          title={el.title ? el.title : el.items_name}
                          isLiked={
                            el.liked_id
                              ? true
                              : el.is_liked === "true"
                              ? true
                              : false
                          }
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
                          data-set={el.playlist_items_id}
                          data-index={index}
                        >
                          <RiMoreFill
                            className="drp_more_option"
                            data-id={el.playlist_items_id}
                            data-index={index}
                          />
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/${el.media_type}/info/${
                        el.playlist_items_id
                          ? el.playlist_items_id
                          : el.liked_id
                      }-${
                        el.items_name
                          ? el.items_name.replaceAll(" ", "-")
                          : el.title?.replaceAll(" ", "-")
                      }`}
                      className="color-white text-xsm md:text-sm sm:text-regular font-medium"
                      style={{ paddingRight: 20 }}
                    >
                      {el.items_name ? el.items_name : el.title}
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-10 capitalize font-semibold text-sm hidden sm:visible">
                  {convertRuntime(el.duration)}
                </div>
                <div className="">{formatDate(el.released_date)}</div>
                <div className="">
                  {el.liked_date
                    ? duration(el.liked_date)
                    : duration(el.added_date)}
                </div>
                <div className="gap-10 text-lg text-center">
                  <LikeButton
                    color=""
                    duration={el.duration}
                    id={
                      el.liked_id
                        ? el.liked_id
                        : el.item_key
                        ? el.item_key
                        : el.playlist_items_id
                    }
                    posterPath={el.poster_url}
                    title={el.title ? el.title : el.items_name}
                    isLiked={
                      el.liked_id ? true : el.is_liked === "true" ? true : false
                    }
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
                    className="drp_more_option items-center mx-10"
                    data-set={el.playlist_items_id}
                    data-index={index}
                  >
                    <RiMoreFill
                      className="drp_more_option"
                      data-id={el.playlist_items_id}
                      data-index={index}
                    />
                  </span>
                </div>
              </div>
            ))}
        </div>
        <div className="mobile grid col-2 overflow-hidden">
          {deviceType === "mobile" &&
            items.map((item, index) => (
              <div
                className="relative my-10 xsm:px-6 smm:px-10  overflow-hidden"
                key={
                  item.playlist_items_id
                    ? item.playlist_items_id
                    : item.item_key
                    ? item.item_key
                    : item.liked_id
                }
              >
                <div
                  className="rounded-xlg overflow-hidden flex flex-col"
                  style={{ background: "#4B3C6A", paddingBottom: 10 }}
                >
                  <img
                    src={imageUrl(item.poster_url)}
                    alt={item.title}
                    className="xsm:h-150 ssm:h-190 sml:h-220 h-full object-cover"
                  />
                  <div className="flex flex-col px-10 relative z-1">
                    <span
                      className="truncate text-center font-semibold text-regular color-white z-2"
                      style={{ marginTop: -20 }}
                    >
                      {item.title}
                    </span>
                    <div className="flex gap-6 content-center capitalize text-xsm font-semibold color-gray my-6 z-2">
                      {formatDate(item.released_date)}
                    </div>
                    <span
                      className="absolute top-0 left-0 w-full z-0"
                      style={{
                        boxShadow: "0px -20px 23px 20px #4b3c6a",
                        height: 60,
                      }}
                    ></span>
                    <div className="flex align-center space-between color-gray z-2">
                      <span className="font-bold text-xsm px-6">
                        {convertRuntime(item.duration)}
                      </span>
                      <div className="gap-10 text-lg text-center">
                        <LikeButton
                          color=""
                          duration={item.duration}
                          id={
                            item.liked_id
                              ? item.liked_id
                              : item.item_key
                              ? item.item_key
                              : item.playlist_items_id
                          }
                          posterPath={item.poster_url}
                          title={item.title ? item.title : item.items_name}
                          isLiked={
                            item.liked_id
                              ? true
                              : item.is_liked === "true"
                              ? true
                              : false
                          }
                          media_type={item.media_type}
                          release_date={item.released_date}
                          handleLikeAfter={() => {
                            if (collectionName === "liked") {
                              updateItemList(item.id);
                              return;
                            }
                            return;
                          }}
                        />
                        <span
                          className="drp_more_option items-center mx-10 text-medium"
                          data-set={item.playlist_items_id}
                          data-index={index}
                        >
                          <RiMoreFill
                            className="drp_more_option"
                            data-id={item.playlist_items_id}
                            data-index={index}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
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
