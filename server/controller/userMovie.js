import fieldLists from "../db/fieldLists.js";
import User from "../model/user.js";
import generateId from "../utils/generateId.js";

export const createPlaylist = async (req, res) => {
  const uid = req.params.uid;
  const { playlistName, description } = req.body.data;
  try {
    const playlistId = generateId();
    await User.playlist.create({
      playlistId,
      uid,
      playlistName,
      description,
    });
    res.status(201).send({
      msg: "One playlist created",
      playlist: {
        playlist_id: playlistId,
        uid,
        playlist_name: playlistName,
        description,
        total_item: 0,
        create_date: new Date(),
      },
    });
  } catch (err) {
    console.log(err);
    res.status(421).send("Something went wrong");
  }
};

export const getPlaylist = async (req, res, next) => {
  const uid = req.params.uid;
  try {
    const playlists = await User.playlist.all(uid);
    res.send(playlists);
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
};

export const renamePlaylist = async (req, res, next) => {
  try {
    const uid = req.params.uid;
    const { playlist_id, title, description } = req.body.data;
    const renamePlaylist = await User.playlist.updatePlaylist({
      uid,
      playlistId: playlist_id,
      newPlaylist: { title, description },
    });
    if (renamePlaylist) {
      res.status(200).send(`${uid} id's playlist successfully renamed`);
    } else {
      res.status(206).send(`Can't update playlist`);
    }
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
};

export const removePlaylist = async (req, res, next) => {
  const { uid, collection_id } = req.params;
  try {
    await User.playlist.remove({
      uid,
      playlistId: collection_id,
    });
    res.send(`${uid} playlist successfully removed`);
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
};

export const addPlaylistItem = async (req, res, next) => {
  const uid = req.params.uid;
  try {
    const { data } = req.body;
    let totalItemCount = await User.playlist.addItem({ ...data, uid });
    res.status(200).send({
      message: "item added successfully",
      totalItems: totalItemCount,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
    console.log(err);
  }
};

export const getPlaylistItems = async (req, res, next) => {
  const { uid, playlist_id } = req.params;
  try {
    const items = await User.playlist.allItems({ uid, playlist_id });
    res.send(items);
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
};

export const removePlaylistItem = async (req, res, next) => {
  const { uid } = req.params;
  try {
    const data = req.body;
    const remove = await User.playlist.removeItem({
      uid,
      ...data,
    });
    if (remove) {
      res.status(201).send("Successful!");
      return;
    }
    res.send("Nothing found");
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
};

export const removePlaylistItemAll = async (req, res, next) => {
  const { uid, collection_id } = req.params;
  try {
    const remove = await User.playlist.removeAllItem({
      uid,
      playlist_id: collection_id,
    });
    if (remove) {
      res.status(200).send("Your all collected movie and tv show is deleted");
    } else {
      res.status(206).send("Your collection is empty.");
    }
  } catch (error) {
    res.status(401).send("Something went wrong");
    console.log(error);
  }
};

export const getLiked = async (req, res, next) => {
  try {
    const uid = req.params.uid;
    const likedItems = await User.liked.all(uid);
    res.send(likedItems);
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
};

export const getLikedWithLimit = async (req, res, next) => {
  try {
    const { uid, liked_id, limit } = req.params;
    const likedItems = await User.liked.allWithLimit({ uid, liked_id, limit });
    res.send(likedItems);
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong");
  }
};

export const addLike = async (req, res, next) => {
  try {
    const uid = req.params.uid;
    const {
      data: { title, poster_url, duration, liked_id, release_date, media_type },
    } = req.body;
    const addItem = await User.liked.add({
      id: generateId(),
      uid,
      likedId: liked_id,
      posterURL: poster_url,
      duration: duration,
      title: title,
      releaseDate: release_date,
      mediaType: media_type,
    });
    await User.playlist.addRemovePlaylistLikedItems({
      uid,
      itemId: liked_id,
      isLiked: true,
    });
    res
      .status(201)
      .send({ message: `"${title}" is successfully added`, result: addItem });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: err,
    });
  }
};

export const removeLike = async (req, res, next) => {
  try {
    const { likedId } = req.body.data;
    const uid = req.params.uid;
    let isDeleted = await User.liked.remove({
      uid,
      likedId,
    });
    if (!isDeleted) {
      return res.status(404).send({ message: `Item not found` });
    }
    await User.playlist.addRemovePlaylistLikedItems({
      uid,
      itemId: likedId,
      isLiked: false,
    });
    res.status(201).send("Removed from your like");
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
};

export const searchLiked = async (req, res, next) => {
  try {
    const { uid, item_id } = req.body.data;
    const search = await User.liked.find({ uid, likedId: item_id });
    res.send({ isLiked: search.length > 0 ? true : false });
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
};

// Watch list
export const addWatchList = async (req, res, next) => {
  const { uid } = req.params;
  const { data } = req.body;
  try {
    const isLiked = await User.liked.find({ uid, likedId: data.item_key });
    data[fieldLists.isLiked] = isLiked?.length > 0 ? true : false;
    const addItem = await User.watchList.add({ ...data, uid });
    if (typeof addItem === "boolean") {
      res.status(201).send(`${data.title} is added to your watchlist`);
      return;
    }
    res.send(addItem);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};

export const getWatchList = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const watchLists = await User.watchList.all(uid);
    res.send(watchLists);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Something went wrong", err: error });
  }
};

export const getWatchListLimit = async (req, res, next) => {
  try {
    const { uid, limit } = req.params;
    const ls = await User.watchList.withLimit({ uid, limit });
    res.send(ls);
  } catch (error) {
    res.status(400).send("Something went wrong");
    console.log(error);
  }
};

export const removeWatchList = async (req, res, next) => {
  try {
    const { uid, item_id } = req.params;
    const result = await User.watchList.remove({ uid, item_key: item_id }); // return affected row count
    if (result.deletedCount == 1) {
      res.status(200).send("Successful");
      return;
    }
    res.status(404).send({ message: "Item not found" });
  } catch (error) {
    res.status(400).send("Something went wrong");
    console.log(error);
  }
};

export const countItems = async (req, res, next) => {
  try {
    const { uid, table } = req.params;
    let cnt;
    if (table === "liked") {
      cnt = await User.liked.count(uid);
      res.status(200).send(`${cnt}`);
      return;
    } else if (table === "watchlist") {
      cnt = await User.watchList.count(uid);
      res.send(`${cnt}`);
      return;
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
    console.log(error);
  }
};
