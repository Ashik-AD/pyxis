import { useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Heading from "../../components/details/Heading";
import useFetch from "../../hooks/useFetch";
import extractId from "../../utils/extractId";
import MyDiv from "../../components/details/MyDiv";
import SocialLink from "../../components/details/SocialLink";
import DisplayItem from "../../components/details/DisplayItem";
import { convertRuntime } from "../../utils/Duration";
import formatCurrency from "../../utils/formatCurrency";
import RenderLists from "../../components/details/RenderLists";
import PersonSlide from "../../components/slider/PersonSlide";
import Crew from "../../components/details/Crew";
import Keywords from "../../components/details/Keywords";
import TrailerLists from "../../components/details/TrailerLists";
import PhotoLists from "../../components/details/PhotoLists";
import Video from "../../components/details/Video";
import Similar from "../../components/details/Similar";
import DetailGeneral from "../../components/details/DetailGeneral";
import DetailLoading from "../../components/loading/DetailLoading";
import ProductionBy from "../../components/details/ProductionBy";

const Movie = () => {
  const [color] = useState("#ca2845");
  const { id } = useParams();
  const movieId = extractId(id);
  const { data, error, loading } = useFetch(`/movie/${movieId}/details`);

  if (loading) return <DetailLoading />;
  if (data === null) return <DetailLoading />;
  if (error) return <h1>Something went wrong</h1>;
  return (
    <section className="flex flex-col w-full " style={{ background: "#000" }}>
      <Heading {...data} color={color} type="movie" />
      <div className="px-20 sm:px-50 flex flex-col py-20 gap-20 overflow-x-hidden pt-50">
        <div className="grid col-1 lg:col-4 col-gap-50 gap-20">
          <div className="w-full sm:span-3 flex flex-col gap-20 overflow-x-hidden">
            <DetailGeneral {...data} type="movie" />
            <div className="visible sm:hidden">
              <MyDiv title="Storyline" color={color}>
                <span className="w-90 text-xsm sm:text-regular font-semibold py-10 color-gray line-space-2">
                  {data.overview}
                </span>
              </MyDiv>
            </div>
            <MyDiv title="Top Cast" color={color}>
              <PersonSlide url={`movie/credit/${movieId}/cast`} color={color} />
            </MyDiv>
            <MyDiv title="Top Crew" color={color}>
              <Crew color={color} id={data.id} type="movie" />
            </MyDiv>
          </div>
          <div className="w-full side_bar grid col-1 md:col-2 lg:col-1 lg:flex flex-col gap-20 overflow-hidden">
            <MyDiv title="Official" color={color}>
              <SocialLink web={data.homepage} {...data.external_links} />
            </MyDiv>
            <MyDiv title="Status" color={color}>
              <span className="flex flex-col gap-10">
                <DisplayItem title="Release Date: " value={data.release_date} />
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
                  value={convertRuntime(data.runtime)}
                  className="flex flex-col"
                />
              </div>
            </MyDiv>
            {data.production_companies!.length > 0 && (
              <ProductionBy
                title="Production By"
                items={data.production_companies}
                color={color}
              />
            )}
            <MyDiv title="Keywords" color={color}>
              <Keywords url={`/movie/${data.id}/keywords`} />
            </MyDiv>
          </div>
        </div>
        <div className="grid col-1 md:col-2 lg:col-3 gap-20 py-20">
          <MyDiv title="Box office" color={color}>
            <div className="w-full">
              <div className="flex space-between py-10">
                <span>Budget</span>
                <span>Revenue</span>
              </div>
              <div className="relative py-6">
                <div
                  className="rounded-full bg-white border-2 absolute left-10 top-0"
                  style={{ background: color, height: 15, width: 15 }}
                ></div>
                <div
                  className="full rounded-lg"
                  style={{ height: 5, background: color }}
                ></div>
                <div
                  className="rounded-full bg-white border-2 absolute right-10 top-0"
                  style={{ background: color, height: 15, width: 15 }}
                ></div>
              </div>
              <div className="flex space-between font-semibold">
                <span>{formatCurrency(data.budget)}</span>
                <span>{formatCurrency(data.revenue)}</span>
              </div>
            </div>
          </MyDiv>

          <MyDiv title="Accessibility" color={color}>
            <div className="sm:col-2">
              <RenderLists
                items={data.spoken_languages}
                title="Original Language"
                containerStyles="flex-col item-center"
              />
              <RenderLists
                items={data.production_countries}
                title="Country"
                containerStyles="flex-col"
              />
            </div>
          </MyDiv>

          <MyDiv title="Genres" color={color}>
            <div className="flex gap-20">
              {data.genres.map((el: any) => (
                <span key={el.id}>{el.name}</span>
              ))}
            </div>
          </MyDiv>
        </div>

        {/* Trailer lists */}
        <MyDiv title="Videos" color={color}>
          <TrailerLists url={`/movie/${data.id}/video`} color={color} />
        </MyDiv>

        {/* Photo lists */}
        <MyDiv title="Photos" color={color}>
          <PhotoLists url={`/movie/${data.id}/images`} />
        </MyDiv>
        <Similar
          color={color}
          url={`/movie/similar/${data.id}`}
          renderType="movie"
        />
      </div>
      <Routes>
        <Route path="/trailer/:id" element={<Video />} />
      </Routes>
    </section>
  );
};

export default Movie;
