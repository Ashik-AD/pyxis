import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import DisplayItem from "../../components/details/DisplayItem";
import PersonSlide from "../../components/slider/PersonSlide";
import Keywords from "../../components/details/Keywords";
import MyDiv from "../../components/details/MyDiv";
import TrailerLists from "../../components/details/TrailerLists";
import PhotoLists from "../../components/details/PhotoLists";
import Similar from "../../components/details/Similar";
import RenderLists from "../../components/details/RenderLists";
import { convertRuntime } from "../../utils/Duration";
import Crew from "../../components/details/Crew";
import SocialLink from "../../components/details/SocialLink";
import Video from "../../components/details/Video";
import SeasonLists from "../../components/details/SeasonLists";
import Seasons from "./Seasons";
import ProductionBy from "../../components/details/ProductionBy";
import DetailGeneral from "../../components/details/DetailGeneral";
import DetailLoading from "../../components/loading/DetailLoading";
import AringDate from "../../components/details/AringDate";
import Heading from "../../components/details/Heading";
const Tv: React.FC = () => {
  const color = "#ca2845";
  const { id } = useParams();
  const { data, loading, error } = useFetch(`/tv/${id}/details`);

  if (loading) return <DetailLoading />;
  if (error) return <h1>Something went wrong</h1>;
  if (!data) return <DetailLoading />;
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <section className="w-screen color-white">
        <Heading
          title={data.original_name}
          type="tv"
          release_date={data.first_air_date}
          runtime={data.episode_run_time[0]}
          backdrop_path={data.backdrop_path}
          color={color}
          genres={data.genres}
          id={data.id}
          overview={data.overview}
          poster_path={data.poster_path}
          production_countries={data.production_countries}
          spoken_languages={data.spoken_languages}
          status={data.status}
          tagline={data.tagline}
          vote_average={data.vote_average}
          vote_count={data.vote_count}
        />
        <div
          className="px-20 lg:px-50 py-20 gap-20 overflow-x-hidden"
          style={{ background: "#000" }}
        >
          <div className="lg:grid col-1 lg:col-4 col-gap-50 gap-20 overflow-hidden">
            <div className="lg:span-3 gap-20 overflow-x-hidden sm:pt-50">
              <DetailGeneral
                {...data}
                release_date={data.first_air_date}
                runtime={data.episode_run_time[0]}
                title={data.name}
                type="tv"
              />
              <div className="visible sm:hidden">
                <MyDiv title="Storyline" color={color}>
                  <span className="w-90 text-xsm sm:text-regular font-semibold py-10 color-gray line-space-2">
                    {data.overview}
                  </span>
                </MyDiv>
              </div>
              {data.next_episode_to_air && (
                <AringDate
                  name={data.next_episode_to_air.name}
                  runtime={data.next_episode_to_air.runtime}
                  air_date={data.next_episode_to_air.air_date}
                />
              )}
              <MyDiv title="Cast" color={color}>
                <PersonSlide url={`tv/credit/${id}/cast`} color={color} />
              </MyDiv>
              <MyDiv title="Crew" color={color}>
                <Crew color={color} id={data.id} type="tv" />
              </MyDiv>
              <MyDiv title={`Season (${data.number_of_seasons})`} color={color}>
                <SeasonLists season_lists={data.seasons} />
              </MyDiv>
            </div>
            <div className="w-full side_bar grid col-1 md:col-2 lg:col-1 lg:flex flex-col gap-20 overflow-hidden">
              <MyDiv title="Official" color={color}>
                <SocialLink web={data.homepage} {...data.external_links} />
              </MyDiv>
              <MyDiv title="Status" color={color}>
                <span className="flex flex-col gap-10">
                  <DisplayItem
                    title="Release Date: "
                    value={data.first_air_date}
                  />
                  <DisplayItem title="Status: " value={data.status} />
                </span>
              </MyDiv>
              <MyDiv title="Stats" color={color}>
                <div className="flex col-gap-50">
                  <DisplayItem
                    title="Vote: "
                    value={data.vote_average}
                    className="flex flex-col"
                  />
                  <DisplayItem
                    title="Duration: "
                    value={convertRuntime(data.episode_run_time[0])}
                    className="flex flex-col"
                  />
                </div>
              </MyDiv>
              <MyDiv title="Keywords" color={color}>
                <Keywords url={`/tv/${data.id}/keywords`} />
              </MyDiv>
              <MyDiv title="Accessibility" color={color}>
                <div className="sm:col-2">
                  <RenderLists
                    items={data.spoken_languages}
                    title="Original Language"
                    containerStyles="flex-col my-10"
                  />
                  <RenderLists
                    items={data.production_countries}
                    title="Country"
                    containerStyles="flex-col"
                  />
                </div>
              </MyDiv>
              <MyDiv title="Genres" color={color}>
                <div className="flex wrap gap-20">
                  {data.genres.map((el: any) => (
                    <span key={el.id}>{el.name}</span>
                  ))}
                </div>
              </MyDiv>
              {data.production_companies!.length > 0 && (
                <ProductionBy
                  title="Production By"
                  items={data.production_companies}
                  color={color}
                />
              )}
              {data.networks!.length > 0 && (
                <ProductionBy
                  title="Networks"
                  items={data.networks}
                  color={color}
                />
              )}
            </div>
          </div>

          {/* Trailer lists */}
          <MyDiv title="Videos" color={color}>
            <TrailerLists url={`/tv/${data.id}/video`} color={color} />
          </MyDiv>

          {/* Photo lists */}
          <MyDiv title="Photos" color={color}>
            <PhotoLists url={`/tv/${data.id}/images`} />
          </MyDiv>
          <Similar
            color={color}
            url={`/tv/similar/${data.id}/`}
            renderType="tv"
          />
        </div>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/trailer/:id" element={<Video />} />
          <Route
            path="/season/:id/*"
            element={
              <Seasons
                seasonLists={data.seasons}
                tv_name={data.name}
                tv_id={data.id}
              />
            }
          />
        </Routes>
      </section>
    </Suspense>
  );
};

export default Tv;
