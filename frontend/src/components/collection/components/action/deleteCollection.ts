import { ax } from "../../../../config/default";
export const deleteCollection = async (uid: string, collection_id:string) : Promise<{status: number, data: {}}> => {
    const {status, data} = await ax.delete(`/${uid}/collection/${collection_id}/remove`)
    return {status, data};
};
export const deleteCollectionContents = async (uid: string, colleciton_id: string) : Promise<{status: number, data: {}}> => {
    const {status, data} = await ax.delete(`/${uid}/collection/${colleciton_id}/remove/all`);
    return{status, data};
}
