import { FC, useState, useContext } from "react";
import { ax } from "../../config/default";
import { StoreContext } from "../../store/Store";
import { noImage } from "../../utils/noImage";
import Modal from "../modal/Modal";

const UpdateCollection: FC<PropTypes> = (props) => {
  const { handleClick, collection_id } = props;
  const {
    dispatch,
    store: { collections, user },
  } = useContext(StoreContext);
  const [updateError, setUpdateError] = useState("");
  const collection: CollectionType =
    collections &&
    collections.find((el: any) => el.playlist_id === collection_id);

  const handleSubmit = async (eve: any) => {
    eve.preventDefault();
    const form = new FormData(eve.currentTarget);
    const title = form.get("title")?.toString();
    const newDescription = form.get("description")!.toString();
    if (!title) {
      setUpdateError("Empty collection name is not allowed");
      return;
    }
    if (
      collection.playlist_name === title &&
      collection.description === newDescription
    ) {
      handleClick(false);
      return;
    }
    const request = await ax.post(`/${user.id}/update-playlist`, {
      data: {
        title,
        description: newDescription,
        playlist_id: collection.playlist_id,
      },
    });
    if (request.status === 200) {
      const newCollections = collections.map((el: CollectionType) => {
        if (el.playlist_id === collection.playlist_id) {
          el.playlist_name = title;
          el.description = newDescription;
        }
        return el;
      });
      handleClick(false);
      dispatch({ type: "SET_COLLECTION", payload: newCollections });
      props.onHandleCompletion && props.onHandleCompletion({ collection });
      return;
    }
    setUpdateError(request.data);
  };
  const clearUpdateError = () => {
    if (updateError) {
      return setUpdateError("");
    }
  };

  return (
    <Modal
      handleClick={() => handleClick(false)}
      childClick={false}
      styles="p-20 sm:p-10 bg-fade"
    >
      <div className="flex flex-col bg-secondary w-full sm:w-50 rounded-lg px-10 sm:px-20 gap-20 py-20">
        {updateError && (
          <span className="bg-warn py-6 px-20 rounded-regular font-medium">
            {updateError}
          </span>
        )}
        <span className="color-light-gray font-semibold text-medium">
          Edit Details
        </span>
        <div className="flex flex-col sm:flex-row gap-20">
          <div className="relative flex content-center sm:content-normal w-full sm:w-33">
            <img
              src={noImage.collection}
              alt="collection-banner"
              className="w-150 sm:w-200"
            />
          </div>
          <form
            onSubmit={handleSubmit}
            className="sm:w-75 flex flex-col gap-20 px-20"
          >
            <input
              type="text"
              name="title"
              defaultValue={collection.playlist_name}
              className="bg-transparent border-2 border-gray color-light-gray py-10 px-10 w-full rounded-regular"
              onClick={clearUpdateError}
            />
            <textarea
              defaultValue={collection.description}
              name="description"
              className="h-100 bg-transparent border-2 border-gray rounded-lg color-gray p-10"
              onClick={clearUpdateError}
            />
            <div className="flex content-bottom">
              <button className="bg-white text-medium border-0 rounded-xlg px-20 py-6 cursor-pointer">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
interface PropTypes {
  collection_id: string;
  handleClick: (val: true | false) => void;
  onHandleCompletion?: (values?: any) => void;
}
interface CollectionType {
  playlist_id: string;
  playlist_name: string;
  description: string;
}
export default UpdateCollection;
