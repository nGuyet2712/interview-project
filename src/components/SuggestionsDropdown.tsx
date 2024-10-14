import SuggestionItem from "./SuggestionItem";

interface SuggestionDropdownProps {
  suggestions: string[];
  selectedIndex: number;
  selectSuggestion: (suggestion: string) => void;
}

const SuggestionDropdown: React.FC<SuggestionDropdownProps> = ({
  suggestions,
  selectedIndex,
  selectSuggestion,
}) => {
  return (
    <ul className="absolute w-[calc(100%-7rem)] top-[55px] bg-white border rounded-b-xl shadow-sm z-10">
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
