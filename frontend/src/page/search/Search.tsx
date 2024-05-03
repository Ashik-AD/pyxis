import { useState, useEffect, useCallback } from "react";
import DiscoverLists from "../../components/discover/DiscoverLists";
import { ax } from "../../config/default";

import TopResult from "../../components/discover/TopResult";
import SearchInput from "../../components/search/SearchInput";

const Search = () => {
  const [searchResult, setSearchResult] = useState<any>();
  const [searchKey, setSearchKey] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const search = useCallback(
    async (query: string | null) => {
      setSearching(true);
      let cancel: any;
      let CancelToken = ax.CancelToken;
      if (!query) {
        cancel();
        setSearchResult(null);
        return;
      }
      try {
        const searchMovieTv = await ax.get(`search/${query}`, {
          cancelToken: new CancelToken((c) => (cancel = c)),
        });
        const searchPeoples = await ax.get(`search/people/${query}`, {
          cancelToken: new CancelToken((c) => (cancel = c)),
        });
        const searchCollections = await ax.get(`search/collection/${query}`, {
          cancelToken: new CancelToken((c) => (cancel = c)),
        });
        setSearchResult({
          topResult: searchMovieTv.data.results,
          peoples: searchPeoples.data,
          collections: searchCollections.data,
        });
      } catch (error) {
        console.log("Something went wrong");
        console.log(error);
      } finally {
        setSearching(false);
      }
      return () => cancel();
    },
    [searchKey]
  );

  useEffect(() => {
    if (searchKey) {
      search(searchKey);
    } else {
      setSearchResult(null);
    }

    return () => {
      setSearchResult(null);
    };
  }, [searchKey]);

  useEffect(() => {
    return () => {
      setSearchKey(null);
    };
  }, []);

  const handleInputSearch = (search_key: string) =>
    setTimeout(() => setSearchKey(search_key), 50);

  return (
    <section className="search_container w-full pt-50">
      <div className="fixed bg-primary w-full top-0">
        <SearchInput
          handleInputChange={handleInputSearch}
          searchValue={searchKey}
        />
      </div>
      <div style={searching ? { opacity: 0.3 } : { opacity: 1 }}>
        {searchResult && (
          <TopResult
            movieAndTvResult={searchResult.topResult}
            personResult={searchResult.peoples}
            collection={searchResult.collections}
            search_key={searchKey ? searchKey : ""}
          />
        )}

        <div style={!searchResult ? { display: "block" } : { display: "none" }}>
          <DiscoverLists />
        </div>
      </div>
    </section>
  );
};

export default Search;
