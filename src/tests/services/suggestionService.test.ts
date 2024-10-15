import fetchSuggestions from "../../services/suggestionService";
import suggestionData from "../../mock/suggestion.json";

global.fetch = jest.fn();

describe("fetchSuggestions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches suggestions successfully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(suggestionData),
    });

    const result = await fetchSuggestions();

    expect(result).toEqual(suggestionData);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("handles HTTP errors gracefully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: jest.fn().mockResolvedValueOnce({}),
    });

    const result = await fetchSuggestions();

    expect(result).toEqual({ suggestions: [] });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("handles network errors gracefully", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    const result = await fetchSuggestions();

    expect(result).toEqual({ suggestions: [] });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
