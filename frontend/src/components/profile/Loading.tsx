import { FC, ReactElement } from "react";

const Loading: FC<{ title: string; children: ReactElement }> = ({
  title,
  children,
}) => {
  return (
    <div
      className="flex flex-col absolute top-0 left-0 w-full h-full  content-center px-20"
      style={{ background: "#0b121ad1" }}
    >
      <span className="text-medium font-semibold">{title}</span>
      {children}
    </div>
  );
};

export default Loading;
