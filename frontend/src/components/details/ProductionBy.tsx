import { FC } from "react";
import MyDiv from "./MyDiv";
import { imageUrlWithSize } from "../../utils/imageUrl";
const ProductionBy: FC<PropsType> = ({ items, color, title }) => {
  return (
    <MyDiv title={title} color={color}>
      <div
        className="flex flex-col center wrap gap-10 overflow-y-scroll"
        style={{ maxHeight: 200 }}
      >
        {items.map((el: any, index: number) => (
          <span key={index}>
            {el.logo_path ? (
              <img
                src={imageUrlWithSize(el.logo_path, '92')}
                alt={el.name}
                key={index}
                style={{filter: 'invert(1)'}}
              />
            ) : (
              <span className="text-sm" key={index}>
                {el.name}
              </span>
            )}
          </span>
        ))}
      </div>
    </MyDiv>
  );
};

interface PropsType {
  items: any[];
  color?: string;
  title: string;
}

export default ProductionBy;
