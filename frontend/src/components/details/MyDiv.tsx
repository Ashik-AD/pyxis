import { FC } from "react";

const MyDiv: FC<PropTypes> = (props) => {
  const { title, isDividerShow, styles, children } = props;

  if (children === "") {
    return null;
  }

  return (
    <div
      className={`w-full color-white py-10 overflow-hidden ${
        styles ? styles : ""
      }`}
    >
      <div className="block text-medium font-medium py-20 color-white">
        <div className="flex">
          <span>
            {title}{" "}
            {isDividerShow !== false && (
              <span
                className="rounded-lg flex bg-fade"
                style={{ height: 4, width: "30%"}}
              ></span>
            )}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
};

interface PropTypes {
  children: any;
  title: string;
  isDividerShow?: boolean;
  styles?: string;
  color?: string;
}
export default MyDiv;
