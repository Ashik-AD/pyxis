import { useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Heading from "../../components/details/Heading";
import useFetch from "../../hooks/useFetch";
import extractId from "../../utils/extractId";
import MyDiv from "../../components/details/MyDiv";
import SocialLink from "../../components/details/SocialLink";
import PersonSlide from "../../components/slider/PersonSlide";
import Crew from "../../components/details/Crew";
import Keywords from "../../components/details/Keywords";
import Video from "../../components/details/Video";
import Similar from "../../components/details/Similar";
import DetailLoading from "../../components/loading/DetailLoading";
import ProductionBy from "../../components/details/ProductionBy";
import Container from "../../components/layout/container";

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
      <div className="flex flex-col py-20 gap-20 overflow-x-hidden">
        <Container>
          <div className="grid col-1 lg:col-4 col-gap-50 gap-20">
            <div className="w-full sm:span-3 flex flex-col gap-20 overflow-x-hidden">
              <MyDiv title="Top Cast">
                <PersonSlide
                  url={`movie/credit/${movieId}/cast`}
                  color={color}
                />
              </MyDiv>
              <MyDiv title="Top Crew">
                <Crew color={color} id={data.id} type="movie" />
              </MyDiv>
            </div>
            <div className="w-full side_bar flex flex-col gap-20 overflow-hidden">
              <MyDiv title="Social Media">
                <SocialLink web={data.homepage} {...data.external_links} />
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
          <Similar
            color={color}
            url={`/movie/similar/${data.id}`}
            renderType="movie"
          />
        </Container>
      </div>
      <Routes>
        <Route path="/trailer/:id" element={<Video />} />
      </Routes>
    </section>
  );
};

export default Movie;
