import { useState, useEffect, useCallback } from "react";
import DiscoverLists from "../../components/discover/DiscoverLists";
import { ax } from "../../config/default";

import TopResult from "../../components/discover/TopResult";
import SearchInput from "../../components/search/SearchInput";
import PageLayout from "../../components/layout/page-layout";
import Container from "../../components/layout/container";

let controller: AbortController;
let signal;

const Search = () => {
  const [searchResult, setSearchResult] = useState<any>();
  const [searchKey, setSearchKey] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const search = useCallback(
    async (query: string | null) => {
      setSearching(true);
      if (!query) {
        setSearchResult(null);
        return;
      }
      try {
        controller = new AbortController();
        signal = controller.signal;

        const searchMovieTv = await ax.get(`search/${query}`, {
          signal,
        });
        const searchPeoples = await ax.get(`search/people/${query}`, {
          signal,
        });
        const searchCollections = await ax.get(`search/collection/${query}`, {
          signal,
        });
        setSearchResult({
          topResult: searchMovieTv.data.results,
          peoples: searchPeoples.data,
          collections: searchCollections.data,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setSearching(false);
      }
      return ()  => controller?.abort()
    },
    [searchKey],
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

  const handleInputSearch = (search_key: string) => {
    setSearchKey((prevKey) => {
      if (prevKey !== search_key) {
        controller?.abort("Aborted because of multiple request");
      }
      return search_key;
    });
  };

  return (
    <PageLayout>
      <Container>
        <div className="flex content-center">
          <SearchInput
            handleInputChange={handleInputSearch}
            searchValue={searchKey}
          />
        </div>
        <div style={searching ? { opacity: 0.3 } : { opacity: 1 }}>
          {searchResult && (
            <TopResult
              movieAndTvResult={searchResult?.topResult}
              personResult={searchResult?.peoples}
              collection={searchResult?.collections}
              search_key={searchKey ? searchKey : ""}
            />
          )}

          <div
            style={!searchResult ? { display: "block" } : { display: "none" }}
          >
            <DiscoverLists />
          </div>
        </div>
      </Container>
    </PageLayout>
  );
};

export default Search;
