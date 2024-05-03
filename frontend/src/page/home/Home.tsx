import React, { FC, useEffect, useContext, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const AllMovieTv = React.lazy(() => import("../all/AllMovieTv"));
const Movie = React.lazy(() => import("../details/Movie"));
const Person = React.lazy(() => import("../details/Person"));
const Tv = React.lazy(() => import("../details/Tv"));
import Index from "./pages/Index";
const Search = React.lazy(() => import("../search/Search"));
const DiscoverByGenre = React.lazy(() => import("../discover/DiscoverByGenre"));
const CollectionInfo = React.lazy(
  () => import("../../components/collection/CollectionInfo"),
);
const Collections = React.lazy(
  () => import("../../components/collection/Collections"),
);
import { StoreContext } from "../../store/Store";
import { ax } from "../../config/default";
const Like = React.lazy(() => import("../liked/Like"));
const WatchList = React.lazy(() => import("../watchList/WatchList"));
const Profile = React.lazy(() => import("../profile/Profile"));
import isConnectionAvailable from "../../utils/isConnAvailable";

const Home: FC = () => {
  const { store, dispatch } = useContext(StoreContext);

  useEffect(() => {
    let initialFetch = null;
    if (store.user) {
      initialFetch = async () => {
        const { data } = await ax.get(`${store.user.id}/playlist`);
        dispatch({ type: "SET_COLLECTION", payload: data });
      };
      initialFetch();
    }
    return () => {
      initialFetch = null;
    };
  }, [store.user, dispatch]);

  return (
    <section className="home flex">
        <div className="content_container h-screen overflow-y-scroll w-full">
          {isConnectionAvailable() && (
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
                path="/discover/:type/genre/:genre_id/*"
                element={
                  <Suspense>
                    <DiscoverByGenre />
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
                path="/collection"
                element={
                  <Suspense>
                    <Collections />
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
                path="/profile/*"
                element={
                  <Suspense>
                    <Profile />
                  </Suspense>
                }
              />
            </Routes>
          )}
        </div>
    </section>
  );
};

export default Home;
