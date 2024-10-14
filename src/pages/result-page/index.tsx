import Skeleton from "../../components/Skeleton";
import { ResultsResponse } from "../../services/resultService";
import ResultItem from "./components/ResultItem";

interface ResultsListProps {
  results: ResultsResponse | null;
  isLoading: boolean;
}

/**
 * Display a list of search results.
 * @component
 * @param {Object} props.results - The results data.
 * @param {boolean} props.isLoading - The loading state.
 * @returns {React.ReactElement} Render the list of results or a loading skeleton.
 */
const ResultsList = ({
  results,
  isLoading,
}: ResultsListProps): React.ReactElement => {
  return (
    <div className="md:px-[160px] sm:px-[80px] px-[30px] bg-white">
      {isLoading ? (
        <>
          <p className="h-6 w-[250px] bg-gray-300 rounded mb-16" />
          <ul className="space-y-12">
            {[...Array(8)].map((_, index) => (
              <Skeleton key={index} />
            ))}
          </ul>
        </>
      ) : (
        <>
          <p className="font-semibold text-[22px]">
            {results
              ? `Showing ${results.TotalNumberOfResults ? 1 : 0} - ${
                  results.TotalNumberOfResults
                } of ${results.TotalNumberOfResults} results`
              : ""}
          </p>
          <ul className="space-y-12">
            {results?.ResultItems.map((item) => (
              <ResultItem key={item.DocumentId} item={item} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ResultsList;
