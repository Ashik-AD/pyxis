import React from "react";

const RenderLists: React.FC<PropTypes> = (props) => {
  const { items, title, listStyles, titleStyles, containerStyles } = props;
  return (
    <div
      className={`flex gap-10 font-semibold color-white ${
        containerStyles && containerStyles
      }`}
    >
      {title && (
        <span className={`color-white ${titleStyles && titleStyles}`}>
          {title}
        </span>
      )}
      <div className={`${listStyles && listStyles}`}>
        {items.map((el: ItemsType, index: number) => (
          <span key={index}>
            <>
              {el.hasOwnProperty("name") ? el.name : el}
              {index !== items.length - 1 && ", "}
            </>
          </span>
        ))}
      </div>
    </div>
  );
};
interface PropTypes {
  items: any[];
  title: string;
  listStyles?: string;
  titleStyles?: string;
  containerStyles?: string;
}
interface ItemsType {
  name: string;
}
export default RenderLists;
