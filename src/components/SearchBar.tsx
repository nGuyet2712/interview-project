import { useState, useEffect, useRef } from "react";
import XIcon from "../../public/icons/x.svg";
import SearchIcon from "../../public/icons/search.svg";
import SuggestionDropdown from "./SuggestionsDropdown";
import fetchSuggestions from "../services/suggestionService";
import Skeleton from "./Skeleton";
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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] =
    useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);

  /*
  Handle changes in the input field, typically when the user types in a search box.
  1. Capture the current value of the input field (`e.target.value`).
  2. Update the search term state (`setSearchTerm`) with the current input value.
  3. Determine whether to show suggestions by checking if the input length is greater than 2 characters.
     - If the input length is more than 2 characters, suggestions will be shown (`setShowSuggestions(true)`).
     - Otherwise, suggestions will be hidden.
  4. Reset the selected index for suggestions to -1 (`setSelectedIndex(-1)`), which means no suggestion is selected initially.
  5. Reset the `isSuggestionSelected` state to `false` to indicate no suggestion is currently selected.
*/
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length > 2);
    setSelectedIndex(-1);
    setIsSuggestionSelected(false);
  };

  /*
    Debounce the `searchTerm` input.
    1. Ccreate a timeout (`handler`) that will delay setting the `debouncedSearchTerm` state by 500 milliseconds.
    2. If the `searchTerm` changes before the 500ms timeout is complete, the previous timeout is cleared and reset.
    3. This avoids updating the `debouncedSearchTerm` state on every keystroke, improving performance when searching or filtering data.
    The cleanup function (`return () => clearTimeout(handler);`) ensures the timeout is cleared when the component unmounts or before the next timeout is set.
  */
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  /*
    Fetch suggestions based on `debouncedSearchTerm` and `isSuggestionSelected`.
    - We define an async function `fetchSuggestionsAsync` to handle the suggestion fetching process.
    1. If the `debouncedSearchTerm` is longer than 2 characters and `!isSuggestionSelected` hasn't been selected, the loading state (`setIsLoadingSuggestions`) is set to `true` to show that suggestions are being fetched.
    2. We then fetch the suggestions asynchronously using the `fetchSuggestions` service.
    3. The data is filtered by `suggestionFilter` based on `debouncedSearchTerm` insensitively.
    4. `setSuggestions` sets the suggestion to be filtered data.
    5. If an error occurs during fetching, it is caught and logged in the console.
    6. Whether the fetch is successful or not, the loading state is set back to `false`.
    7. If the conditions are not met (step 1), the suggestions list is cleared.
  */
  useEffect(() => {
    const fetchSuggestionsAsync = async () => {
      if (debouncedSearchTerm.length > 2 && !isSuggestionSelected) {
        setIsLoadingSuggestions(true);
        try {
          const data = await fetchSuggestions();
          const filteredData = suggestionFilter(data, debouncedSearchTerm);
          setSuggestions(filteredData);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        } finally {
          setIsLoadingSuggestions(false);
        }
      } else {
        setSuggestions([]);
      }
    };
    fetchSuggestionsAsync();
  }, [debouncedSearchTerm, isSuggestionSelected]);

  /*
    Handle keyboard navigation and selection within the suggestions list.
    - ArrowDown Key:
      If the "ArrowDown" key is pressed, increase the `selectedIndex` to highlight the next suggestion.
      The index is wrapped using the modulo operator (`%`) to cycle through the list if it reaches the end.
    - ArrowUp Key:
      If the "ArrowUp" key is pressed, decrease the `selectedIndex` to highlight the previous suggestion.
      The index is adjusted with `(prevIndex - 1 + suggestions.length) % suggestions.length` to handle the wrap-around in reverse.
    - Enter Key:
      If the "Enter" key is pressed, the following happens:
      1. If a suggestion is selected, the search function (`onSearch`) is triggered with the selected suggestion.
         - The `searchTerm` is also updated to match the selected suggestion.
         - The `selectedIndex` is reset to `-1`, and `setIsSuggestionSelected` is set to `true` to mark that a suggestion was chosen.
      2. If no suggestion is selected but the `debouncedSearchTerm` is valid (length greater than 2), the `onSearch` function is triggered with the current search term.
      After handling the "Enter" key press, the suggestions list is hidden by setting `setShowSuggestions(false)`.
  */
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
        setSearchTerm(suggestions[selectedIndex]);
        setSelectedIndex(-1);
        setIsSuggestionSelected(true);
      } else if (searchTerm.length > 2) {
        onSearch(debouncedSearchTerm);
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
              setSearchTerm("");
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
                  <Skeleton key={index} />
                ))}
              </ul>
            ) : (
              <SuggestionDropdown
                suggestions={suggestions}
                selectedIndex={selectedIndex}
                onSelectSuggestion={(suggestion) => {
                  setSearchTerm(suggestion);
                  setShowSuggestions(false);
                  setSelectedIndex(-1);
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
