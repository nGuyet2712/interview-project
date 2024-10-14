import { ResultItem, ResultsResponse } from "../../services/resultService";

const resultFilter = (data: ResultsResponse, term: string) => {
  const filteredResults = data.ResultItems.filter(
    (item: ResultItem) =>
      item.DocumentTitle.Text.toLowerCase().includes(term.toLowerCase()) ||
      item.DocumentExcerpt.Text.toLowerCase().includes(term.toLowerCase())
  );
  return filteredResults;
};

export default resultFilter;
