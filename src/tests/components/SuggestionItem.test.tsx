import { render, screen, fireEvent } from "@testing-library/react";
import SuggestionItem from "../../components/SuggestionItem";

describe("SuggestionItem", () => {
  const mockSelectSuggestion = jest.fn();
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the suggestion text", () => {
    render(
      <SuggestionItem
        suggestion="Test Suggestion"
        index={0}
        selectedIndex={-1}
        onSelectSuggestion={mockSelectSuggestion}
        onSearch={mockOnSearch}
        input="Test"
      />
    );
    expect(screen.getByText("Test Suggestion")).toBeInTheDocument();
  });

  it('applies "bg-blue-100" class when the item is selected', () => {
    render(
      <SuggestionItem
        suggestion="Test Suggestion"
        index={0}
        selectedIndex={0}
        onSelectSuggestion={mockSelectSuggestion}
        onSearch={mockOnSearch}
        input="Test"
      />
    );

    const suggestionItem = screen.getByRole("listitem");
    expect(suggestionItem).toHaveClass("bg-blue-100");
  });

  it('does not apply "bg-blue-100" class when the item is not selected', () => {
    render(
      <SuggestionItem
        suggestion="Test Suggestion"
        index={0}
        selectedIndex={1}
        onSelectSuggestion={mockSelectSuggestion}
        onSearch={mockOnSearch}
        input="Test"
      />
    );

    const suggestionItem = screen.getByRole("listitem");
    expect(suggestionItem).not.toHaveClass("bg-blue-100");
  });

  it("calls onSelectSuggestion and onSearch when clicked", () => {
    render(
      <SuggestionItem
        suggestion="Test Suggestion"
        index={0}
        selectedIndex={-1}
        onSelectSuggestion={mockSelectSuggestion}
        onSearch={mockOnSearch}
        input="Test"
      />
    );

    fireEvent.click(screen.getByText("Test Suggestion"));
    expect(mockSelectSuggestion).toHaveBeenCalledWith("Test Suggestion");
    expect(mockOnSearch).toHaveBeenCalledWith("Test Suggestion");
  });
});
