import "@testing-library/jest-dom";
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

    fireEvent.change(input, { target: { value: "child" } });

    await waitFor(() => expect(fetchSuggestions).toHaveBeenCalledTimes(1));

    await screen.findByRole("list");
  });

  it("allows selection of a suggestion and triggers search", async () => {
    (fetchSuggestions as jest.Mock).mockResolvedValueOnce(suggestionData);

    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "child" } });

    await waitFor(() => expect(fetchSuggestions).toHaveBeenCalledTimes(1));

    const suggestionItems = await screen.findAllByRole("listitem");
    fireEvent.click(suggestionItems?.[0]);

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith(suggestionData.suggestions[0]);
    });
  });

  it("triggers search on pressing 'Enter' when there are no suggestions", async () => {
    (fetchSuggestions as jest.Mock).mockResolvedValueOnce(suggestionData);
    render(<SearchBar onSearch={mockOnSearch} />);

    const input: HTMLInputElement = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "child" } });
    await waitFor(() => {
      expect(input.value).toEqual("child");
    });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith("child");
    });
  });

  it("handles ArrowUp and ArrowDown key events to navigate suggestions", async () => {
    (fetchSuggestions as jest.Mock).mockResolvedValueOnce(suggestionData);

    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "child" } });

    await waitFor(() => expect(fetchSuggestions).toHaveBeenCalledTimes(1));

    const suggestionItems = await screen.findAllByRole("listitem");
    fireEvent.keyDown(input, { key: "ArrowDown", code: "ArrowDown" });
    expect(suggestionItems[0]).toHaveClass("bg-blue-100");

    fireEvent.keyDown(input, { key: "ArrowDown", code: "ArrowDown" });
    expect(suggestionItems[1]).toHaveClass("bg-blue-100");

    fireEvent.keyDown(input, { key: "ArrowUp", code: "ArrowUp" });
    expect(suggestionItems[0]).toHaveClass("bg-blue-100");
  });
});
