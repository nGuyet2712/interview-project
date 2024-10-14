import { ResultItem, ResultsResponse } from "../../services/resultService";

const resultFilter = (
  data: ResultsResponse,
  term: string,
  searchTerm: string
) => {
  const filteredResults = data.ResultItems.filter(
    (item: ResultItem) =>
      item.DocumentTitle.Text.toLowerCase().includes(
        term?.toLowerCase() || searchTerm.toLowerCase()
      ) ||
      item.DocumentExcerpt.Text.toLowerCase().includes(
        term?.toLowerCase() || searchTerm.toLowerCase()
      )
  );
  return filteredResults;
};

export default resultFilter;
