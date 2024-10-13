import { ResultsResponse } from "../../../services/resultService";
import ResultItem from "./ResultItem";

interface ResultsListProps {
  results: ResultsResponse | null;
  isLoading: boolean;
}

const ResultsList = ({ results, isLoading }: ResultsListProps) => {
  if (isLoading) {
    return (
      <div className="md:px-[160px] sm:px-[80px] px-[30px] bg-white">
        <p className="h-6 w-[250px] bg-gray-300 rounded mb-16" />
        <ul className="space-y-12">
          {[...Array(4)].map((_, index) => (
            <li key={index} className="animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mt-4"></div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="md:px-[160px] sm:px-[80px] px-[30px] bg-white">
      <p className="font-semibold text-[22px]">
        {results
          ? `Showing ${(results.Page - 1) * 10 + 1}-${results.Page * 10} of ${
              results.TotalNumberOfResults
            } results`
          : ""}
      </p>
      {results?.ResultItems.map((item) => (
        <ResultItem key={item.DocumentId} item={item} />
      ))}
    </div>
  );
};

export default ResultsList;
