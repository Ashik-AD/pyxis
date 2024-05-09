import { HTMLAttributes } from "react";

export default function PageLayout({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={`page-layout pt-100 ${className || ""}`} {...props}>{children}</div>;
}
