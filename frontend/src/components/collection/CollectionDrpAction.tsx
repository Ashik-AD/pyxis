import { useState, useRef, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import ContextPlaylist from "../contextMenu/ContextPlaylist";
import { CollectionItem } from "./collection.type";
import { RiArrowRightSLine } from "react-icons/ri";

import RemoveFromThis from "../contextMenu/item/RemoveFromThis";
import RemoveFromWatchlist from "../contextMenu/item/RemoveFromWatchlist";
import RemovedFromLiked from "../contextMenu/item/RemovedFromLiked";
import AddToLiked from "../contextMenu/item/AddToLiked";
import useUser from "../../hooks/useUser";

import styles from "./styles.module.scss";

type Props = {
  items: CollectionItem[];
  drpId: string;
  itemName?: string;
};

const CollectionDrpAction = ({ items, drpId, itemName }: Props) => {
  const user = useUser();
  const [isCtxMenuVisible, setisCtxMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CollectionItem | null>(null);
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
      setSelectedItem(null);
    };
  }, []);

  const handleGotoDetails = () => {
    navigate(`/${selectedItem?.media_type}/info/${selectedItem?.id}`);
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
        {selectedItem && !selectedItem.is_liked ? (
          <AddToLiked
            title={selectedItem?.title}
            duration={selectedItem.duration}
            item_key={selectedItem?.id}
            media_type={selectedItem.media_type}
            posterPath={selectedItem.poster_url}
            release_date={selectedItem.released_date}
            uid={user?.id!}
            id={selectedItem.id}
          />
        ) : (
          <RemovedFromLiked
            uid={user?.id!}
            liked_id={selectedItem?.id || ""}
            id={selectedItem?.id!}
          />
        )}
        <Submenu
          label={
            <li
              className={`over-bg-fade py-10 px-16 rounded-regular relative  hover-bg-fade noEffect`}
              tabIndex={0}
            >
              <span className="flex space-between noEffect">
                <span className="noEffect">More Collections</span>
                <RiArrowRightSLine className="text-medium noEffect" />
              </span>
            </li>
          }
        >
          <ContextPlaylist
            id={selectedItem?.id!}
            playlist_id={selectedItem?.playlist_id!}
            title={selectedItem?.title!}
            posterURL={selectedItem?.poster_url!}
            mediaType={selectedItem?.media_type!}
            duration={selectedItem?.duration!}
            releaseDate={selectedItem?.released_date!}
            styles={`overflow-y-scroll max-h-400 scrollbar-on-hover`}
          />
        </Submenu>
        {itemName === "watchlist" && (
          <RemoveFromWatchlist
            uid={user?.id!}
            watchlistItemId={selectedItem?.id!}
            id={selectedItem?.id!}
          />
        )}
        <RemoveFromThis
          uid={user?.id!}
          itemId={selectedItem?.id!}
          playlistId={selectedItem?.playlist_id!}
          id={selectedItem?.id!}
        />
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
