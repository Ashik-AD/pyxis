import { useState, useEffect, useCallback } from "react";
import DiscoverLists from "../../components/discover/DiscoverLists";
import { ax } from "../../config/default";

import TopResult from "../../components/discover/TopResult";
import PageLayout from "../../components/layout/page-layout";
import Container from "../../components/layout/container";
import { useSearchParams } from "react-router-dom";

let controller: AbortController;
let signal;

const Search = () => {
  const [searchParam, _] = useSearchParams();
  const [searchResult, setSearchResult] = useState<any>();
  const [searching, setSearching] = useState(false);

  let searchKey = searchParam.toString().split("=")[1];

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
        const [searchPeoples, searchCollections] = await Promise.all([
          await ax.get(`search/people/${query}`, {
            signal,
          }),
          await ax.get(`search/collection/${query}`, {
            signal,
          }),
        ]);
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
      return () => controller?.abort();
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

  return (
    <PageLayout>
      <Container>
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
