import { FC, CSSProperties } from "react";

const Image: FC<ImageProps> = (props) => {
  const { src, alt, className, styles } = props;
  return (
      <img
        src={src}
        alt={alt}
        className={className ? className : ""}
        style={styles}
        loading="lazy"
      />
  );
};

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  styles?: CSSProperties;
}

export default Image;
