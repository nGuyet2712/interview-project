import { useState } from "react";
import AppLayout from "./layouts/AppLayout";
import ResultsList from "./pages/result-page/index";
import fetchResults, { ResultsResponse } from "./services/resultService";
import SearchBar from "./components/SearchBar";

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

      const filteredResults = data.ResultItems.filter(
        (item) =>
          item.DocumentTitle.Text.toLowerCase().includes(
            term?.toLowerCase() || searchTerm.toLowerCase()
          ) ||
          item.DocumentExcerpt.Text.toLowerCase().includes(
            term?.toLowerCase() || searchTerm.toLowerCase()
          )
      );

      setSearchResults({
        ...data,
        TotalNumberOfResults: filteredResults.length,
        ResultItems: filteredResults,
      });

      console.log(term);
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
