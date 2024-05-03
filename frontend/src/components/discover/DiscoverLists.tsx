import React from "react";
import useFetch from "../../hooks/useFetch";
import { colorLists } from "../../utils/colorLists";
import Title from "../cards/Title";
import SkeletonElement from "../skeleton/SkeletonElement";
import DiscoverCard from "./DiscoverCard";

const DiscoverLists: React.FC = () => {
  const { data, loading, error } = useFetch("/discover/genre");
  if (loading) return <LoadingSkeleton />;

  if (!data) return <LoadingSkeleton />;
  if (error) return <h1>Something went wrong</h1>;
  return (
    <section className="flex flex-col px-20 sm:px-50 py-20 gap-20">
      <div className="flex flex-col gap-10">
        <Title title="Discover Movie By" />
        <div className="grid col-2 sm:col-6 wrap gap-20">
          {data.movie_genre.map((el: any, index: number) => (
            <DiscoverCard
              {...el}
              key={index}
              type="movie"
              styles={{
                background: `${colorLists[randomNo()]}`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <Title title="Discover Tv Show By" />
        <div className="grid col-2 sm:col-6 wrap gap-20 ">
          {data.tv_genre.map((el: any, index: number) => (
            <DiscoverCard
              {...el}
              key={index}
              styles={{
                background: `${colorLists[randomNo()]}`,
              }}
              type="tv"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const randomNo = () => Math.floor(Math.random() * colorLists.length);

const LoadingSkeleton = () => {
  return (
    <div className="grid col-2 sm:col-5 pt-50 px-20 sm:px-50 gap-20 overflow-hidden -z-1">
      <SkeletonElement classNames="h-120 rounded-lg" />
      <SkeletonElement classNames="h-120 rounded-lg" />
      <SkeletonElement classNames="h-120 rounded-lg" />
      <SkeletonElement classNames="h-120 rounded-lg" />
      <SkeletonElement classNames="h-120 rounded-lg" />
      <SkeletonElement classNames="h-120 rounded-lg" />
      <SkeletonElement classNames="h-120 rounded-lg" />
      <SkeletonElement classNames="h-120 rounded-lg" />
      <SkeletonElement classNames="h-120 rounded-lg" />
      <SkeletonElement classNames="h-120 rounded-lg" />
      <SkeletonElement classNames="h-120 rounded-lg" />
      <SkeletonElement classNames="h-120 rounded-lg" />
    </div>
  );
};

export default React.memo(DiscoverLists);
