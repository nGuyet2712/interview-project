export interface DocumentTitle {
  Text: string;
  Highlights: Array<{
    BeginOffset: number;
    EndOffset: number;
  }>;
}

export interface DocumentExcerpt {
  Text: string;
  Highlights: Array<{
    BeginOffset: number;
    EndOffset: number;
  }>;
}

export interface ResultItem {
  DocumentId: string;
  DocumentTitle: DocumentTitle;
  DocumentExcerpt: DocumentExcerpt;
  DocumentURI: string;
}

export interface ResultsResponse {
  TotalNumberOfResults: number;
  Page: number;
  PageSize: number;
  ResultItems: ResultItem[];
}
const fetchResults = async (): Promise<ResultsResponse> => {
  const url =
    "https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const results: ResultsResponse = await response.json();
    return results;
  } catch (error) {
    console.error("Error fetching results:", error);

    return {
      TotalNumberOfResults: 0,
      Page: 1,
      PageSize: 10,
      ResultItems: [],
    };
  }
};

export default fetchResults;
