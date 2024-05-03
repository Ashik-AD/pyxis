import fld from '../db/fieldLists.js';
import {Liked} from '../db/mongooseModels.js';
import validateQueryParam from '../utils/validateQueryParam.js';
import { invalidQueryParamException } from './errors/handleErr.js';

class HandleLiked {
  
  all = async (uid) => {
    if (!validateQueryParam(uid)) {
      throw invalidQueryParamException();
    }
    const res = await Liked.find({[fld.uid]: uid}).sort({[fld.likedDate]: "descending"});
    return res;
  };

  async allWithLimit({ uid, limit }) {
    if (!validateQueryParam(uid) || !validateQueryParam(limit)) {
      throw invalidQueryParamException();
    }
    const res = await Liked.find({[fld.uid]: uid}, `id ${fld.likedId} ${fld.title} ${fld.mediaType} ${fld.posterURL}`).sort({[fld.likedDate]: "ascending"}).limit(limit)
    
    return res;
  }

  add = async (payload) => {
    const {
      id,
      uid,
      likedId,
      title,
      posterURL,
      duration,
      releaseDate,
      mediaType,
    } = payload;
    if (
      !id ||
      !uid ||
      !likedId ||
      !title ||
      !posterURL ||
      !duration ||
      !releaseDate ||
      !mediaType
    ) {
      throw 'Some information is missing';
    }
    const isAlreadyLiked = await this.find({ uid, likedId });
    if (isAlreadyLiked.length >  0) {
      throw `${title} is already you liked`;
    }
    const res = await Liked.create({...payload, _id: id, [fld.isLiked]: true, [fld.likedId]: likedId,  [fld.releasedDate]: releaseDate, [fld.posterURL]: posterURL, [fld.mediaType]: mediaType, [fld.likedDate]: new Date()})
    return res;
  };

  remove = async ({ uid, likedId }) => {
    if (!validateQueryParam(uid) || !validateQueryParam(likedId)) {
      throw invalidQueryParamException();
    }
    const res = await Liked.deleteOne({[fld.uid]: uid, [fld.likedId]: likedId});
    return res;
  };

  find = async ({ uid, likedId }) => {
    if (!validateQueryParam(uid) || !validateQueryParam(likedId)) {
      throw invalidQueryParamException();
    }
    const res = await Liked.find({[fld.uid]: uid, [fld.likedId]: likedId});
    return res;
  };

  count = async (uid) => {
    if (!validateQueryParam(uid)) {
      throw invalidQueryParamException(null, uid);
    }
    const res = await Liked.count({[fld.uid]: uid})
    return res;
  };
}

const like = new HandleLiked();
export default like;
