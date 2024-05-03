import React, { useEffect, useContext, useState } from "react";
import { ax } from "../../config/default";
import { StoreContext } from "../../store/Store";
import { STORE_ITEM_TYPE, STORE_KEY } from "../../store/storeType";
import CardLarge from "../cards/CardLarge";
import SkeletonSliderLg from "../skeleton/SkeletonSliderLg";
import { CardPropTypes } from "../types/movie";
import SliderLg from "./SliderLg";
const CardLargeSliderWithStore: React.FC<PropTypes> = ({
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
  if (loading) return <SkeletonSliderLg />;
  if (error) return <h1>Something went wrong</h1>;
  if (!store[store_key]) return null;
  return (
    <SliderLg>
      {store[store_key] &&
        store[store_key].results.map((el: CardPropTypes) => (
          <CardLarge
            imageStyle="h-190"
            key={el.id}
            {...el}
            url={`/${media_type}/info/${el.id}-${el.title.replaceAll(
              " ",
              "-"
            )}`}
          />
        ))}
      {/* <SeeMore url={`${url}/1`} /> */}
    </SliderLg>
  );
};
interface PropTypes extends STORE_ITEM_TYPE, STORE_KEY {
  readonly url: string;
  readonly media_type: "movie" | "tv";
}
export default CardLargeSliderWithStore;
