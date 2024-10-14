import Skeleton from "../../components/Skeleton";
import { ResultsResponse } from "../../services/resultService";
import ResultItem from "./components/ResultItem";

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
          {[...Array(8)].map((_, index) => (
            <Skeleton key={index} />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="md:px-[160px] sm:px-[80px] px-[30px] bg-white">
      <p className="font-semibold text-[22px]">
        {results
          ? results.TotalNumberOfResults < 100
            ? `Showing ${results.TotalNumberOfResults || 0}-${
                results.TotalNumberOfResults
              } of ${results.TotalNumberOfResults} results`
            : `Showing ${(results.Page - 1) * 10 + 1}-${results.Page * 10} of ${
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
