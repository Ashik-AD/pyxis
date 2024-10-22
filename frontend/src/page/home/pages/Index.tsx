import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../../404/NotFound";
import MovieContainer from "./MovieContainer";
import Trailer from "./Trailer";
import TvContainer from "./TvContainer";

const Index: FC = () => {
  return (
    <section className="relative flex flex-col bg-black">
      <Routes>
        <Route
          index
          element={
            <>
              <MovieContainer />
              <TvContainer />
            </>
          }
        />
        <Route path="/trailer/:type/:id" element={<Trailer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default Index;
