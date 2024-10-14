import { useState, useRef, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import ContextPlaylist from "../contextMenu/ContextPlaylist";
import CollectionType from "./collection.type";
import { RiArrowRightSLine } from "react-icons/ri";

import RemoveFromThis from "../contextMenu/item/RemoveFromThis";
import RemoveFromWatchlist from "../contextMenu/item/RemoveFromWatchlist";
import RemovedFromLiked from "../contextMenu/item/RemovedFromLiked";
import AddToLiked from "../contextMenu/item/AddToLiked";
import useUser from "../../hooks/useUser";

import styles from "./styles.module.scss";

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

type Props = {
  items: CollectionType[];
  drpId: string;
  itemName?: string;
};

const CollectionDrpAction = ({ items, drpId, itemName }: Props) => {
  const user = useUser();
  const [isCtxMenuVisible, setisCtxMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CollectionType>(obj);
  const drpContainerRef = useRef<HTMLDivElement | null>(null);
  const drpRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleShowMenu(eve: any) {
      if (eve.target?.classList?.contains(drpId) && drpContainerRef.current) {
        eve.stopImmediatePropagation();
        const clientY = eve.screenY;
        const clientX = eve.screenX;
        const containerHeight = drpRef.current?.clientHeight;
        const windowHeight = window.screen.availHeight;
        const yPos = containerHeight + clientY + 20;

        if (yPos >= windowHeight) {
          drpContainerRef.current.style.top = `${windowHeight - containerHeight * 2}px`;
        } else {
          drpContainerRef.current.style.top = `${eve.clientY + 20}px`;
        }
        drpContainerRef.current.style.left = `${clientX - drpContainerRef.current.clientWidth}px`;

        setSelectedItem(items[eve.target.dataset.index]);
        setisCtxMenuVisible((prev) => !prev);

        window.addEventListener("click", () => {
          setisCtxMenuVisible(false);
        });
      }
    }
    window.addEventListener("click", handleShowMenu);
    return () => {
      window.removeEventListener("click", handleShowMenu);
    };
  }, [items]);

  useEffect(() => {
    return () => {
      setSelectedItem(obj);
    };
  }, []);

  const handleGotoDetails = () => {
    navigate(
      `/${selectedItem.media_type}/info/${
        selectedItem.playlist_items_id
      }-${selectedItem.items_name.replaceAll(" ", "-")}`,
    );
  };

  if (items.length < 0) return null;
  return (
    <div
      className={`fixed bg-secondary sm:right-20 p-8 rounded-lg ${isCtxMenuVisible ? "visibility-visible" : "-z-1 visibility-hidden"} `}
      ref={drpContainerRef}
      tabIndex={0}
    >
      <ul
        className="flex flex-col color-white text-sm font-medium cursor-default"
        ref={drpRef}
        tabIndex={0}
      >
        <li
          className="hover-bg-fade py-10 px-16 rounded-regular"
          onClick={handleGotoDetails}
        >
          Go to details
        </li>
        {selectedItem.is_liked !== "true" && itemName !== "liked" && (
          <AddToLiked
            title={
              selectedItem.title ? selectedItem.title : selectedItem.items_name
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
          />
        )}
        <Submenu
          label={
            <li
              className={`over-bg-fade py-10 px-16 rounded-regular relative  hover-bg-fade noEffect`}
              tabIndex={0}
            >
              <span className="flex space-between noEffect">
                <span className="noEffect">Save to your Like Movie/Tv</span>
                <RiArrowRightSLine className="text-medium noEffect" />
              </span>
            </li>
          }
        >
          <ContextPlaylist
            duration={selectedItem.duration}
            playlistItemName={
              selectedItem.title ? selectedItem.title : selectedItem.items_name
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
            styles={`overflow-y-scroll max-h-400 scrollbar-on-hover`}
          />
        </Submenu>
        {itemName === "watchlist" && (
          <RemoveFromWatchlist
            uid={user?.id!}
            watchlistItemId={
              selectedItem.item_key ? selectedItem.item_key : "no-id"
            }
            id={selectedItem.id}
          />
        )}
        {itemName !== "watchlist" && itemName !== "liked" && (
          <RemoveFromThis
            uid={user?.id!}
            itemId={selectedItem.playlist_items_id}
            playlistId={selectedItem.playlist_id}
            id={selectedItem.id}
          />
        )}
        {(selectedItem.is_liked === "true" || itemName === "liked") && (
          <RemovedFromLiked
            uid={user?.id!}
            liked_id={selectedItem.liked_id ? selectedItem.liked_id : ""}
            id={selectedItem.id}
          />
        )}
      </ul>
    </div>
  );
};

export default CollectionDrpAction;

function Submenu({
  children,
  label,
}: {
  children?: ReactNode;
  label: ReactNode | string | number;
}) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const calcItemPosition = () => {
    if (menuRef.current) {
      let width = menuRef.current.clientWidth;

      if (window.matchMedia("(min-width: 768px)").matches) {
        menuRef.current.style.left = `-${width}px`;
      } else {
        menuRef.current.style.left = "5px";
      }
    }
  };

  return (
    <div
      tabIndex={1}
      className={`${styles.dropdown__action} relative`}
      onMouseOver={calcItemPosition}
    >
      <span tabIndex={0}>{label}</span>
      <div
        className={`${styles.dropdown__action__container} absolute -top-10`}
        tabIndex={0}
        ref={menuRef}
      >
        {children}
      </div>
    </div>
  );
}
