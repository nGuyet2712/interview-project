import { render, screen, fireEvent } from "@testing-library/react";
import SuggestionDropdown from "../../components/SuggestionsDropdown";
import Suggestion from "../../mock/suggestion.json";
import React from "react";

describe("SuggestionDropdown", () => {
  const mockSelectSuggestion = jest.fn();
  const mockOnSearch = jest.fn();
  const suggestions = Suggestion.suggestions;
  const selectedIndex = 1;

  it("renders the dropdown with suggestions", () => {
    render(
      <SuggestionDropdown
        suggestions={suggestions}
        selectedIndex={selectedIndex}
        onSelectSuggestion={mockSelectSuggestion}
        onSearch={mockOnSearch}
        input="app"
      />
    );

    suggestions.forEach((suggestion) => {
      expect(screen.getByText(suggestion)).toBeInTheDocument();
    });
  });

  it("renders the correct selected suggestion", () => {
    render(
      <SuggestionDropdown
        suggestions={suggestions}
        selectedIndex={selectedIndex}
        onSelectSuggestion={mockSelectSuggestion}
        onSearch={mockOnSearch}
        input="app"
      />
    );

    const selectedSuggestion = screen.getByText(suggestions[selectedIndex]);
    expect(selectedSuggestion).toHaveClass("bg-blue-100");
  });

  it("calls onSelectSuggestion when a suggestion is clicked", () => {
    render(
      <SuggestionDropdown
        suggestions={suggestions}
        selectedIndex={selectedIndex}
        onSelectSuggestion={mockSelectSuggestion}
        onSearch={mockOnSearch}
        input="app"
      />
    );

    const suggestion = screen.getByText(suggestions[0]);
    fireEvent.click(suggestion);

    expect(mockSelectSuggestion).toHaveBeenCalledWith(suggestions[0]);
  });

  it("does not render any suggestions when the list is empty", () => {
    render(
      <SuggestionDropdown
        suggestions={[]}
        selectedIndex={-1}
        onSelectSuggestion={mockSelectSuggestion}
        onSearch={mockOnSearch}
        input="app"
      />
    );

    expect(screen.queryByRole("list-item")).toBeNull();
  });
});
