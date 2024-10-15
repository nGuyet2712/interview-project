import { render, screen } from "@testing-library/react";
import ResultItem from "../../../../pages/result-page/components/ResultItem";
import ResultData from "../../../../mock/queryResult.json";

describe("ResultItem", () => {
  const mockItem = ResultData.ResultItems[0];

  it("renders the title with highlights", () => {
    render(<ResultItem item={mockItem} />);

    const titleHighlight = screen.getByText("Government", { selector: "span" });
    expect(titleHighlight).toHaveClass("font-bold");

    expect(screen.getByText("Services for Housing")).toBeInTheDocument();
  });

  it("renders the excerpt with highlights", () => {
    render(<ResultItem item={mockItem} />);

    const excerptHighlight = screen.getByText("HDB", { selector: "span" });
    expect(excerptHighlight).toHaveClass("font-bold");

    expect(
      screen.getByText("Buy", { exact: false, selector: "p" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("flats with ease using government services.", {
        exact: false,
      })
    ).toBeInTheDocument();
  });

  it("renders the correct document URI", () => {
    render(<ResultItem item={mockItem} />);

    const link = screen.getByText(
      "https://services.life.gov.sg/government-services/buy-hdb/"
    );
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "https://services.life.gov.sg/government-services/buy-hdb/"
    );
  });

  it("renders correctly without highlights", () => {
    const itemWithoutHighlights = {
      ...mockItem,
      DocumentTitle: {
        Text: "Government Services for Housing",
        Highlights: [],
      },
      DocumentExcerpt: {
        Text: "Buy HDB flats with ease using government services.",
        Highlights: [],
      },
    };

    render(<ResultItem item={itemWithoutHighlights} />);

    expect(
      screen.getByText("Government Services for Housing")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Buy HDB flats with ease using government services.")
    ).toBeInTheDocument();
  });
});
