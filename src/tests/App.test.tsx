import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import fetchResults from "../services/resultService";
import ResultsResponse from "../mock/queryResult.json";
import "@testing-library/jest-dom";

jest.mock("../services/resultService");

describe("App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders correctly and handles search", async () => {
    (fetchResults as jest.Mock).mockResolvedValue(ResultsResponse);

    render(<App />);

    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "child" } });

    const searchButton = screen.getByRole("button", { name: "Search" });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(
        screen.getByText(expect.stringContaining("child"))
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText(expect.stringContaining("Showing"))
    ).toBeInTheDocument();
  });

  it("handles errors when fetching data", async () => {
    (fetchResults as jest.Mock).mockRejectedValue(new Error("Network Error"));

    render(<App />);

    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "child" } });

    const searchButton = screen.getByRole("button", { name: "Search" });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(/No network connection/i)).toBeInTheDocument();
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching results:",
        expect.any(Error)
      );
    });
  });
});
