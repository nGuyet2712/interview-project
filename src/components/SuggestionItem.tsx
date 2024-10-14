interface SuggestionItemProps {
  suggestion: string;
  index: number;
  selectedIndex: number;
  selectSuggestion: (suggestion: string) => void;
  onSearch: (value: string) => void;
}

const SuggestionItem: React.FC<SuggestionItemProps> = ({
  suggestion,
  index,
  selectedIndex,
  selectSuggestion,
  onSearch,
}) => {
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
      {suggestion}
    </li>
  );
};

export default SuggestionItem;
