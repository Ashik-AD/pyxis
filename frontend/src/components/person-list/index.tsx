import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { imageUrlWithSize } from "../../utils/imageUrl";
import PersonCard from "../cards/PersonCard";
import Button from "../details/Button";
import { PersonCardTypes } from "../types/Person.type";

type Props = {
  url: string;
  color?: string;
  items?: any[];
};

export default function PersonList(props: Props) {
  let { data, loading, error } = useFetch(props.url);
  if (loading) return <h3>Loading</h3>;
  if (error || !data) return <h3>Something went wrong</h3>;
  if (!props.url) {
    data = props.items;
  }
  return <RenderPersons list={data} />;
}

export function RenderPersons({ list }: { list: PersonCardTypes[] }) {
  const [count, setCount] = useState(9);
  let listLen = list?.length || 0;
  return (
    <div className="flex flex-col gap-20">
      <div className="grid col-2  md:col-3 gap-20 row-gap-30">
        {list
          ?.slice(0, count)
          .map((el: any) => (
            <PersonCard
              {...el}
              id={el.id}
              person_name={el.name}
              profile_img={
                el.profile_path ? imageUrlWithSize(el.profile_path, "185") : ""
              }
              character={el.character}
              key={el.id}
              gender={el.gender}
            />
          ))}
      </div>
      {listLen > 9 && (
        <div className="flex content-center text-center">
          <Button
            styles="color-white text-sm font-md"
            title={`View ${count < listLen ? "more" : "less"}`}
            handleClick={() => {
              if (count >= listLen) {
                setCount(9);
                return;
              }
              setCount((prevCount) => prevCount + 6);
            }}
          />
        </div>
      )}
    </div>
  );
}
