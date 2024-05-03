import React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { RiPlayMiniFill } from "react-icons/ri";

const TrailerLists: React.FC<{ url: string; color?: string }> = (props) => {
  const { data, loading, error } = useFetch(props.url);
  const navigation = useNavigate();
  if (loading) return null;
  if (error) return <h1>Something went wrong</h1>;
  if (data === null) return <h1>No Videos</h1>;
  const handleNav = (id: string) => {
    navigation(`trailer/${id}`, { replace: true });
  };
  return (
    <div className="grid col-2 sm:col-3 gap-10">
      {data.results.map((el: any) => (
        <div
          key={el.id}
          className="relative flex h-150 content-center cursor-pointer mx-6 rounded-lg overflow-hidden"
          onClick={() => handleNav(el.key)}
        >
          <div
            style={{
              background: `url(https://i.ytimg.com/vi/${el.key}/hqdefault.jpg)`,
            }}
            className="absolute h-full  w-full bg-center rounded-lg hover-scaleup z-0 transition-1"
          />
          <span
            className="rounded-full flex content-center text-heading overflow-hidden hover-fade-half z-1"
            style={{ background: props.color, height: 40, width: 40 }}
          >
            <RiPlayMiniFill />
          </span>
        </div>
      ))}
    </div>
  );
};

export default TrailerLists;
