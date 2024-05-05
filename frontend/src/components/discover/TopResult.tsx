import React from "react";
import Title from "../cards/Title";
import ResultItem from "./ResultItem";
import WithCard from "./WithCard";
import TopMovieTvCard from "./TopMovieTvCard";
import TopPersonCard from "./TopPersonCard";
import ResultPersonList from "./ResultPersonList";
import CardRegular from "../cards/CardRegular";
import SearchNotFound from "./SearchNotFound";

const TopResult: React.FC<PropTypes> = ({
  movieAndTvResult,
  personResult,
  collection,
  search_key,
}) => {
  if (
    movieAndTvResult.length <= 0 &&
    personResult.length <= 0 &&
    collection.length <= 0
  ) {
    return <SearchNotFound search_key={search_key} />;
  }
  const result =
    movieAndTvResult.length > 0 && movieAndTvResult[0].media_type !== "person"
      ? movieAndTvResult.slice(1, movieAndTvResult.length)
      : movieAndTvResult;
  return (
    <section className="px-20 sm:px-50">
      <div className="top_result flex flex-col gap-30">
        {(movieAndTvResult.length > 0 || personResult.length > 0) && (
          <div className="pt-50">
            <Title title="Top Result" />
            <div className="flex flex-col sm:flex-row gap-40">
              <div className="w-full sm:w-50">
                {movieAndTvResult.length > 0 &&
                movieAndTvResult[0].media_type !== "person" ? (
                  <WithCard
                    url={`/${movieAndTvResult[0].media_type}/info/${
                      movieAndTvResult[0].id
                    }-${movieAndTvResult[0].title.replaceAll(" ", "-")}`}
                  >
                    <TopMovieTvCard {...movieAndTvResult[0]} />
                  </WithCard>
                ) : (
                  personResult.length > 0 && (
                    <WithCard
                      url={`/person/${
                        personResult[0].id
                      }-${personResult[0].name.replaceAll(" ", "-")}`}
                    >
                      <TopPersonCard {...personResult[0]} />
                    </WithCard>
                  )
                )}
              </div>
              {result.length > 0 && (
                <div
                  className="flex flex-col gap-10 color-white sm:w-60 overflow-y-scroll overflow-x-hidden"
                  style={{ maxHeight: 330 }}
                >
                  {result[0].media_type.toLowerCase() !== "person"
                    ? result.map((el: any, index) => (
                        <ResultItem key={el.id} {...el} count={index + 1} />
                      ))
                    : personResult[0].known_for.map(
                        (el: any, index: number) => (
                          <ResultItem
                            {...el}
                            key={el.id}
                            count={index + 1}
                            include={personResult[0].name}
                          />
                        )
                      )}
                </div>
              )}
            </div>
          </div>
        )}
        {personResult.length > 0 && (
          <>
            <Title title="People" />
            <div className="grid col-2 sm:col-5 gap-20 overflow-x-hidden">
              {personResult.map((el: any) => (
                <ResultPersonList key={el.id} {...el} />
              ))}
            </div>
          </>
        )}
        {collection.length > 0 && (
          <>
            <Title title="Collections" />
            <div className="grid col-2 sm:col-5 gap-20">
              {collection.map((el: any) => (
                <CardRegular
                  title={el.name}
                  key={el.id}
                  id={el.id}
                  release_date={el.release_date}
                  poster={el.poster_path}
                  url={`/collection/${el.name.replaceAll(" ", "-")}-${el.id}`}
                  vote_average={el.vote_average}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

interface PropTypes {
  movieAndTvResult: any[];
  personResult: any[];
  collection: any[];
  search_key: string;
}

export default TopResult;
