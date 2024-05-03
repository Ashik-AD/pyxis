import { FC, CSSProperties } from "react";

const Image: FC<ImageProps> = (props) => {
  const { src, alt, className, styles } = props;
  return (
    <>
      <span className={`${className} block h-1 w-1`} style={styles}>
        <img
          src={src}
          alt={alt}
          className={className ? className : ""}
          style={styles ? styles : {}}
        />
      </span>
    </>
  );
};

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  styles?: CSSProperties;
}

export default Image;
