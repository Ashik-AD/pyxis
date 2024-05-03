import React from "react";
import { useParams, useNavigate, Routes, Route } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { imageUrl } from "../../utils/imageUrl";
import { Episodes } from "../types/tv.type";
import DisplayItem from "./DisplayItem";
import MyDiv from "./MyDiv";
import { RiBarChart2Fill } from "react-icons/ri";
import EpisodeDetails from "./EpisodeDetails";
import NotFound from "../../page/404/NotFound";
import { noImage } from "../../utils/noImage";
import Image from "../img/Image";

const EpisodeLists: React.FC<{
  tv_id: number | string;
  season_number: number | string;
}> = ({ tv_id, season_number }) => {
  const params = useParams();
  const id = params.id?.split("-")[0];
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`tv/season/${tv_id}/${id}`);
  if (loading) return null;
  if (error) return <NotFound />;
  if (!data) return <h1>Nothing found</h1>;
  return (
    <section className="flex flex-col w-full overflow-x-hidden">
      {data.overview && (
        <MyDiv title="About">
          <p className="color-gray">{data.overview}</p>
        </MyDiv>
      )}
      <div className="flex flex-col gap-20 pb-50">
        {data.episodes.map((el: Episodes) => (
          <div
            className={`flex flex-col sm:flex-row items-center gap-20 w-full my-10 hover-fade-half rounded-lg cursor-pointer ${
              !checkEpisodeRelased(el.air_date) && "opacity-half"
            }`}
            key={el.id}
            onClick={() => navigate(`episode/${el.episode_number}`)}
          >
            <Image
              src={el.still_path ? imageUrl(el.still_path) : noImage.default_lg}
              alt={el.still_path}
              className="w-250 rounded-lg "
              styles={{ objectFit: "cover", maxHeight: 250 }}
            />

            <div className="flex flex-col gap-10 span-2 px-20 sm:p-10">
              <DisplayItem title="Episode:" value={el.episode_number} />
              <div>
                <span className="font-semibold text-lg">{el.name}, </span>
                <span className="font-semibold text-regular">
                  {el.air_date.toString()}
                </span>
              </div>
              <div className="flex items-center gap-10">
                <RiBarChart2Fill />
                <span className="text-medium">{el.vote_average}</span>
              </div>
              <p
                className="text-sm font-semibold color-gray"
                style={{ lineHeight: 1.5 }}
              >
                {el.overview}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Routes>
        <Route path="/" element={<></>} />
        <Route
          path="episode/:id"
          element={
            <EpisodeDetails
              tv_id={tv_id}
              episode={data.episodes}
              season_number={season_number}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};
const checkEpisodeRelased = (date: Date) => {
  let dt: any = new Date(date);
  let cur: any = new Date();
  return dt - cur < 0 && true;
};
export default EpisodeLists;
