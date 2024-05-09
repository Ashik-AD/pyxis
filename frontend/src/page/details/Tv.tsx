import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Keywords from "../../components/details/Keywords";
import MyDiv from "../../components/details/MyDiv";
import Similar from "../../components/details/Similar";
import Crew from "../../components/details/Crew";
import SocialLink from "../../components/details/SocialLink";
import Video from "../../components/details/Video";
import SeasonLists from "../../components/details/SeasonLists";
import Seasons from "./Seasons";
import ProductionBy from "../../components/details/ProductionBy";
import DetailLoading from "../../components/loading/DetailLoading";
import AringDate from "../../components/details/AringDate";
import Heading from "../../components/details/Heading";
import Container from "../../components/layout/container";
import PersonList from "../../components/person-list";

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
          runtime={data.episode_run_time[0] || 0}
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
        <div className="py-20 gap-20 overflow-x-hidden">
          <Container>
            <div className="lg:grid col-1 lg:col-4 col-gap-50 gap-20 overflow-hidden">
              <div className="lg:span-3 gap-20 overflow-x-hidden">
                {data.next_episode_to_air && (
                  <AringDate
                    name={data.next_episode_to_air.name}
                    runtime={data.next_episode_to_air.runtime}
                    air_date={data.next_episode_to_air.air_date}
                  />
                )}
                <MyDiv title="Cast" color={color}>
                  <PersonList url={`tv/credit/${id}/cast`} color={color} />
                </MyDiv>
                <MyDiv title="Crew" color={color}>
                  <Crew color={color} id={data.id} type="tv" />
                </MyDiv>
                <MyDiv
                  title={`Season (${data.number_of_seasons})`}
                  color={color}
                >
                  <SeasonLists season_lists={data.seasons} />
                </MyDiv>
              </div>
              <div className="w-full side_bar flex flex-col gap-20 overflow-hidden">
                <MyDiv title="Social Media" color={color}>
                  <SocialLink web={data.homepage} {...data.external_links} />
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
                <MyDiv title="Keywords">
                  <Keywords url={`/tv/${data.id}/keywords`} />
                </MyDiv>
              </div>
            </div>
            <Similar
              color={color}
              url={`/tv/similar/${data.id}/`}
              renderType="tv"
            />
          </Container>
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
