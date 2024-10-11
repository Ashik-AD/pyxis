import fld from "../db/fieldLists.js";
import { WatchList } from "../db/mongooseModels.js";
import validateQueryParam from "../utils/validateQueryParam.js";
import { invalidQueryParamException } from "./errors/handleErr.js";
import generateId from "../utils/generateId.js";

class HandleWatchList {
  async all(uid) {
    if (!validateQueryParam(uid)) {
      throw invalidQueryParamException(null, `user id: ${uid}`);
    }
    const res = await WatchList.find({ [fld.uid]: uid }).sort({
      [fld.addedDate]: "descending",
    });
    return res;
  }
  async withLimit({ uid, limit }) {
    if (!validateQueryParam(uid) || !validateQueryParam(limit)) {
      throw invalidQueryParamException(null, `${uid} and ${limit}`);
    }
    const res = await WatchList.find({ [fld.uid]: uid })
      .sort({ [fld.addedDate]: "descending" })
      .limit(limit);

    return res;
  }

  async add({
    uid,
    item_key,
    title,
    average_vote,
    media_type,
    poster_path,
    duration,
    is_liked,
    released_date,
  }) {
    if (!validateQueryParam(item_key) || !validateQueryParam(uid)) {
      throw invalidQueryParamException();
    }
    try {
      const isItemAlreadyExist = await this.#find({ uid, item_key });
      if (isItemAlreadyExist) {
        return `${title} is already in your watch list`;
      }
      // Generate ID for the item
      const id = generateId();
      await WatchList.create({
        _id: id,
        [fld.itemKey]: item_key,
        [fld.uid]: uid,
        [fld.title]: title,
        [fld.avg_vote]: average_vote,
        [fld.mediaType]: media_type,
        [fld.posterURL]: poster_path,
        [fld.duration]: duration,
        [fld.isLiked]: is_liked,
        [fld.releasedDate]: released_date,
        [fld.addedDate]: new Date(),
      });
      return true;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async remove({ uid, item_key }) {
    if (!validateQueryParam(uid) || !validateQueryParam(item_key)) {
      throw invalidQueryParamException(null, `${uid} ${item_key}`);
    }
    const res = await WatchList.deleteOne({
      [fld.uid]: uid,
      [fld.itemKey]: item_key,
    });

    return res;
  }

  async #find({ uid, item_key }) {
    if (!validateQueryParam(uid) || !validateQueryParam(item_key)) {
      throw invalidQueryParamException(null, `${uid} and ${item_key}`);
    }
    const res = await WatchList.findOne({
      [fld.uid]: uid,
      [fld.itemKey]: item_key,
    });
    return res;
  }

  async count(uid) {
    if (!validateQueryParam(uid)) {
      throw invalidQueryParamException(null, uid);
    }

    const count = await WatchList.count({ [fld.uid]: uid });
    return count;
  }
}
const watchList = new HandleWatchList();
export default watchList;
