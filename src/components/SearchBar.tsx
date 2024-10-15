import { useState, useEffect, useRef } from "react";
import XIcon from "../assets/icons/CloseIcon";
import SearchIcon from "../assets/icons/SearchIcon";
import SuggestionDropdown from "./SuggestionsDropdown";
import fetchSuggestions from "../services/suggestionService";
import suggestionFilter from "../mock/filter/suggestionFilter";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

/**
 * Represent a search bar component.
 * @component
 * @param {function} props.onSearch - The search action.
 * @returns {React.ReactElement} The search bar which includes an input, a search button and a dropdown to select suggestion.
 */
function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[] | null>(null);

  const defaultSelectIndex = -1;
  const [selectedIndex, setSelectedIndex] =
    useState<number>(defaultSelectIndex);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length > 2);
    setSelectedIndex(defaultSelectIndex);
    setIsSuggestionSelected(false);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    const fetchSuggestionsAsync = async () => {
      if (debouncedSearchTerm.length > 2 && !isSuggestionSelected) {
        try {
          const data = await fetchSuggestions();
          const filteredData = suggestionFilter(data, debouncedSearchTerm);
          setSuggestions(filteredData);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      }
    };
    fetchSuggestionsAsync();
  }, [debouncedSearchTerm, isSuggestionSelected]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions) {
      if (e.key === "ArrowDown") {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
      } else if (e.key === "ArrowUp") {
        setSelectedIndex(
          (prevIndex) =>
            (prevIndex - 1 + suggestions.length) % suggestions.length
        );
      } else if (e.key === "Enter") {
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          onSearch(suggestions[selectedIndex]);
          setSearchTerm(suggestions[selectedIndex]);
          setIsSuggestionSelected(true);
        } else if (searchTerm.length > 2) {
          onSearch(searchTerm);
        }
        setShowSuggestions(false);
        setSelectedIndex(defaultSelectIndex);
      }
    }
  };

  return (
    <div className="md:px-[160px] sm:px-[80px] px-[30px] py-12 text-lg shadow-lg">
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={`textbox w-full border border-gray-300 focus:border-[#1C76D5] focus:outline-none h-14 pl-4 z-100 ${
            showSuggestions ? "rounded-t-xl rounded-r-xl" : "rounded-xl"
          }`}
          placeholder="Search..."
        />
        {searchTerm.length > 0 && (
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedIndex(defaultSelectIndex);
              setShowSuggestions(false);
              setIsSuggestionSelected(false);
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
            className="search-button absolute right-32 top-1/2 transform -translate-y-1/2"
          >
            <XIcon />
          </button>
        )}
        <button
          className="absolute right-0 top-0 h-14 w-28 bg-[#1C76D5] text-white rounded-xl px-4 py-2 flex items-center"
          onClick={() => {
            onSearch(searchTerm);
            setShowSuggestions(false);
            setIsSuggestionSelected(false);
          }}
        >
          <SearchIcon />
          Search
        </button>

        {showSuggestions && (
          <>
            {suggestions?.length === 0 ? (
              <ul className="absolute w-[calc(100%-7rem)] top-[56px] bg-white border rounded-b-xl shadow-sm z-1">
                <li className="p-2">No suggestion found</li>
              </ul>
            ) : (
              <SuggestionDropdown
                suggestions={suggestions}
                selectedIndex={selectedIndex}
                onSelectSuggestion={(suggestion) => {
                  setSearchTerm(suggestion);
                  setShowSuggestions(false);
                  setSelectedIndex(defaultSelectIndex);
                  setIsSuggestionSelected(true);
                }}
                onSearch={onSearch}
                input={debouncedSearchTerm}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
