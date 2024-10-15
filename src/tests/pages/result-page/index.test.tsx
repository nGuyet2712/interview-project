import { render, screen } from "@testing-library/react";
import ResultsList from "../../../pages/result-page/index";
import ResultData from "../../../mock/queryResult.json";

jest.mock("../../../pages/result-page/components/ResultItem", () => () => (
  <div>Mocked ResultItem</div>
));

describe("ResultsList", () => {
  const mockResults = ResultData;

  it("renders the loading skeleton when isLoading is true", () => {
    render(<ResultsList results={null} isLoading={true} />);
    expect(screen.getAllByTestId("skeleton")).toHaveLength(8);
  });

  it("renders results correctly when isLoading is false", () => {
    render(<ResultsList results={mockResults} isLoading={false} />);

    expect(screen.getByText("Showing 1-2 of 2 results")).toBeInTheDocument();

    expect(screen.getAllByText("Mocked ResultItem")).toHaveLength(2);
  });

  it("renders no results when results are null and isLoading is false", () => {
    render(<ResultsList results={null} isLoading={false} />);

    expect(screen.queryByText("Showing")).toBeNull();

    expect(screen.queryByText("Mocked ResultItem")).toBeNull();
  });

  it("renders no results message when TotalNumberOfResults is 0", () => {
    const emptyResults = {
      TotalNumberOfResults: 0,
      Page: 1,
      PageSize: 10,
      ResultItems: [],
    };

    render(<ResultsList results={emptyResults} isLoading={false} />);

    expect(screen.getByText("Showing 0-0 of 0 results")).toBeInTheDocument();

    expect(screen.queryByText("Mocked ResultItem")).toBeNull();
  });
});
