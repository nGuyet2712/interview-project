import { useState, useEffect, useRef } from "react";
import XIcon from "../../public/icons/x.svg";
import SearchIcon from "../../public/icons/search.svg";
import { fetchSuggestions } from "../services/suggestionService";
import SuggestionDropdown from "./SuggestionsDropdown";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState<string>(searchTerm);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);
  const [dropdownWidth, setDropdownWidth] = useState<string | number>("100%");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.length > 2) {
      const getSuggestions = async () => {
        setIsLoading(true);
        const data = await fetchSuggestions();
        setSuggestions(data.suggestions);
        setIsLoading(false);
        setShowSuggestions(true);
      };

      getSuggestions();
    } else {
      setShowSuggestions(false);
    }
  }, [debouncedSearchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      setSelectedIndex(
        (prevIndex) => (prevIndex - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      selectSuggestion(suggestions[selectedIndex]);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const calculateDropdownWidth = () => {
    if (inputRef.current && searchButtonRef.current) {
      const inputWidth = inputRef.current.offsetWidth;
      const buttonWidth = searchButtonRef.current.offsetWidth;
      setDropdownWidth(inputWidth - buttonWidth);
    }
  };

  useEffect(() => {
    calculateDropdownWidth();
    window.addEventListener("resize", calculateDropdownWidth);

    return () => {
      window.removeEventListener("resize", calculateDropdownWidth);
    };
  }, []);

  return (
    <div className="md:px-[160px] sm:px-[80px] px-[30px] py-12 text-lg shadow-lg">
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={`w-full border border-gray-300 focus:border-[#1C76D5] focus:outline-none h-14 pl-4 ${
            showSuggestions ? "rounded-t-xl rounded-r-xl" : "rounded-xl"
          }`}
          placeholder="Enter text"
        />
        {searchTerm.length > 0 && (
          <button
            onClick={clearSearch}
            className="absolute right-32 top-1/2 transform -translate-y-1/2"
          >
            <img src={XIcon} alt="Clear" className="h-6 w-6" />
          </button>
        )}
        <button
          ref={searchButtonRef}
          className="absolute right-0 top-0 h-14 bg-[#1C76D5] text-white rounded-xl px-4 py-2 flex items-center"
        >
          <img
            src={SearchIcon}
            alt="Search"
            className="inline-block h-5 w-5 mr-2"
          />
          Search
        </button>
      </div>

      {showSuggestions && (
        <div style={{ width: dropdownWidth }}>
          {isLoading ? (
            <ul
              className="absolute bg-white border rounded-b-xl shadow-sm z-10 p-2"
              style={{ width: dropdownWidth }}
            >
              {[...Array(6)].map((_, index) => (
                <li
                  className="w-3/4 h-4 bg-gray-300 rounded animate-pulse mt-6"
                  key={index}
                ></li>
              ))}
            </ul>
          ) : (
            <SuggestionDropdown
              suggestions={suggestions}
              selectedIndex={selectedIndex}
              selectSuggestion={selectSuggestion}
              dropdownWidth={dropdownWidth}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
