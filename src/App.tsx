import { useState } from "react";
import AppLayout from "./layouts/AppLayout";
import ResultsList from "./pages/result-page/index";
import fetchResults, { ResultsResponse } from "./services/resultService";
import SearchBar from "./components/SearchBar";
import resultFilter from "./mock/filter/resultFilter";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ResultsResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleSearch = async (term: string) => {
    setIsLoading(true);
    try {
      const data = await fetchResults();

      const filteredResults = resultFilter(data, term, searchTerm);

      setSearchResults({
        ...data,
        TotalNumberOfResults: filteredResults.length,
        ResultItems: filteredResults,
      });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setIsLoading(false);
  };

  return (
    <AppLayout>
      <SearchBar
        searchTerm={searchTerm}
        onInputChange={handleInputChange}
        onSearch={handleSearch}
      />
      <ResultsList results={searchResults} isLoading={isLoading} />
    </AppLayout>
  );
}

export default App;
