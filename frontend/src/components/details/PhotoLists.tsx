import React, { useEffect, useState } from "react";
import { ax } from "../../config/default";
import { imageUrl, imageUrlWithSize } from "../../utils/imageUrl";
import Image from "../img/Image";
import Modal from "../modal/Modal";

const PhotoLists: React.FC<{ url: string }> = (props) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImg, setCurrentImage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    let fetch = null;
    fetch = async () => {
      const con = await ax.get(props.url);
      setImages(con.data.posters.slice(0, 20));
      setLoading(false);
    };
    fetch();
    return () => {
      fetch = null;
    };
  }, [props.url]);
  if (loading) return <h1>Loading...</h1>;
  const handleClick = (file_path: string) => {
    setCurrentImage(file_path);
    setModalOpen(true);
  };
  return (
    <div className="flex overflow-x-scroll gap-20">
      {images.map((el: any, index: number) => (
        <article key={index} onClick={() => handleClick(el.file_path)}>
          <Image
            key={index}
            className="h-200 cursor-pointer rounded-lg hover-fade-half"
            src={imageUrl(el.file_path)}
            alt="ikake"
          />
        </article>
      ))}
      {modalOpen && (
        <Modal handleClick={() => setModalOpen(false)} childClick={false}>
          <img
            src={imageUrlWithSize(currentImg, "original")}
            alt="modal-imge"
            className="w-full sm:w-33 h-full rounded-lg"
          />
        </Modal>
      )}
    </div>
  );
};

export default PhotoLists;
