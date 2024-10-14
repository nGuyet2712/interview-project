import { useState, useEffect, useRef } from "react";
import XIcon from "../../public/icons/x.svg";
import SearchIcon from "../../public/icons/search.svg";
import SuggestionDropdown from "./SuggestionsDropdown";
import fetchSuggestions from "../services/suggestionService";

interface SearchBarProps {
  searchTerm: string;
  onInputChange: (value: string) => void;
  onSearch: (value: string) => void;
}

function SearchBar({ searchTerm, onInputChange, onSearch }: SearchBarProps) {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] =
    useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onInputChange(value);
    setShowSuggestions(value.length > 2);
    setSelectedIndex(-1);
    setIsSuggestionSelected(false);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.length > 2 && !isSuggestionSelected) {
      setIsLoadingSuggestions(true);
      fetchSuggestions()
        .then((data) => setSuggestions(data.suggestions))
        .catch((error) => {
          throw new Error(error);
        })
        .finally(() => setIsLoadingSuggestions(false));
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm, isSuggestionSelected]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      setSelectedIndex(
        (prevIndex) => (prevIndex - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        onSearch(suggestions[selectedIndex]);
        onInputChange(suggestions[selectedIndex]);
        setSelectedIndex(-1);
        setIsSuggestionSelected(true);
      } else if (searchTerm.length > 2) {
        onSearch(searchTerm);
      }
      setShowSuggestions(false);
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
          className={`w-full border border-gray-300 focus:border-[#1C76D5] focus:outline-none h-14 pl-4 ${
            showSuggestions ? "rounded-t-xl rounded-r-xl" : "rounded-xl"
          }`}
        />
        {searchTerm.length > 0 && (
          <button
            onClick={() => {
              onInputChange("");
              setSelectedIndex(-1);
              setShowSuggestions(false);
              setIsSuggestionSelected(false);
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
            className="absolute right-32 top-1/2 transform -translate-y-1/2"
          >
            <img src={XIcon} alt="Clear" className="h-6 w-6" />
          </button>
        )}
        <button
          ref={searchButtonRef}
          className="absolute right-0 top-0 h-14 w-28 bg-[#1C76D5] text-white rounded-xl px-4 py-2 flex items-center"
          onClick={() => {
            if (searchTerm.length > 0) {
              onSearch(searchTerm);
            }
            setShowSuggestions(false);
            setIsSuggestionSelected(false);
          }}
        >
          <img
            src={SearchIcon}
            alt="Search"
            className="inline-block h-5 w-5 mr-2"
          />
          Search
        </button>
        {showSuggestions && (
          <>
            {isLoadingSuggestions ? (
              <ul className="absolute w-[calc(100%-7rem)] top-[55px] bg-white border rounded-b-xl shadow-sm z-10 px-2">
                {[...Array(6)].map((_, index) => (
                  <li
                    className="w-full h-4 bg-gray-300 rounded animate-pulse my-6"
                    key={index}
                  ></li>
                ))}
              </ul>
            ) : (
              <SuggestionDropdown
                suggestions={suggestions}
                selectedIndex={selectedIndex}
                selectSuggestion={(suggestion) => {
                  onInputChange(suggestion);
                  setShowSuggestions(false);
                  setSelectedIndex(-1);
                  setIsSuggestionSelected(true);
                }}
                onSearch={onSearch}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
