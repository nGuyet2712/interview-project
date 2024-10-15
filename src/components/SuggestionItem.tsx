import React from "react";

interface SuggestionItemProps {
  suggestion: string;
  index: number;
  selectedIndex: number;
  onSelectSuggestion: (suggestion: string) => void;
  onSearch: (value: string) => void;
  input: string;
}

/**
 * Represent a suggestion item.
 * @component
 * @param {string[]} props.suggestion - The suggestion string.
 * @param {number} props.index - The index of the suggestion.
 * @param {number} props.selectedIndex - The index of selected suggestion.
 * @param {function} props.onSelectSuggestion - The select suggestion action.
 * @param {function} props.onSearch - The search action.
 * @param {string} props.input - The debounced term.

 * @returns {React.ReactElement} The suggestion item.
 */
const SuggestionItem: React.FC<SuggestionItemProps> = ({
  suggestion,
  index,
  selectedIndex,
  onSelectSuggestion,
  onSearch,
  input,
}) => {
  // Create a regular expression to match the input term (debounced search term).
  const regex = new RegExp(`(${input})`, "gi");

  // Split the suggestion based on the input term, creating an array with matching and non-matching parts.
  const parts = suggestion.split(regex);
  return (
    <li
      className={`list-item py-2 px-4 cursor-pointer ${
        index === selectedIndex ? "bg-blue-100" : ""
      }`}
      onClick={() => {
        onSelectSuggestion(suggestion);
        onSearch(suggestion);
      }}
    >
      {parts.map((part, i) =>
        // If a part matches the input (tested using the regex), render it in <strong> (bold). Otherwise, render it as a regular <span>.
        regex.test(part) ? (
          <strong key={i}>{part}</strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </li>
  );
};

export default SuggestionItem;
