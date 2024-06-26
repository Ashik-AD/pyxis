import { mongoose } from "../config/database.config.js";
import { user, liked, playlistItems, playlistsList, watchList } from "./Schema.js";

mongoose.set("strictQuery", true)
export const Users = mongoose.model("users", user);
export const Liked = mongoose.model('liked', liked);
export const PlaylistsList = mongoose.model('playlists_lists', playlistsList);
export const PlayListItems = mongoose.model('playlist_items', playlistItems);
export const WatchList = mongoose.model('watch_list', watchList);
