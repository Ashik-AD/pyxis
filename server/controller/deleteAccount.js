import mongoose from "mongoose";
import {Users, Liked, PlayListItems, PlaylistsList, WatchList} from '../db/mongooseModels.js';
const isSuccess = ({deletedCount, acknowledged}) => deletedCount >= 0 && acknowledged;

export default async function deleteAccount(uid, cb) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
// TODO: wrap all the async opa into the single promise.all
// if failed rollback all db ops
        const delLike = await Liked.deleteMany({uid}, {session});
        const delWatchlist = await WatchList.deleteMany({uid}, {session});
        const delPlaylistItem = await PlayListItems.deleteMany({uid}, {session});
        const delPlaylistLists = await PlaylistsList.deleteMany({uid}, {session});
        const delUser = await Users.deleteOne({uid}, {session});

        if(isSuccess(delLike) && isSuccess(delPlaylistItem) && isSuccess(delWatchlist) && isSuccess(delPlaylistLists) && delUser.deletedCount === 1 && delUser.acknowledged){
            await session.commitTransaction();
            cb("Account deletion successful");
        }       
        else {
            throw "Can't delete account. Please try again later :(";
        }
        
    } catch (error) {
        await session.abortTransaction();
        console.log(error)
        cb(null, error)
        throw error;
    }
    finally {
        session.endSession();
    }
}