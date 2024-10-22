import { HTMLAttributes } from "react";
import styles from "./styles.module.scss";

export default function Container({
  className,
  children,
  ...restProps
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${styles.container} ${className || ""}`} {...restProps}>{children}</div>
  );
}
