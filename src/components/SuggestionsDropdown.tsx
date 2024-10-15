import SuggestionItem from "./SuggestionItem";

interface SuggestionDropdownProps {
  suggestions: string[] | null;
  selectedIndex: number;
  onSelectSuggestion: (suggestion: string) => void;
  onSearch: (value: string) => void;
  input: string;
}

/**
 * Represent a suggestion dropdown component.
 * @component
 * @param {string[]} props.suggestions - The list of suggestions.
 * @param {number} props.selectedIndex - The index of selected suggestion.
 * @param {function} props.onSelectSuggestion - The select suggestion action.
 * @param {function} props.onSearch - The search action.
 * @param {string} props.input - The debounced term.

 * @returns {React.ReactElement} A list of suggestions.
 */
const SuggestionDropdown: React.FC<SuggestionDropdownProps> = ({
  suggestions,
  selectedIndex,
  onSelectSuggestion,
  onSearch,
  input,
}) => {
  return (
    <ul className="absolute w-[calc(100%-7rem)] top-[56px] bg-white border rounded-b-xl shadow-sm z-1">
      {suggestions?.map((suggestion, index) => (
        <SuggestionItem
          key={suggestion}
          suggestion={suggestion}
          index={index}
          selectedIndex={selectedIndex}
          onSelectSuggestion={onSelectSuggestion}
          onSearch={onSearch}
          input={input}
        />
      ))}
    </ul>
  );
};

export default SuggestionDropdown;
