import { Schema } from "mongoose";
import fld from "./fieldLists.js";

export const user = new Schema({
    [fld.uid]: String,
    [fld.userName]: String,
    [fld.email]: String,
    [fld.password]: String,
    [fld.dob]: Date,
    [fld.country]: String,
    [fld.liked]: String,
    [fld.watchList]: String,
    [fld.playlists]: String,
    [fld.joinedDate]: Date
})

export const liked = new Schema({
    _id: String,
    [fld.likedId]: String,
    [fld.uid]: String,
    [fld.title]: String,
    [fld.posterURL]: String,
    [fld.duration]: Number,
    [fld.releasedDate]: String,
    [fld.mediaType]: String,
    [fld.likedDate]: Date,
})

export const playlistsList = new Schema({
    [fld.playlistId]: String,
    [fld.uid]: String,
    [fld.playlistName]: String,
    [fld.description]: String,
    [fld.totalItems]: Number,
    [fld.createdDate]: Date
})

export const playlistItems = new Schema({
    _id: String,
    [fld.playlistItemsId]: String,
    [fld.playlistId]: String,
    [fld.uid]: String,
    [fld.playlistItemName]: String,
    [fld.mediaType]: String,
    [fld.posterURL]: String,
    [fld.duration]: Number,
    [fld.isLiked]: Boolean,
    [fld.releasedDate]: String,
    [fld.addedDate]: Date
})

export const watchList = new Schema({
    _id: String,
    [fld.itemKey]: Number,
    [fld.uid]: String,
    [fld.title]: String,
    [fld.avg_vote]: Number,
    [fld.mediaType]: String,
    [fld.posterURL]: String,
    [fld.duration]: Number,
    [fld.isLiked]: Boolean,
    [fld.releasedDate]: String,
    [fld.addedDate]: Date
})