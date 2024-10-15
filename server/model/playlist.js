import validateQueryParam from "../utils/validateQueryParam.js";
import { invalidQueryParamException } from "./errors/handleErr.js";
import fld from "../db/fieldLists.js";

import {
  PlaylistsList,
  PlayListItems,
  WatchList,
  Liked,
} from "../db/mongooseModels.js";
import fieldLists from "../db/fieldLists.js";

class HandlePlaylist {
  // Fetch all playlist
  all = async (uid) => {
    if (!validateQueryParam(uid)) {
      throw invalidQueryParamException(null, uid);
    }
    const res = await PlaylistsList.find({ [fld.uid]: uid });
    return res;
  };

  // Add | create new playlist
  create = async ({ playlistId, uid, playlistName, description }) => {
    if (!validateQueryParam(playlistId) || !validateQueryParam(uid)) {
      throw invalidQueryParamException(null, `${uid} ${playlistId}`);
    }
    const res = await PlaylistsList.create({
      [fld.playlistId]: playlistId,
      [fld.uid]: uid,
      [fld.playlistName]: playlistName,
      [fld.description]: description || "",
      [fld.totalItems]: 0,
      [fld.createdDate]: new Date(),
    });

    return res;
  };

  // Update playlist
  /**
   * @param {uid, playlistId, newPlaylist}
   * this method is used for rename the playlist
   * */
  updatePlaylist = async ({ uid, playlistId, newPlaylist }) => {
    if (!newPlaylist) {
      return;
    }
    const res = await PlaylistsList.updateOne(
      { [fld.uid]: uid, [fld.playlistId]: playlistId },
      {
        [fld.playlistName]: newPlaylist.title,
        [fld.description]: newPlaylist.description,
      },
    );
    return res;
  };

  // Remove playlist with playlistId and uid
  remove = async ({ uid, playlistId }) => {
    if (!validateQueryParam(uid) || !validateQueryParam(playlistId)) {
      throw invalidQueryParamException();
    }
    return Promise.all([
      await PlayListItems.deleteOne({
        [fld.playlistId]: playlistId,
        [fld.uid]: uid,
      }),
      await PlaylistsList.deleteOne({
        [fld.uid]: uid,
        [fld.playlistId]: playlistId,
      }),
    ]);
  };

  allItems = async ({ uid, playlist_id }) => {
    if (!validateQueryParam(uid) || !validateQueryParam(playlist_id)) {
      throw invalidQueryParamException();
    }
    const res = await PlayListItems.find({
      [fld.uid]: uid,
      [fld.playlistId]: playlist_id,
    }).sort({ [fld.addedDate]: "descending" });
    return res;
  };

  addItem = async ({
    id,
    playlistId,
    uid,
    title,
    mediaType,
    duration,
    releaseDate,
    posterURL,
  }) => {
    if (
      !validateQueryParam(id) ||
      !validateQueryParam(playlistId) ||
      !validateQueryParam(uid)
    ) {
      throw invalidQueryParamException();
    }
    const findItem = await this.#findItem({
      playlistId,
      itemId: id,
    });
    if (findItem?.collection?.length > 0) {
      throw new Error(`This item is already exist`);
    }
    const res = await PlayListItems.create({
      [fld.uid]: uid,
      id,
      [fld.playlistId]: playlistId,
      [fld.title]: title,
      [fld.mediaType]: mediaType,
      [fld.posterURL]: posterURL,
      [fld.duration]: duration,
      [fld.releasedDate]: releaseDate,
      [fld.isLiked]: false,
      [fld.addedDate]: new Date(),
    });

    if (res) {
      let [totalCount, like] = await Promise.all([
        await this.#getTotalItemFromPlaylist({
          uid,
          playlistId,
        }),
        await Liked.findOne({
          [fieldLists.likedId]: id,
        }),
      ]);
      totalCount += 1;
      await Promise.all([
        await this.#updateTotalCount({
          uid,
          playlistId,
          value: totalCount,
        }),
        await this.addRemovePlaylistLikedItems({
          uid,
          itemId: id,
          isLiked: like ? true : false,
        }),
      ]);
      return totalCount;
    }
    throw new Error(`Can't add item to playlist`);
  };

  removeItem = async ({ uid, playlistId, itemsId }) => {
    if (
      !validateQueryParam(uid) ||
      !validateQueryParam(playlistId) ||
      !validateQueryParam(itemsId)
    ) {
      throw invalidQueryParamException();
    }
    const res = await PlayListItems.deleteOne({
      [fld.id]: itemsId,
    });
    if (res) {
      const totalCount = await this.#getTotalItemFromPlaylist({
        playlistId,
        uid,
      });
      await this.#updateTotalCount({
        uid,
        playlistId,
        value: totalCount - 1,
      });
      return { total_items: totalCount - 1 };
    }
  };

  removeAllItem = async ({ uid, playlist_id }) => {
    if (!validateQueryParam(uid) || !validateQueryParam(playlist_id)) {
      throw invalidQueryParamException();
    }
    try {
      const res = await PlayListItems.deleteMany({
        [fld.uid]: uid,
        [fld.playlistId]: playlist_id,
      });

      await this.#updateTotalCount({ uid, playlistId: playlist_id, value: 0 });
      if (res) {
        return true;
      }
      return false;
    } catch (error) {
      console.log("This error from Playlist > removeAllItem()");
      console.log(error);
      return false;
    }
  };

  addRemovePlaylistLikedItems = async ({ uid, itemId, isLiked }) => {
    if (isLiked === null) {
      throw new Error("Something went wrong");
    }
    if (!uid || !itemId) {
      throw new Error("User information is missing");
    }

    if (!validateQueryParam(uid) || !validateQueryParam(itemId)) {
      throw invalidQueryParamException();
    }
    const res = await Promise.all([
      await PlayListItems.updateOne(
        { [fld.uid]: uid, [fld.id]: itemId },
        { [fld.isLiked]: isLiked },
      ),
      await WatchList.updateOne(
        { [fld.uid]: uid, [fld.itemKey]: itemId },
        { [fld.isLiked]: isLiked },
      ),
    ]);

    return res;
  };

  #findItem = async ({ playlistId, itemId }) => {
    if (!validateQueryParam(playlistId) || !validateQueryParam(itemId)) {
      throw invalidQueryParamException();
    }
    const res = await PlayListItems.findOne({
      [fld.id]: itemId,
      [fld.playlistId]: playlistId,
    });
    return res;
  };

  #updateTotalCount = async ({ uid, playlistId, value }) => {
    const res = await PlaylistsList.updateOne(
      { [fld.uid]: uid, [fld.playlistId]: playlistId },
      { [fld.totalItems]: value },
    );
    return res.modifiedCount;
  };

  #getTotalItemFromPlaylist = async ({ uid, playlistId }) => {
    const res = await PlaylistsList.findOne({
      [fld.uid]: uid,
      [fld.playlistId]: playlistId,
    });
    return res?.total_items || 0;
  };
}

const playlist = new HandlePlaylist();
export default playlist;
