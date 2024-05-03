import { useParams } from "react-router-dom";
import Video from "../../../components/details/Video";
import useFetch from "../../../hooks/useFetch";
const Trailer = () => {
  const { type, id } = useParams();
  const { data, loading, error } = useFetch(`single-trailer/${type}/${id}`);
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Something went wrong</h1>;
  if (!data) return <></>;
  return <Video trailer_id={data.key} />;
};

export default Trailer;
