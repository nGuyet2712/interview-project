import fetchResults from "../../services/resultService";
import resultsData from "../../mock/queryResult.json";

global.fetch = jest.fn();

describe("fetchResults", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches results successfully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(resultsData),
    });

    const result = await fetchResults();

    expect(result).toEqual(resultsData);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("handles HTTP errors gracefully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: jest.fn().mockResolvedValueOnce({}),
    });

    const result = await fetchResults();

    expect(result).toEqual({
      TotalNumberOfResults: 0,
      Page: 1,
      PageSize: 10,
      ResultItems: [],
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("handles network errors gracefully", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    const result = await fetchResults();

    expect(result).toEqual({
      TotalNumberOfResults: 0,
      Page: 1,
      PageSize: 10,
      ResultItems: [],
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
