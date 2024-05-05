import { useState, useRef, FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DropDown from "../dropdown/DropDown";
import ContextPlaylist from "../contextMenu/ContextPlaylist";
import CollectionType from "./collection.type";
import { RiArrowRightSLine } from "react-icons/ri";

import RemoveFromThis from "../contextMenu/item/RemoveFromThis";
import RemoveFromWatchlist from "../contextMenu/item/RemoveFromWatchlist";
import RemovedFromLiked from "../contextMenu/item/RemovedFromLiked";
import AddToLiked from "../contextMenu/item/AddToLiked";
import useUser from "../../hooks/useUser";
const obj = {
  duration: 0,
  items_name: "",
  added_date: "",
  media_type: "",
  playlist_id: "",
  playlist_items_id: "",
  poster_url: "",
  released_date: null,
  uid: "",
  is_liked: null,
  id: "",
};
const CollectionDrpAction: FC<{
  items: CollectionType[];
  drpId: string;
  itemName?: string;
}> = ({ items, drpId, itemName }) => {
  const user = useUser();
  const [isVisibleContext, setIsVisibleContext] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CollectionType>(obj);
  const contextRef = useRef<HTMLDivElement>(null);
  const drpContainerRef = useRef<any>(null);
  const drpRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.onclick = (eve: any) => {
      if (eve.target!.classList.contains(drpId)) {
        setSelectedItem(items[eve.target.dataset.index]);
        const clientY = eve.screenY;
        const containerHeight = drpRef.current?.clientHeight;
        const screenAvailable = window.screen.availHeight;

        const sum = containerHeight + clientY + 20;
        drpContainerRef.current.style.zIndex = 1;
        if (sum >= screenAvailable) {
          drpContainerRef.current!.style.top = `${
            screenAvailable - containerHeight * 2
          }px`;
          return;
        }
        drpContainerRef.current!.style.top = `${eve.clientY}px`;
      }
      return;
    };
  }, [drpId, items]);

  useEffect(() => {
    return () => {
      setSelectedItem(obj);
    };
  }, []);

  const handleShowCreateItem = (eve: any) => {
    if (isVisibleContext) return;
    if (contextRef.current) {
      contextRef.current.style.removeProperty("top");
      contextRef.current.style.removeProperty("bottom");

      const {
        0: { height, width, y },
      } = contextRef.current.getClientRects();
      // Positioned the contextMenu if it's out of top window to center
      const screenHeight = window.screen.height;
      if (height > eve.clientY) {
        if (height + eve.clientY > screenHeight) {
          contextRef.current.style.bottom = `-${height - 220}px`;
        } else {
          contextRef.current.style.bottom = `-${height - 50}px`;
        }
      } else {
        // If contextMenu is greater than available screen, positioned the contextMenu top of its height
        if (height + y > screenHeight) {
          contextRef.current.style.top = `-${height - 60}px`;
        } else {
          contextRef.current.style.removeProperty("top");
        }
      }

      if (window.matchMedia("(min-width: 768px)").matches) {
        contextRef.current.style.left = `-${width + 10}px`;
      } else {
        contextRef.current.style.left = "5px";
      }
      setIsVisibleContext(true);
    }
  };

  const handleCloseContext = () => setIsVisibleContext(false);

  const handleGotoDetails = () => {
    navigate(
      `/${selectedItem.media_type}/info/${
        selectedItem.playlist_items_id
      }-${selectedItem.items_name.replaceAll(" ", "-")}`,
      { replace: true },
    );
  };

  if (items.length < 0) return null;
  return (
    <div
      className="fixed flex right-0 sm:right-20 px-50 -z-1"
      ref={drpContainerRef}
    >
      <DropDown
        drpId={drpId}
        label=""
        noHide={true}
        handleDrp={() => {
          setIsVisibleContext(false);
          setSelectedItem(obj);
          if (drpContainerRef.current) {
            drpContainerRef.current.style.zIndex = -1;
          }
        }}
        styles="bg-secondary shadow-lg p-6 rounded-lg w-250"
      >
        <ul
          className="flex flex-col color-white text-sm font-medium cursor-default"
          ref={drpRef}
        >
          <li
            className="hover-bg-fade py-10 px-16 rounded-regular"
            onMouseOver={handleCloseContext}
            onClick={handleGotoDetails}
          >
            Go to details
          </li>
          <span className="bg-fade w-full" style={{ height: 1 }}></span>
          {selectedItem.is_liked !== "true" && itemName !== "liked" && (
            <AddToLiked
              title={
                selectedItem.title
                  ? selectedItem.title
                  : selectedItem.items_name
              }
              duration={selectedItem.duration}
              item_key={
                selectedItem.liked_id
                  ? selectedItem.liked_id
                  : selectedItem.item_key
                    ? selectedItem.item_key
                    : selectedItem.playlist_items_id
              }
              media_type={selectedItem.media_type}
              posterPath={selectedItem.poster_url}
              release_date={selectedItem.released_date}
              uid={user?.id!}
              id={selectedItem.id}
              handleMouseOver={handleCloseContext}
            />
          )}
          <li
            className={`over-bg-fade py-10 px-16 rounded-regular relative  hover-bg-fade noEffect`}
            onClick={handleShowCreateItem}
          >
            <span className="flex space-between noEffect">
              <span className="noEffect">Save to your Like Movie/Tv</span>
              <RiArrowRightSLine className="text-medium noEffect" />
            </span>
            <div
              className={`absolute bottom-0 noEffect overflow-hidden ${
                isVisibleContext ? "visible" : "invisible"
              }`}
              ref={contextRef}
            >
              <ContextPlaylist
                duration={selectedItem.duration}
                playlistItemName={
                  selectedItem.title
                    ? selectedItem.title
                    : selectedItem.items_name
                }
                playlistItemId={
                  selectedItem.liked_id
                    ? selectedItem.liked_id
                    : selectedItem.item_key
                      ? selectedItem.item_key
                      : selectedItem.playlist_items_id
                }
                mediaType={selectedItem.media_type === "tv" ? "tv" : "movie"}
                posterURL={selectedItem.poster_url}
                releaseDate={selectedItem.released_date}
                styles={`overflow-y-scroll max-h-400 scrollbar-on-hover ${
                  isVisibleContext ? "z-1" : "-z-1"
                }`}
              />
            </div>
          </li>
          <span className="bg-fade w-full" style={{ height: 1 }}></span>
          {itemName === "watchlist" && (
            <RemoveFromWatchlist
              uid={user?.id!}
              handleMouseOver={handleCloseContext}
              watchlistItemId={
                selectedItem.item_key ? selectedItem.item_key : "no-id"
              }
              id={selectedItem.id}
            />
          )}
          {itemName !== "watchlist" && itemName !== "liked" && (
            <RemoveFromThis
              handleMouseOver={handleCloseContext}
              uid={user?.id!}
              itemId={selectedItem.playlist_items_id}
              playlistId={selectedItem.playlist_id}
              id={selectedItem.id}
            />
          )}
          {(selectedItem.is_liked === "true" || itemName === "liked") && (
            <RemovedFromLiked
              handleMouseOver={handleCloseContext}
              uid={user?.id!}
              liked_id={selectedItem.liked_id ? selectedItem.liked_id : ""}
              id={selectedItem.id}
            />
          )}
        </ul>
      </DropDown>
    </div>
  );
};

export default CollectionDrpAction;
