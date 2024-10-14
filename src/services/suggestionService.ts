export interface SuggestionsResponse {
  suggestions: string[];
}

const fetchSuggestions = async () => {
  const url =
    "https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const suggestions: SuggestionsResponse = await response.json();

    return suggestions;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return { suggestions: [] };
  }
};

export default fetchSuggestions;
