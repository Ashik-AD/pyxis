import { CSSProperties, FC } from "react";
import Image from "./Image";
const BackgroundImage: FC<BackgroundImageProps> = (props) => {
  const { src, className, styles, objectFit } = props;
  return (
    <div
      className={`${
        className ? className : ""
      } h-full w-full absolute overflow-hidden`}
      style={styles ? { ...styles } : {}}
    >
      <Image
        src={src}
        alt="app background"
        styles={{
          minHeight: "100%",
          minWidth: "100%",
          height: "100%",
          width: "100%",
          objectFit: !objectFit ? "cover" : objectFit,
        }}
      />
    </div>
  );
};
type ObjectFit = "cover" | "contain" | "fill";
interface BackgroundImageProps {
  src: string;
  className?: string;
  styles?: CSSProperties;
  objectFit?: ObjectFit;
}

export default BackgroundImage;
