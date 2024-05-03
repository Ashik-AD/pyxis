import React, { useState, useEffect, useContext } from "react";
import { ax } from "../../config/default";
import { StoreContext } from "../../store/Store";
import { STORE_ITEM_TYPE, STORE_KEY } from "../../store/storeType";
import CardRegular from "../cards/CardRegular";
import SkeletonSliderSm from "../skeleton/SkeletonSliderSm";
import { CardPropTypes } from "../types/movie";
import Slider from "./Slider";

const CardRegularSliderWithStore: React.FC<PropTypes> = ({
  url,
  store_item_type,
  store_key,
  media_type,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { store, dispatch } = useContext(StoreContext);
  useEffect(() => {
    let fetchItems = null;
    if (!store[store_key]) {
      setLoading(true);
      fetchItems = async () => {
        try {
          const { data } = await ax.get(`${url}`);
          dispatch({ type: store_item_type, payload: data });
        } catch (err) {
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      fetchItems();
    }
    return () => {
      fetchItems = null;
    };
  }, []);
  if (loading) return <SkeletonSliderSm />;
  if (error) return <h1>Something went wrong...</h1>;
  return (
    <Slider>
      {store[store_key] &&
        store[store_key].results.map((el: CardPropTypes) => (
          <CardRegular
            imageStyle="h-full"
            key={el.id}
            {...el}
            url={`/${media_type}/info/${el.id}-${el.title.replaceAll(
              " ",
              "-"
            )}}`}
          />
        ))}
      {/* <SeeMore url={url} /> */}
    </Slider>
  );
};
interface PropTypes extends STORE_ITEM_TYPE, STORE_KEY {
  readonly url: string;
  readonly media_type: "movie" | "tv";
}
export default CardRegularSliderWithStore;
