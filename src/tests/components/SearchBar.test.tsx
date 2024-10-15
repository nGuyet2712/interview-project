import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import SearchBar from "../../components/SearchBar";
import fetchSuggestions from "../../services/suggestionService";
import suggestionData from "../../mock/suggestion.json";

jest.mock("../../services/suggestionService");

describe("SearchBar", () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the SearchBar and displays suggestions on input", async () => {
    (fetchSuggestions as jest.Mock).mockResolvedValueOnce(suggestionData);

    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "app" } });

    await waitFor(() => expect(fetchSuggestions).toHaveBeenCalledTimes(1));

    expect(screen.getByText(suggestionData.suggestions[0])).toBeInTheDocument();
    expect(screen.getByText(suggestionData.suggestions[1])).toBeInTheDocument();
  });

  it("shows a loading skeleton while fetching suggestions", async () => {
    (fetchSuggestions as jest.Mock).mockResolvedValueOnce(suggestionData);

    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "app" } });

    expect(screen.getAllByTestId("skeleton")).toHaveLength(6);

    await waitFor(() => expect(fetchSuggestions).toHaveBeenCalledTimes(1));

    expect(screen.queryByTestId("skeleton")).toBeNull();
  });

  it("allows selection of a suggestion and triggers search", async () => {
    (fetchSuggestions as jest.Mock).mockResolvedValueOnce(suggestionData);

    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "app" } });

    await waitFor(() => expect(fetchSuggestions).toHaveBeenCalledTimes(1));

    const suggestionItem = screen.getByText(suggestionData.suggestions[0]);
    fireEvent.click(suggestionItem);

    expect(mockOnSearch).toHaveBeenCalledWith(suggestionData.suggestions[0]);
  });

  it("triggers search on pressing 'Enter' when there are no suggestions", () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "apple" } });

    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockOnSearch).toHaveBeenCalledWith("apple");
  });

  it("handles ArrowUp and ArrowDown key events to navigate suggestions", async () => {
    (fetchSuggestions as jest.Mock).mockResolvedValueOnce(suggestionData);

    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "app" } });

    await waitFor(() => expect(fetchSuggestions).toHaveBeenCalledTimes(1));

    fireEvent.keyDown(input, { key: "ArrowDown", code: "ArrowDown" });
    expect(screen.getByText(suggestionData.suggestions[0])).toHaveClass(
      "selected"
    );

    fireEvent.keyDown(input, { key: "ArrowDown", code: "ArrowDown" });
    expect(screen.getByText(suggestionData.suggestions[1])).toHaveClass(
      "selected"
    );

    fireEvent.keyDown(input, { key: "ArrowUp", code: "ArrowUp" });
    expect(screen.getByText(suggestionData.suggestions[0])).toHaveClass(
      "selected"
    );
  });
});
