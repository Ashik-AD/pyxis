import React from "react";
import useFetch from "../../hooks/useFetch";

const Keywords: React.FC<{ url: string }> = (props) => {
  const { data, loading } = useFetch(props.url);
  if (loading) return <h1>Loading...</h1>;
  return (
    <div className="flex wrap gap-10 text-xsm font-semibold overflow-x-scroll md:nowrap lg:wrap">
      {data &&
        data.slice(0, 10).map((el: { id: number; name: string }) => (
          <span
            key={el.id}
            className="px-6 my-6 capitalize border-1 border-gray px-10 py-6 rounded-xlg"
            style={{ whiteSpace: "nowrap" }}
          >
            {el.name}
          </span>
        ))}
    </div>
  );
};

export default Keywords;
