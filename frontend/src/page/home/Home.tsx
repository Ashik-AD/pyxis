import React, { FC, useEffect, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { ax } from "../../config/default";
import Auth from "../../auth/Auth";
import useDispatch from "../../hooks/useDispatch";
import useFetch from "../../hooks/useFetch";
import useStore from "../../hooks/useStore";

const AllMovieTv = React.lazy(() => import("../all/AllMovieTv"));
const Movie = React.lazy(() => import("../details/Movie"));
const Person = React.lazy(() => import("../details/Person"));
const Tv = React.lazy(() => import("../details/Tv"));
const Search = React.lazy(() => import("../search/Search"));
const DiscoverByGenre = React.lazy(() => import("../discover/DiscoverByGenre"));
const CollectionInfo = React.lazy(
  () => import("../../components/collection/CollectionInfo"),
);
const Like = React.lazy(() => import("../liked/Like"));
const WatchList = React.lazy(() => import("../watchList/WatchList"));
const Users = React.lazy(() => import("../user/index"));

const Home: FC = () => {
  const dispatch = useDispatch();
  const store = useStore();
  const { data } = useFetch("/movie/popular");

  if (data && !store.movie_full) {
    dispatch({ type: "SET_MOVIE_FULL", payload: data });
  }

  useEffect(() => {
    let initialFetch = null;
    if (store.user) {
      initialFetch = async () => {
        const { data } = await ax.get(`${store?.user?.id}/playlist`);
        dispatch({ type: "SET_COLLECTION", payload: data });
      };
      initialFetch();
    }
    return () => {
      initialFetch = null;
    };
  }, [store.user, dispatch]);

  return (
    <div className="h-screen w-full relative z-1">
      <Routes>
        <Route path="/*" element={<Index />} />
        <Route
          path="/movie/info/:id/*"
          element={
            <Suspense>
              <Movie />
            </Suspense>
          }
        />
        <Route
          path="/tv/info/:id/*"
          element={
            <Suspense>
              <Tv />
            </Suspense>
          }
        />
        <Route
          path="/discover/:type/genre/:genre_id/*"
          element={
            <Suspense>
              <DiscoverByGenre />
            </Suspense>
          }
        />
        <Route
          path="/liked"
          element={
            <Suspense>
              <Like />
            </Suspense>
          }
        />
        <Route
          path="/collection/:id"
          element={
            <Suspense>
              <CollectionInfo />
            </Suspense>
          }
        />
        <Route
          path="/watchlist"
          element={
            <Suspense>
              <WatchList />
            </Suspense>
          }
        />
        <Route
          path="/person/:person_id"
          element={
            <Suspense>
              <Person />
            </Suspense>
          }
        />
        <Route
          path="/all/:type/:src/*"
          element={
            <Suspense>
              <AllMovieTv />
            </Suspense>
          }
        />
        <Route
          path="/search/*"
          element={
            <Suspense>
              <Search />
            </Suspense>
          }
        />
        <Route
          path="/user/*"
          element={
            <Auth>
              <Suspense>
                <Users />
              </Suspense>
            </Auth>
          }
        />
      </Routes>
    </div>
  );
};

export default Home;
