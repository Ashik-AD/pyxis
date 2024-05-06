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
  storeItemType,
  storeKey,
  media_type,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { store, dispatch } = useContext(StoreContext);

  useEffect(() => {
    let fetchItems = null;
    if (!store[storeKey]) {
      setLoading(true);
      fetchItems = async () => {
        try {
          const { data } = await ax.get(`${url}`);
          dispatch({ type: storeItemType, payload: data });
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
  if (!store[storeKey]) return null;
  return (
    <SliderLg>
      {store[storeKey] &&
      //@ts-ignore
        store[storeKey].results.map((el: CardPropTypes) => (
          <CardLarge
            imageStyle="h-190"
            key={el.id}
            {...el}
            url={`/${media_type}/info/${el.id}-${el.title.replaceAll(
              " ",
              "-",
            )}`}
          />
        ))}
      {/* <SeeMore url={`${url}/1`} /> */}
    </SliderLg>
  );
};
type PropTypes = {
  url: string;
  media_type: "movie" | "tv";
  storeKey: STORE_KEY;
  storeItemType: STORE_ITEM_TYPE;
};
export default CardLargeSliderWithStore;
