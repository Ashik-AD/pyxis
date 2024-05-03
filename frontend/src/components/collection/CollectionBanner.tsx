import { FC } from "react";
import { imageUrl } from "../../utils/imageUrl";
const CollectionBanner: FC<{ banner: string[] }> = ({ banner }) => {
  return (
    <div
      className={`grid ${
        banner.length > 1 ? "col-2" : "col-1"
      }  overflow-hidden shadow-lg h-250 w-250 bg-center`}
      style={
        banner.length === 1
          ? { backgroundImage: `url(${imageUrl(banner[0])})`, height: 200 }
          : {}
      }
    >
      {banner.length > 3
        ? banner.map((el, index) => (
            <img
              key={index}
              src={imageUrl(el)}
              className="w-full"
              style={{ width: 125, height: 125, objectFit: "cover" }}
              alt="collection-banner object-contain"
            />
          ))
        : banner
            .slice(1, 3)
            .map((el, index) => (
              <img
                key={index}
                src={imageUrl(el)}
                className="w-full"
                alt="collection-banner"
              />
            ))}
    </div>
  );
};

export default CollectionBanner;
