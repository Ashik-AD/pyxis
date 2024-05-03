import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import CardRegular from "../../components/cards/CardRegular";
import Title from "../../components/cards/Title";
import Paginate from "../../components/pagination/Paginate";
import SkeletonSm from "../../components/skeleton/SkeletonSm";
import { ax } from "../../config/default";
import myAppTitle from "../../utils/appTitle";

const DiscoverByGenre: React.FC = () => {
  const [genreName, setGenreName] = useState<any>("");
  const [lists, setLists] = useState<[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState<{ current: number; total: number }>({
    current: 1,
    total: 0,
  });
  const { genre_id, type, ...rest } = useParams();
  const { pathname } = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPage((prevState) => ({
      ...prevState,
      current: rest ? parseInt(rest["*"] ? rest["*"] : "1", 10) : 1,
    }));
  }, [pathname]);

  useEffect(() => {
    let fetchLists = null;
    fetchLists = async () => {
      try {
        if (!rest["*"]) return;
        setLoading(true);
        const fetch1 = await ax.get(
          `/discover/${type}/by_genre/${genre_id?.split("-").pop()}/${
            page.current
          }`
        );
        setLists(fetch1.data.results);
        setPage((prevState) => ({
          ...prevState,
          total: fetch1.data.total_pages,
        }));
        const fetch2 = await ax.get(
          `/discover/${type}/by_genre/${genre_id?.split("-").pop()}/${
            page.current + 1
          }`
        );
        const combine: any = fetch1.data.results.concat(fetch2.data.results);
        setLists(combine);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchLists();
    return () => {
      fetchLists = null;
    };
  }, [page.current]);

  useEffect(() => {
    const genre_name = genre_id?.split("-");
    setGenreName(
      genre_name!.length > 2
        ? genre_name
            ?.slice(0, genre_name.length - 1)
            .toString()
            .replaceAll(",", " ")
        : genre_name?.shift()
    );
    document.title = `Pyxis • Discover By ${genreName}`;
    return () => {
      document.title = myAppTitle();
    };
  }, [genre_id]);

  if (loading)
    return (
      <div className="px-10 sm:px-50 pt-50 sm:pt-0 my-20 sm:my-0 sm:pt-0 h-screen">
        <SkeletonSm
          noOfCard={20}
          styles="grid col-2 md:col-4 lg:col-6 row-gap-20 sm:gap-20 gap-10 opacity-half"
        />
      </div>
    );
  if (error) return <h1>Something went wrong...</h1>;
  return (
    <div
      className="px-10 sm:px-20 pt-50 my-20 sm:pt-0 sm:my-0 overflow-y-scroll"
      ref={containerRef}
      style={{ background: "#000" }}
    >
      <Title title={`Discover ${type} By ${genreName}`} />
      <div className="grid col-2 md:col-4 lg:col-6 sm:gap-10 gap-10 row-gap-20">
        {lists &&
          lists.map((el: any) => (
            <CardRegular
              key={el.id}
              {...el}
              imageStyle="h-full"
              url={`/${type}/info/${el.id}-${el.title.replaceAll(" ", "-")}`}
            />
          ))}
      </div>

      <Paginate
        total_pages={page.total}
        active_page={page.current ? page.current : 1}
      />
    </div>
  );
};

export default DiscoverByGenre;
