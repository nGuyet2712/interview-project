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
  const [resultError, setResultError] = useState<string>("");

  // Perform async search, filter results by term in 'DocumentTitle.Text' or 'DocumentExcerpt.Text', and update state with total results.
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
      setResultError("");
    } catch (error) {
      setResultError("No network connection");
      console.error("Error fetching search results:", error);
    }
    setIsLoadingResults(false);
  };

  return (
    <AppLayout>
      <SearchBar onSearch={handleSearch} />
      {resultError ? (
        <div className="md:px-[160px] sm:px-[80px] px-[30px] bg-white">
          <p className="font-semibold text-[22px]">{resultError}</p>
        </div>
      ) : (
        <ResultsList results={searchResults} isLoading={isLoadingResults} />
      )}
    </AppLayout>
  );
}

export default App;
