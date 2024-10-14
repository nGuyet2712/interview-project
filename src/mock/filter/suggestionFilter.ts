import { SuggestionsResponse } from "../../services/suggestionService";

const suggestionFilter = (data: SuggestionsResponse, input: string) => {
  const filteredData = data.suggestions.filter((item) => item.includes(input));
  return filteredData;
};

export default suggestionFilter;
