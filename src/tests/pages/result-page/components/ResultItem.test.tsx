import { render, screen } from "@testing-library/react";
import ResultItem from "../../../../pages/result-page/components/ResultItem";
import ResultData from "../../../../mock/queryResult.json";

describe("ResultItem", () => {
  const mockItem = ResultData.ResultItems[0];

  it("renders the title with highlights", () => {
    render(<ResultItem item={mockItem} />);

    const titleHighlight = screen.getByText("Child", { selector: "span" });
    expect(titleHighlight).toHaveClass("font-bold");

    expect(screen.getByText("Choose a Child Care Centre")).toBeInTheDocument();
  });

  it("renders the excerpt with highlights", () => {
    render(<ResultItem item={mockItem} />);

    const excerptHighlight = screen.getByText("child", { selector: "span" });
    expect(excerptHighlight).toHaveClass("font-bold");

    expect(
      screen.getByText("Choosing a Child Care Centre for Your Child", {
        exact: false,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "In choosing the appropriate child care arrangement, the age and personality of your child are important factors for consideration.",
        { exact: false }
      )
    ).toBeInTheDocument();
  });

  it("renders the correct document URI", () => {
    render(<ResultItem item={mockItem} />);

    const link = screen.getByText(
      "https://www.ecda.gov.sg/Parents/Pages/ParentsChooseCCC.aspx"
    );
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "https://www.ecda.gov.sg/Parents/Pages/ParentsChooseCCC.aspx"
    );
  });

  it("renders correctly without highlights", () => {
    const itemWithoutHighlights = {
      ...mockItem,
      DocumentTitle: {
        Text: "Choose a Child Care Centre",
        Highlights: [],
      },
      DocumentExcerpt: {
        Text: "Choosing a Child Care Centre for Your Child.",
        Highlights: [],
      },
    };

    render(<ResultItem item={itemWithoutHighlights} />);

    expect(screen.getByText("Choose a Child Care Centre")).toBeInTheDocument();

    expect(
      screen.getByText("Choosing a Child Care Centre for Your Child.")
    ).toBeInTheDocument();
  });
});
