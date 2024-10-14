import React from "react";

interface SuggestionItemProps {
  suggestion: string;
  index: number;
  selectedIndex: number;
  selectSuggestion: (suggestion: string) => void;
  onSearch: (value: string) => void;
  input: string;
}

const SuggestionItem: React.FC<SuggestionItemProps> = ({
  suggestion,
  index,
  selectedIndex,
  selectSuggestion,
  onSearch,
  input,
}) => {
  const regex = new RegExp(`(${input})`, "gi");

  const parts = suggestion.split(regex);

  return (
    <li
      className={`p-2 cursor-pointer ${
        index === selectedIndex ? "bg-blue-100" : ""
      }`}
      onClick={() => {
        selectSuggestion(suggestion);
        onSearch(suggestion);
      }}
    >
      {parts.map((part, i) =>
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
