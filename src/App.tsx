import { useState } from "react";
import AppLayout from "./layouts/AppLayout";
import ResultsList from "./pages/result-page/index";
import fetchResults, { ResultsResponse } from "./services/resultService";
import SearchBar from "./components/SearchBar";
import resultFilter from "./mock/filter/resultFilter";

/**
 * Represent app structure.
 * @component
 * @returns {React.ReactElement} A search bar and list of result.
 */
function App(): React.ReactElement {
  const [searchResults, setSearchResults] = useState<ResultsResponse | null>(
    null
  );
  const [isLoadingResults, setIsLoadingResults] = useState<boolean>(false);

  /*
  Perform a search operation asynchronously based on a given search term.
  1. Set the loading state (`setIsLoadingResults`) to `true` to indicate the search is in progress.
  2. Fetch the results from `fetchResults()` service.
  3. Filter the fetched results based on the provided search term by checking if the term exists insensitively
     in either the `DocumentTitle.Text` or `DocumentExcerpt.Text` fields.
  4. After filtering, update the search results state (`setSearchResults`) with:
     - The total number of filtered results.
     - The filtered result items.
  5. If there is an error during the fetch operation, log the error to the console.
  6. Set the loading state (`setIsLoadingResults`) to `false` to indicate the search has completed.
*/
  const handleSearch = async (term: string) => {
    setIsLoadingResults(true);
    try {
      const data = await fetchResults();

      const filteredResults = resultFilter(data, term);

      setSearchResults({
        ...data,
        TotalNumberOfResults: filteredResults.length,
        ResultItems: filteredResults,
      });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setIsLoadingResults(false);
  };

  return (
    <AppLayout>
      <SearchBar onSearch={handleSearch} />
      <ResultsList results={searchResults} isLoading={isLoadingResults} />
    </AppLayout>
  );
}

export default App;
