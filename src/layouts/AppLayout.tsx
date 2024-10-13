import { useState } from "react";
import logo from "../../public/logo.svg";
import SearchBar from "../components/SearchBar";
import ResultsList from "../pages/ResultsPage/components/ResultsList";
import fetchResults, { ResultsResponse } from "../services/resultService";

function AppLayout() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ResultsResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchSearchResults = async () => {
    setIsLoading(true);
    try {
      const data = await fetchResults();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setIsLoading(false);
  };

  const handleSearch = () => {
    fetchSearchResults();
  };

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div>
      <div className="md:px-[160px] sm:px-[80px] px-[30px] flex gap-[8px] py-[4px] bg-[#F0F0F0]">
        <img className="w-[16px]" src={logo} alt="Logo" />
        <p className="text-[9.89px] text-[#5B5B5B]">
          An Official Website of the
          <span className="font-semibold">Singapore Government</span>
        </p>
      </div>
      <SearchBar
        searchTerm={searchTerm}
        onInputChange={handleInputChange}
        onSearch={handleSearch}
      />
      <ResultsList results={searchResults} isLoading={isLoading} />
    </div>
  );
}

export default AppLayout;
