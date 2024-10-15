import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import fetchResults from "../services/resultService";
import ResultsResponse from "../../queryResult.json";
import "@testing-library/jest-dom";

jest.mock("./services/resultService");

describe("App Component", () => {
  it("renders correctly and handles search", async () => {
    (fetchResults as jest.Mock).mockResolvedValue(ResultsResponse);

    render(<App />);

    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "Test" } });

    const searchButton = screen.getByText("Search");
    fireEvent.click(searchButton);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText("Test Result 1")).toBeInTheDocument()
    );
    expect(screen.getByText("Test Result 2")).toBeInTheDocument();

    expect(screen.getByText("Total results: 2")).toBeInTheDocument();
  });

  it("handles errors when fetching data", async () => {
    (fetchResults as jest.Mock).mockRejectedValue(new Error("Network Error"));

    render(<App />);

    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "Test" } });

    const searchButton = screen.getByText("Search");
    fireEvent.click(searchButton);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() =>
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching search results:",
        expect.any(Error)
      )
    );
  });
});
