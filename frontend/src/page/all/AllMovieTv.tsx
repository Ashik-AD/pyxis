import { FC, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import CardRegular from "../../components/cards/CardRegular";
import Paginate from "../../components/pagination/Paginate";
import { ax } from "../../config/default";

const AllMovieTv: FC = () => {
  const [page, setPage] = useState({
    current: 1,
    total: 0,
  });
  const [items, setItems] = useState<[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { type, src } = useParams();
  const { pathname } = useLocation();
  useEffect(() => {
    const pagingNo = pathname.split("/").pop();
    if (pagingNo) {
      setPage((prevState) => ({ ...prevState, current: +pagingNo }));
    }
  }, [pathname]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const req1 = await ax.get(`${type}/${src}/${page.current}`);
        const req2 = await ax.get(`${type}/${src}/${page.current + 1}`);
        const results = req1.data.results.concat(req2.data.results);
        setItems(results);
        setPage((state) => ({ ...state, total: req1.data.total_pages / 2 }));
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [pathname]);

  const handlePaginateClick = (paging: number) => {
    console.log(paging);
  };

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Something went wrong</h1>;
  return (
    <section className="flex flex-col p-10 bg-black pt-50">
      <div className="grid col-2 sm:col-6 gap-10 row-gap-20 pt-50">
        {items &&
          items.map((el: any) => (
            <CardRegular
              key={el.id}
              {...el}
              url={`/${type}/info/${el.id}-${el.title.replaceAll(" ", "-")}`}
              imageStyle="h-full"
            />
          ))}
      </div>
      {items && (
        <Paginate
          active_page={page.current}
          total_pages={page.total}
          handleClick={handlePaginateClick}
        />
      )}
    </section>
  );
};

export default AllMovieTv;
