interface SuggestionItemProps {
  suggestion: string;
  index: number;
  selectedIndex: number;
  selectSuggestion: (suggestion: string) => void;
}

const SuggestionItem: React.FC<SuggestionItemProps> = ({
  suggestion,
  index,
  selectedIndex,
  selectSuggestion,
}) => {
  return (
    <li
      className={`p-2 cursor-pointer ${
        index === selectedIndex ? "bg-blue-100" : ""
      }`}
      onClick={() => selectSuggestion(suggestion)}
    >
      {suggestion}
    </li>
  );
};

export default SuggestionItem;
