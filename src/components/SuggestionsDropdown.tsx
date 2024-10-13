import SuggestionItem from "./SuggestionItem";

interface SuggestionDropdownProps {
  suggestions: string[];
  selectedIndex: number;
  selectSuggestion: (suggestion: string) => void;
  dropdownWidth: string | number;
}

const SuggestionDropdown: React.FC<SuggestionDropdownProps> = ({
  suggestions,
  selectedIndex,
  selectSuggestion,
  dropdownWidth,
}) => {
  return (
    <ul
      className="absolute bg-white border rounded-b-xl shadow-sm z-10"
      style={{ width: dropdownWidth }}
    >
      {suggestions?.map((suggestion, index) => (
        <SuggestionItem
          key={suggestion}
          suggestion={suggestion}
          index={index}
          selectedIndex={selectedIndex}
          selectSuggestion={selectSuggestion}
        />
      ))}
    </ul>
  );
};

export default SuggestionDropdown;
