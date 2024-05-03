import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MyDiv from "../../components/details/MyDiv";
import PersonHeading from "../../components/details/PersonHeading";
import PersonTab from "../../components/details/PersonTab";
import useFetch from "../../hooks/useFetch";
const Person = () => {
  const { person_id } = useParams();
  const id = person_id?.split("-").pop();
  useEffect(() => {
    const person_name = person_id?.split("-");
    document.title = `Pyxis •
      ${person_name
        ?.slice(0, person_name.length - 1)
        .toString()
        .replaceAll(",", " ")}`;
    return () => {
      document.title = "Pyxis";
    };
  }, [person_id]);

  const { data, loading, error } = useFetch(`person/${id}`);
  const personMovieCredit = useFetch(`person/credits/${id}/movie`);
  const personTvCredit = useFetch(`person/credits/${id}/tv`);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Something went wrong</h1>;
  if (!data) return <h1>Oppsi nothing found</h1>;
  return (
    <div className=" w-screen bg-primary overflow-y-scroll overflow-x-hidden">
      <PersonHeading {...data} />
      <div className="flex flex-col px-20 sm:px-50 py-20 gap-20">
        {data.biography && (
          <MyDiv title={`About ${data.name}`} styles="bg-secondary px-20">
            <>{data.biography}</>
          </MyDiv>
        )}

        {(personMovieCredit.data || personTvCredit.data) && (
          <PersonTab tv={personTvCredit.data} movie={personMovieCredit.data} />
        )}
      </div>
    </div>
  );
};

export default Person;
